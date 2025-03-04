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
import TimeoutDrawer from "../drawers/timeoutDrawer";
import TimeoutInfo from "../modals/timeoutInfoModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});

export default function TimeoutTable({ data, refreshData, loading }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [oldFiles, setOldFiles] = useState("");
  const [item, setItem] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [timeoutID, settimeoutID] = useState("");
  const [actionFlag, setActionFlag] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [signatureModal, setSignatureModal] = useState(false);
  useEffect(() => {
    setPage(0);
  }, [loading]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleEdit = (item) => {
    setItem(item);
    settimeoutID(item.id);
    setDrawer(true);
  };
  const handleDelete = (data) => {
    setActionFlag(false);
    Swal.fire({
      icon: "error",
      text: "Are you sure you want to delete the Timeout data",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      showConfirmButton: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiPath.prodPath}/api/timeout/${data.id}`)
          .then((res) => {
            if (res.data.error) {
              Swal.fire({ icon: "error", text: "Error Deleting Data" });
            } else {
              Swal.fire({ icon: "success", text: "Deleted Successfully" });
              refreshData();
            }
          });
      }
    });
  };
  const handleCloseDrawer = () => {
    setDrawer(false);
  };
  const openInfoDrawer = (id) => {
    settimeoutID(id);
    setInfoModal(!infoModal);
  };
  const handleApprove = (id) => {
    const data = {
      status: "Approved",
    };
    axios
      .patch(`${apiPath.prodPath}/api/timeout/changeStatus/${id}`, data)
      .then((res) => {
        if (res.data.error) {
          Swal.fire({
            icon: "error",
            text: "Enable to change the status",
          });
        } else {
          Swal.fire({
            icon: "success",
            text: "Successfully updated",
          });
          refreshData();
        }
      })
      .catch((err) => console.log(err));
  };
  const handleReject = (id) => {
    const data = {
      status: "Rejected",
    };
    axios
      .patch(`${apiPath.prodPath}/api/timeout/changeStatus/${id}`, data)
      .then((res) => {
        if (res.data.error) {
          Swal.fire({
            icon: "error",
            text: "Enable to change the status",
          });
        } else {
          Swal.fire({
            icon: "success",
            text: "Successfully updated",
          });
          refreshData();
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Paper
      className={poppins.className}
      sx={{ width: "100%", overflow: "hidden", bgcolor: "transparent" }}
    >
      {loading ? (
        <h1 className={`${poppins.className} loading-h`}>Loading...</h1>
      ) : (
        <TableContainer sx={{ height: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 150 }}>Actions</TableCell>
                <TableCell style={{ minWidth: 100 }}>Date Added</TableCell>
                <TableCell style={{ minWidth: 150 }}>Added By</TableCell>
                <TableCell style={{ minWidth: 150 }}>Entered By</TableCell>
                <TableCell style={{ minWidth: 150 }}>Status</TableCell>
                <TableCell style={{ minWidth: 200 }}>Status Update</TableCell>
                <TableCell style={{ minWidth: 150 }}>Reason</TableCell>
                <TableCell style={{ minWidth: 100 }}>Start Date</TableCell>
                <TableCell style={{ minWidth: 100 }}>End Date</TableCell>
                <TableCell style={{ minWidth: 150 }}>Submit To Jamie</TableCell>
                <TableCell style={{ minWidth: 200 }}>
                  Submit To Management
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.length == 0 ? (
                <TableRow>
                  <p className={poppins.className}>No Training Data found</p>
                </TableRow>
              ) : (
                data &&
                data
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
                              <DropdownMenuItem onClick={() => handleEdit(i)}>
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDelete(i)}>
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.dateAdded}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.user}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.enteredBy}
                        </TableCell>
                        <TableCell style={{ minWidth: 200 }}>
                          {i.status}
                        </TableCell>
                        <TableCell style={{ minWidth: 200 }}>
                          <button
                            className="p-2 mr-2 bg-orange-400 text-white font-semibold rounded-xl"
                            onClick={() => handleApprove(i.id)}
                          >
                            Approve
                          </button>
                          <button
                            className="p-2 bg-red-400 text-white font-semibold rounded-xl"
                            onClick={() => handleReject(i.id)}
                          >
                            Reject
                          </button>
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.reason}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.startDate}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.endDate}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.jamieFlag ? "Yes" : "No"}
                        </TableCell>
                        <TableCell style={{ minWidth: 200 }}>
                          {i.managementFlag ? "Yes" : "No"}
                        </TableCell>
                        {drawer && timeoutID == i.id ? (
                          <TimeoutDrawer
                            refreshData={refreshData}
                            open={drawer}
                            data={i}
                            onClose={handleCloseDrawer}
                            editFlag={true}
                            id={i.id}
                          />
                        ) : null}
                        {infoModal && timeoutID == i.id ? (
                          <TimeoutInfo
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
      )}
      <TablePagination
        rowsPerPageOptions={[20, 30, 40, 50]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
