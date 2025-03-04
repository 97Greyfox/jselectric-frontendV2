import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Poppins } from "next/font/google";
import React, { useState, useEffect, use } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Image from "next/image";
import Swal from "sweetalert2";
import ServiceDrawer from "../drawers/serviceTicketDrawer";
import ServiceInfoDrawer from "../modals/serviceTicketInfoModal";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ServicePrintModal from "../modals/servicePrintModal";
import SignatureModal from "../modals/signatureModal";
import moment from "moment";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
export default function ServiceTable({
  allServices,
  loading,
  refreshData,
  currentUser,
  salesTaxValue,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [actionFlag, setActionFlag] = useState(false);
  const [serviceId, setServiceId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [infoModal, setInfoModal] = useState(false);
  const [item, setItem] = useState();
  const [printModal, setPrintModal] = useState(false);
  const [signatureModal, setSignatureModal] = useState(false);
  const [loaderOuter, setLoaderOuter] = useState(false);
  useEffect(() => {
    setPage(0);
  }, [loading]);
  const handleActions = (id, objData) => {
    setServiceId(id);
    setItem(objData);
    setActionFlag(!actionFlag);
  };
  const openEmpModal = (data) => {
    setServiceId(data.id);
    setOpenModal(true);
  };

  const editService = (data, id) => {
    setLoaderOuter(true);
    axios
      .patch(`${apiPath.prodPath}/api/service/${serviceId}`, data)
      .then((res) => {
        refreshData();
        setLoaderOuter(false);
      })
      .catch((err) => console.log(err));
  };
  const deleteService = (item, id) => {
    setActionFlag(false);
    Swal.fire({
      icon: "warning",
      title: "Are You Sure?",
      text: "Are you sure you want to delete the Services data? This action is irreversible.",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("attachments", item.attachments);
        const dataObj = {
          oldFiles: JSON.stringify(item.attachments),
        };
        axios
          .patch(`${apiPath.prodPath}/api/service/delete/${id}`, dataObj)
          .then((res) => {
            refreshData();
          })
          .catch((err) => console.log(err));
      }
    });
  };
  const openPrintModal = (i) => {
    setItem(i);
    setServiceId(i.id);
    setPrintModal(!printModal);
  };
  const openSignatrueModal = (i) => {
    setItem(i);
    setServiceId(i.id);
    setSignatureModal(!signatureModal);
  };
  const openInfoDrawer = (data) => {
    setServiceId(data.id);
    setInfoModal(true);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const generatePdf = async (final) => {
    let mywindow = window.open(
      "",
      "PRINT",
      "height=650,width=900,top=0,left=150"
    );
    mywindow.document.write(
      '<img src={"https://ibb.co/Xs0f35G"} alt="JsElectric" />'
    );
    mywindow.document.write(document.getElementById("service-pdf").innerHTML);
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
  };
  function numberWithCommas(x) {
    const formatCus = (Math.round(x * 100) / 100).toFixed(2);
    return formatCus.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <Paper
      className={poppins.className}
      sx={{ width: "100%", overflow: "hidden", bgcolor: "transparent" }}
    >
      {loading ? (
        <h1 className={`${poppins.className} loading-h`}>Loading...</h1>
      ) : (
        <TableContainer sx={{ height: 500 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 150 }}>Actions</TableCell>
                <TableCell style={{ minWidth: 150 }}>Print</TableCell>
                <TableCell style={{ minWidth: 150 }}>Signature</TableCell>
                <TableCell style={{ minWidth: 150 }}>To</TableCell>
                <TableCell style={{ minWidth: 150 }}>Date Of Order</TableCell>
                <TableCell style={{ minWidth: 150 }}>Contact Name</TableCell>
                <TableCell style={{ minWidth: 150 }}>Tel</TableCell>
                <TableCell style={{ minWidth: 150 }}>Email</TableCell>
                <TableCell style={{ minWidth: 150 }}>Created By</TableCell>
                <TableCell style={{ minWidth: 150 }}>Assigned To</TableCell>
                <TableCell style={{ minWidth: 150 }}>
                  Customer Order No
                </TableCell>
                <TableCell style={{ minWidth: 150 }}>Start Date</TableCell>
                <TableCell style={{ minWidth: 150 }}>Job Name</TableCell>
                <TableCell style={{ minWidth: 150 }}>Job Location</TableCell>
                <TableCell style={{ minWidth: 150 }}>Invoice Date</TableCell>
                <TableCell style={{ minWidth: 150 }}>Terms</TableCell>
                {/* <TableCell style={{ minWidth: 150 }}>Labor</TableCell> */}
                <TableCell style={{ minWidth: 150 }}>Total Labor</TableCell>
                {/* <TableCell style={{ minWidth: 150 }}>Materials</TableCell> */}
                <TableCell style={{ minWidth: 150 }}>Total Material</TableCell>
                <TableCell style={{ minWidth: 150 }}>Tax</TableCell>
                <TableCell style={{ minWidth: 150 }}>Total</TableCell>
                <TableCell style={{ minWidth: 750 }}>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allServices.length == 0 ? (
                <TableRow>
                  <p className={poppins.className}>No Services Data Found</p>
                </TableRow>
              ) : (
                allServices
                  .sort(
                    (a, b) => new Date(b.dateOfOrder) - new Date(a.dateOfOrder)
                  )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((i) => {
                    return (
                      <TableRow key={i.id}>
                        <TableCell style={{ position: "relative" }}>
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <Image
                                src={"/menu.png"}
                                width={24}
                                height={25}
                                alt="menu"
                                onClick={() => setItem(i)}
                              />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => openInfoDrawer(i)}
                              >
                                Open
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openEmpModal(i)}>
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => deleteService(i, i.id)}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          <button
                            className="p-2 bg-orange-400 text-white"
                            onClick={() => openPrintModal(i)}
                          >
                            Print
                          </button>
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          <button
                            className="p-2 bg-orange-400 text-white"
                            onClick={() => openSignatrueModal(i)}
                          >
                            {i.signature == undefined
                              ? "Add"
                              : Object.keys(i.signature).length == 0
                              ? "Add"
                              : "View"}
                          </button>
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>{i.to}</TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.dateOfOrder}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.contactName}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>{i.tel}</TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.email}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.createdBy}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.assignedTo}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.customerOrderNo}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.startDate}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.jobName}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.jobLocation}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.invoiceDate}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.terms}
                        </TableCell>
                        {/* <TableCell style={{ minWidth: 150 }}>
                        {i.laborArr.length ? <button>View</button> : "None"}
                        </TableCell> */}
                        <TableCell style={{ minWidth: 150 }}>
                          {i.totalLabor == null
                            ? "none"
                            : `$${numberWithCommas(i.totalLabor)}`}
                        </TableCell>
                        {/* <TableCell style={{ minWidth: 150 }}>
                        {i.materialArr.length ? <button>View</button> : "None"}
                        </TableCell> */}
                        <TableCell style={{ minWidth: 150 }}>
                          {i.totalMaterail == null
                            ? "none"
                            : `$${numberWithCommas(i.totalMaterail)}`}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.taxStatus == "Yes" ? salesTaxValue : 0}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.total == undefined
                            ? 0
                            : i.total == null
                            ? "none"
                            : `$${numberWithCommas(i.total)}`}
                        </TableCell>
                        <TableCell style={{ minWidth: 750 }}>
                          {i.description}
                        </TableCell>
                        {printModal && serviceId == i.id ? (
                          <ServicePrintModal
                            item={item}
                            handleClose={() => setPrintModal(false)}
                            open={printModal}
                            handlePDF={generatePdf}
                            salesTaxValue={salesTaxValue}
                          />
                        ) : null}
                        {signatureModal && serviceId == i.id ? (
                          <SignatureModal
                            moduleName="service"
                            item={item}
                            handleClose={() => setSignatureModal(false)}
                            open={signatureModal}
                            refreshData={refreshData}
                          />
                        ) : null}
                        {openModal == true && serviceId == i.id ? (
                          <ServiceDrawer
                            edit={true}
                            open={openModal}
                            onClose={() => {
                              setOpenModal(false);
                              refreshData();
                            }}
                            id={serviceId}
                            data={i}
                            editService={editService}
                            currentUser={currentUser}
                            salesTaxValue={salesTaxValue}
                            loaderOuter={loaderOuter}
                          />
                        ) : null}
                        {infoModal == true && serviceId == i.id ? (
                          <ServiceInfoDrawer
                            open={infoModal}
                            onClose={() => {
                              setInfoModal(false);
                              refreshData();
                            }}
                            id={serviceId}
                            refreshData={refreshData}
                          />
                        ) : null}
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <TablePagination
        rowsPerPageOptions={[20, 30, 40, 50]}
        component="div"
        count={allServices.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
