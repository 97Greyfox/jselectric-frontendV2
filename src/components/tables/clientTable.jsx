import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Image from "next/image";
// import EmployeeDrawer from "../drawers/employeeDrawer";
import Swal from "sweetalert2";
// import ClientDrawer from "../drawers/clientDrawer";
// import DeviceDrawer from "../drawers/deviceDrawer";
// import ClientInfo from "../drawers/clientInfo";

const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ClientDrawer from "../drawers/clientDrawer";
import ClientInfo from "../modals/clientInfoModal";
export default function ClientTable({ allClients, loading, refreshData }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [actionFlag, setActionFlag] = useState(false);
  const [clientId, setClientId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [infoModal, setInfoModal] = useState(false);
  const [item, setItem] = useState();
  useEffect(() => {
    setPage(0);
  }, [loading]);
  const handleActions = (id, objData) => {
    setClientId(id);
    setItem(objData);
    setActionFlag(!actionFlag);
  };
  const openEmpModal = (data) => {
    setClientId(data.id);
    setEditData(data);
    setOpenModal(!openModal);
    setActionFlag(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const openInfoDrawer = (id) => {
    setClientId(id);
    setInfoModal(!infoModal);
    setActionFlag(false);
  };
  const editClient = (data, id) => {
    axios
      .patch(`${apiPath.prodPath}/api/clients/${id}`, data)
      .then((res) => {
        refreshData();
        openEmpModal();
        setActionFlag(false);
      })
      .catch((err) => console.log(err));
  };
  const deleteClient = (id) => {
    setActionFlag(false);
    Swal.fire({
      icon: "warning",
      title: "Are You Sure?",
      text: "Are you sure you want to delete the Client data? This action is irreversible.",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiPath.prodPath}/api/clients/${id}`)
          .then((res) => {
            refreshData();
            openEmpModal();
            setActionFlag(false);
          })
          .catch((err) => console.log(err));
      }
    });
  };
  const sortedClients = allClients.sort((a, b) =>
    a.customerCode.localeCompare(b.customerCode)
  );

  return (
    <Paper
      className={poppins.className}
      sx={{ width: "100%", overflow: "hidden", background: "transparent" }}
    >
      {loading ? (
        <h1 className={`${poppins.className} loading-h`}>Loading...</h1>
      ) : (
        <>
          <TableContainer sx={{ height: 500 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ minWidth: 150 }}>Actions</TableCell>
                  <TableCell style={{ minWidth: 150 }}>Customer Code</TableCell>
                  <TableCell style={{ minWidth: 150 }}>Customer Name</TableCell>
                  <TableCell style={{ minWidth: 150 }}>Customer Type</TableCell>
                  <TableCell style={{ minWidth: 150 }}>Alpha Code</TableCell>
                  <TableCell style={{ minWidth: 120 }}>Address</TableCell>
                  <TableCell style={{ minWidth: 120 }}>City</TableCell>
                  <TableCell style={{ minWidth: 120 }}>State</TableCell>
                  <TableCell style={{ minWidth: 150 }}>Zip Code</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedClients.length == 0 ? (
                  <TableRow>
                    <p className={poppins.className}>No Client Data Found</p>
                  </TableRow>
                ) : (
                  sortedClients
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
                                  onClick={() => openInfoDrawer(i.id)}
                                >
                                  Open
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => openEmpModal(i)}
                                >
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => deleteClient(i.id)}
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                          <TableCell>{i.customerCode}</TableCell>
                          <TableCell>{i.customerName}</TableCell>
                          <TableCell>{i.customerType}</TableCell>
                          <TableCell>{i.alphaCode}</TableCell>
                          <TableCell>{i.address}</TableCell>
                          <TableCell>{i.city}</TableCell>
                          <TableCell>{i.state}</TableCell>
                          <TableCell>{i.zipCode}</TableCell>
                          {openModal && editData && clientId == i.id ? (
                            <ClientDrawer
                              edit={true}
                              open={openModal}
                              onClose={() => setOpenModal(false)}
                              id={clientId}
                              data={editData}
                              editClient={editClient}
                            />
                          ) : null}
                          {infoModal && clientId == i.id ? (
                            <ClientInfo
                              open={infoModal}
                              onClose={() => setInfoModal(false)}
                              item={i}
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
          <TablePagination
            rowsPerPageOptions={[20, 30, 40, 50]}
            component="div"
            count={sortedClients.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Paper>
  );
}
