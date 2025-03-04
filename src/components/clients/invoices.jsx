import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  TablePagination,
} from "@mui/material";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import { Poppins } from "next/font/google";
import Swal from "sweetalert2";
import moment from "moment";
import { Skeleton } from "@/components/ui/skeleton";
import AttachmentModal from "../modals/attachmentModal";
import InvoiceForm from "../innerForms/invoiceClientForm";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// import InvoiceForm from "./invoice-form";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
});
// import "./style.scss";

function Invoices({ allData }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [editFlag, setEditFlag] = useState(false);
  const [allInvoices, setAllInvoices] = useState("");
  const [part, setPart] = useState("");
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState();
  const [actionFlag, setActionFlag] = useState(false);
  const [partId, setPartId] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [modalFlag, setModalFlag] = useState(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleActions = (id, objData) => {
    setPartId(id);
    setItem(objData);
    setActionFlag(!actionFlag);
  };
  const editData = (obj) => {
    setPart(obj);
    setEditFlag(true);
    setActionFlag(false);
  };
  const handleViewModal = (id) => {
    setInvoiceId(id);
    setModalFlag(!modalFlag);
  };
  useState(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/clients/`)
      .then((res) => {
        const filteredInvoices = res.data.clients.find(
          (i) => i.id == allData.id
        );
        setAllInvoices(filteredInvoices.invoices);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [open]);
  const addData = (data, editFlag) => {
    if (editFlag) {
      console.log("####here");
      axios
        .patch(
          `${apiPath.prodPath}/api/clients/editInvoices/${allData.id}&&${partId}`,
          data
        )
        .then((res) => {
          if (res.data.error) {
            Swal.fire({ icon: "error", text: "Error editing client invoices" });
          } else {
            Swal.fire({ icon: "success", text: "Edited Successfully" });
            refreshData();
          }
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post(`${apiPath.prodPath}/api/clients/addInvoices/${allData.id}`, data)
        .then((res) => {
          if (res.data.error) {
            Swal.fire({ icon: "error", text: "Error adding client invoices" });
          } else {
            Swal.fire({ icon: "success", text: "Added Successfully" });
            refreshData();
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const deletePart = (id) => {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to delete the invoice",
      showConfirmButton: true,
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .delete(
            `${apiPath.prodPath}/api/clients/deleteInvoices/${allData.id}&&${partId}`
          )
          .then((res) => {
            if (res.data.error) {
              Swal.fire({
                icon: "error",
                text: "Error deleting client invoices",
              });
            } else {
              Swal.fire({ icon: "success", text: "deleted Successfully" });
              refreshData();
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/clients/`)
      .then((res) => {
        const filteredInvoices = res.data.clients.find(
          (i) => i.id == allData.id
        );
        setAllInvoices(filteredInvoices.invoices);
        setLoading(false);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };
  return loading ? (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[300px] w-[500px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ) : (
    <section>
      <InvoiceForm part={part} addParts={addData} editFlag={editFlag} />
      <TableContainer>
        <Table className="invoice-table">
          <TableHead>
            <TableRow>
              <TableCell>Actions</TableCell>
              <TableCell style={{ minWidth: "150px" }}>Invoice Date</TableCell>
              <TableCell style={{ minWidth: "150px" }}>Job Id</TableCell>
              <TableCell style={{ minWidth: "150px" }}>Invoice</TableCell>
              <TableCell style={{ minWidth: "150px" }}>
                Original Amount
              </TableCell>
              <TableCell style={{ minWidth: "150px" }}>Total Amount</TableCell>
              <TableCell style={{ minWidth: "150px" }}>
                Retention Amount
              </TableCell>
              <TableCell style={{ minWidth: "150px" }}>
                Retention Start Date
              </TableCell>
              <TableCell style={{ minWidth: "150px" }}>
                Non Retention Amount
              </TableCell>
              <TableCell style={{ minWidth: "150px" }}>0+</TableCell>
              <TableCell style={{ minWidth: "150px" }}>30+</TableCell>
              <TableCell style={{ minWidth: "150px" }}>60+</TableCell>
              <TableCell style={{ minWidth: "150px" }}>90+</TableCell>
              <TableCell style={{ minWidth: "150px" }}>Audit Date</TableCell>
              <TableCell style={{ minWidth: "150px" }}>
                Last Statement Date
              </TableCell>
              <TableCell style={{ minWidth: "150px" }}>Notes</TableCell>
              <TableCell style={{ minWidth: "150px" }}>Paid</TableCell>
              <TableCell style={{ minWidth: "150px" }}>
                Remaining Amount
              </TableCell>
              <TableCell style={{ minWidth: "150px" }}>Attachments</TableCell>
            </TableRow>
          </TableHead>
          {loading ? (
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[300px] w-[500px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ) : allInvoices.length == 0 ? (
            <TableBody>
              <TableRow>
                <TableCell style={{ minWidth: "300px" }}>
                  No Data Found
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {allInvoices.length &&
                allInvoices
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((i) => {
                    return (
                      <TableRow key={i.id}>
                        <TableCell style={{ position: "relative" }}>
                          <div className="flex flex-row gap-2">
                            <EditIcon
                              className="text-blue-400"
                              onClick={() => editData(i)}
                            />
                            <DeleteIcon
                              className="text-red-500"
                              onClick={() => deletePart(i.id)}
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          {i.invoiceDate == "" || i.invoiceDate == undefined
                            ? "none"
                            : moment(i.invoiceDate).format(
                                "MM-DD-YYYY hh:mm a"
                              )}
                        </TableCell>
                        {/* <TableCell>
                      {i.invoiceDate == "" || i.invoiceDate == undefined
                        ? "none"
                        : i.invoiceDate.replace(/-/g, "/").replace(/T.+/, "")}
                    </TableCell> */}
                        <TableCell>{i.jobId}</TableCell>
                        <TableCell>{i.invoice}</TableCell>
                        <TableCell>{i.originalAmount}</TableCell>
                        <TableCell>{i.totalAmount}</TableCell>
                        <TableCell>{i.retentionAmount}</TableCell>
                        <TableCell>
                          {i.retentionStartDate == "" ||
                          i.retentionStartDate == undefined
                            ? "none"
                            : moment(i.retentionStartDate).format("MM-DD-YYYY")}
                        </TableCell>
                        <TableCell>{i.nonRetentionAmount}</TableCell>
                        <TableCell>{i.zeroDaysAmount}</TableCell>
                        <TableCell>{i.thirtyDaysAmount}</TableCell>
                        <TableCell>{i.sixtyDaysAmount}</TableCell>
                        <TableCell>{i.ninetyDaysAmount}</TableCell>
                        <TableCell>
                          {i.auditDate == "" || i.auditDate == undefined
                            ? "none"
                            : moment(i.auditDate).format("MM-DD-YYYY")}
                        </TableCell>
                        <TableCell>
                          {i.lastStatementDate == "" ||
                          i.lastStatementDate == undefined
                            ? "none"
                            : moment(i.lastStatementDate).format("MM-DD-YYYY")}
                        </TableCell>
                        <TableCell>{i.notes}</TableCell>
                        <TableCell>{i.paid}</TableCell>
                        <TableCell>{i.remainingAmount}</TableCell>
                        <TableCell>
                          {i.attachments &&
                          i.attachments.files &&
                          i.attachments.files.length ? (
                            <button onClick={() => handleViewModal(i.id)}>
                              View
                            </button>
                          ) : (
                            "N/A"
                          )}
                        </TableCell>
                        {modalFlag && invoiceId == i.id ? (
                          <AttachmentModal
                            files={i.attachments.files}
                            openFlag={modalFlag}
                            closeModal={handleViewModal}
                          />
                        ) : null}
                      </TableRow>
                    );
                  })}
            </TableBody>
          )}
        </Table>
        <TablePagination
          rowsPerPageOptions={[3]}
          component="div"
          count={allInvoices.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </section>
  );
}

export default Invoices;
