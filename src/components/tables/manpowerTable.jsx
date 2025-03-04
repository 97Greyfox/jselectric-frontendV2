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
import moment from "moment";
import ManpowerDrawer from "../drawers/manpowerDrawer";
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
export default function ManpowerTable({ allManpower, loading, refreshData }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [actionFlag, setActionFlag] = useState(false);
  const [manpowerId, setManpowerId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [infoModal, setInfoModal] = useState(false);
  const [item, setItem] = useState();
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
  const openEmpModal = (data) => {
    setManpowerId(data.id);
    setEditData(data);
    setOpenModal(!openModal);
  };
  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }
  const openInfoDrawer = () => {
    if (infoModal) {
      setActionFlag(false);
    }
    setInfoModal(!infoModal);
  };
  const editManpower = (data, id) => {
    axios
      .patch(`${apiPath.prodPath}/api/manpower/${id}`, data)
      .then((res) => {
        refreshData();
        setActionFlag(false);
      })
      .catch((err) => console.log(err));
  };
  const deleteManpower = (id, item) => {
    Swal.fire({
      icon: "warning",
      title: "Are You Sure?",
      text: "Are you sure you want to delete the data? This action is irreversible.",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        var users = [];
        if (item.assignedEmp.foreman.noOfEmp > 0) {
          item.assignedEmp.foreman.employees.forEach((i) => {
            users = [
              { fullname: i.fullname, foreman: true, manpowerId: id },
              ...users,
            ];
          });
        }
        if (item.assignedEmp.journeyman.noOfEmp > 0) {
          item.assignedEmp.journeyman.employees.forEach((i) => {
            users = [
              { fullname: i.fullname, journeyman: true, manpowerId: id },
              ...users,
            ];
          });
        }
        if (item.assignedEmp.apprentice.noOfEmp > 0) {
          item.assignedEmp.apprentice.employees.forEach((i) => {
            users = [
              { fullname: i.fullname, apprentice: true, manpowerId: id },
              ...users,
            ];
          });
        }
        if (item.assignedEmp.construction.noOfEmp > 0) {
          item.assignedEmp.construction.employees.forEach((i) => {
            users = [
              { fullname: i.fullname, construction: true, manpowerId: id },
              ...users,
            ];
          });
        }
        console.log("users", users);
        const dataObj = {
          assignedUsers: users,
        };
        axios
          .put(`${apiPath.prodPath}/api/manpower/${id}&&${item.job}`, dataObj)
          .then((res) => {
            refreshData();
            setActionFlag(false);
          })
          .catch((err) => console.log(err));
      }
    });
  };
  const sortedDevices = allManpower.sort((a, b) =>
    b.startDate.localeCompare(a.startDate)
  );
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
                <TableCell style={{ minWidth: 150 }}>Job Name</TableCell>
                <TableCell style={{ minWidth: 150 }}>Notes</TableCell>
                <TableCell style={{ minWidth: 150 }}>Start Date</TableCell>
                <TableCell style={{ minWidth: 150 }}>End Date</TableCell>
                <TableCell style={{ minWidth: 150 }}>Start Time</TableCell>
                <TableCell style={{ minWidth: 150 }}>End Time</TableCell>
                <TableCell style={{ minWidth: 120 }}>Type</TableCell>
                <TableCell style={{ minWidth: 200 }}>
                  <p>Required</p>
                  {/* <div className="flex flex-row">
                    <span className="p-2 bg-orange-400 text-white w-30">M</span>
                    <span className="p-2 bg-orange-400 text-white w-30">T</span>
                    <span className="p-2 bg-orange-400 text-white w-30">W</span>
                    <span className="p-2 bg-orange-400 text-white w-30">
                      TH
                    </span>
                    <span className="p-2 bg-orange-400 text-white w-30">F</span>
                    <span className="p-2 bg-orange-400 text-white w-30">
                      SA
                    </span>
                    <span className="p-2 bg-orange-400 text-white w-30">
                      SU
                    </span>
                  </div> */}
                </TableCell>
                <TableCell style={{ minWidth: 200 }}>
                  <p>Assigned</p>
                  {/* <div className="flex flex-row">
                    <span className="p-2 bg-orange-400 text-white w-30">M</span>
                    <span className="p-2 bg-orange-400 text-white w-30">T</span>
                    <span className="p-2 bg-orange-400 text-white w-30">W</span>
                    <span className="p-2 bg-orange-400 text-white w-30">
                      TH
                    </span>
                    <span className="p-2 bg-orange-400 text-white w-30">F</span>
                    <span className="p-2 bg-orange-400 text-white w-30">
                      SA
                    </span>
                    <span className="p-2 bg-orange-400 text-white w-30">
                      SU
                    </span>
                  </div> */}
                </TableCell>
                {/* <TableCell style={{ minWidth: 200 }}>
                  <p>Working</p> */}
                {/* <div className="flex flex-row">
                    <span className="p-2 bg-orange-400 text-white w-30">M</span>
                    <span className="p-2 bg-orange-400 text-white w-30">T</span>
                    <span className="p-2 bg-orange-400 text-white w-30">W</span>
                    <span className="p-2 bg-orange-400 text-white w-30">
                      TH
                    </span>
                    <span className="p-2 bg-orange-400 text-white w-30">F</span>
                    <span className="p-2 bg-orange-400 text-white w-30">
                      SA
                    </span>
                    <span className="p-2 bg-orange-400 text-white w-30">
                      SU
                    </span>
                  </div> */}
                {/* </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedDevices.length == 0 ? (
                <TableRow>
                  <p className={poppins.className}>No Devices Data Found</p>
                </TableRow>
              ) : (
                sortedDevices
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
                              <DropdownMenuItem onClick={() => openEmpModal(i)}>
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => deleteManpower(i.id, i)}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>{i.job}</TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.notes}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {moment(i.startDate).format("MM-DD-YYYY")}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {moment(i.endDate).format("MM-DD-YYYY")}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {tConvert(i.shiftStartTime)}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {tConvert(i.shiftEndTime)}
                        </TableCell>
                        <TableCell style={{ minWidth: 120 }}>
                          <p
                            style={{ padding: "7px" }}
                            className="bg-orange-100 text-orange-400"
                          >
                            Foreman
                          </p>
                          <p
                            style={{ padding: "7px" }}
                            className="bg-orange-100 text-orange-400"
                          >
                            Journeyman
                          </p>
                          <p
                            style={{ padding: "7px" }}
                            className="bg-orange-100 text-orange-400"
                          >
                            Apprentice
                          </p>
                          <p
                            style={{ padding: "7px" }}
                            className="bg-orange-100 text-orange-400"
                          >
                            Construction
                          </p>
                        </TableCell>
                        <TableCell style={{ minWidth: 120 }}>
                          <div>
                            <span className="p-2 w-30">
                              {i.requiredEmp.foreman.noOfEmp == null
                                ? "0"
                                : i.requiredEmp.foreman.noOfEmp}
                            </span>
                          </div>
                          <div className="flex flex-row">
                            <span className="p-2 w-30">
                              {i.requiredEmp.journeyman.noOfEmp == null
                                ? "0"
                                : i.requiredEmp.journeyman.noOfEmp}
                            </span>
                          </div>
                          <div className="flex flex-row">
                            <span className="p-2 w-30">
                              {i.requiredEmp.apprentice.noOfEmp == null
                                ? "0"
                                : i.requiredEmp.apprentice.noOfEmp}
                            </span>
                          </div>
                          <div className="flex flex-row">
                            <span className="p-2 w-30">
                              {i.requiredEmp.construction.noOfEmp == null
                                ? "0"
                                : i.requiredEmp.construction.noOfEmp}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell style={{ minWidth: 120 }}>
                          <div className="flex flex-row">
                            <span className="p-2 w-30">
                              {i.assignedEmp.foreman.noOfEmp == null
                                ? "0"
                                : i.assignedEmp.foreman.noOfEmp}
                            </span>
                          </div>
                          <div className="flex flex-row">
                            <span className="p-2 w-30">
                              {i.assignedEmp.journeyman.noOfEmp == null
                                ? "0"
                                : i.assignedEmp.journeyman.noOfEmp}
                            </span>
                          </div>
                          <div className="flex flex-row">
                            <span className="p-2 w-30">
                              {i.assignedEmp.apprentice.noOfEmp == null
                                ? "0"
                                : i.assignedEmp.apprentice.noOfEmp}
                            </span>
                          </div>
                          <div className="flex flex-row">
                            <span className="p-2 w-30">
                              {i.assignedEmp.construction.noOfEmp == null
                                ? "0"
                                : i.assignedEmp.construction.noOfEmp}
                            </span>
                          </div>
                        </TableCell>
                        {/* <TableCell style={{ minWidth: 120 }}>
                          <div>
                            <span className="p-2 w-30">
                              {i.workingEmp.foreman.noOfEmp == null
                                ? "0"
                                : i.workingEmp.foreman.noOfEmp}
                            </span>
                          </div>
                          <div className="flex flex-row">
                            <span className="p-2 w-30">
                              {i.workingEmp.journeyman.noOfEmp == null
                                ? "0"
                                : i.workingEmp.journeyman.noOfEmp}
                            </span>
                          </div>
                          <div className="flex flex-row">
                            <span className="p-2 w-30">
                              {i.workingEmp.apprentice.noOfEmp == null
                                ? "0"
                                : i.workingEmp.apprentice.noOfEmp}
                            </span>
                          </div>
                          <div className="flex flex-row">
                            <span className="p-2 w-30">
                              {i.workingEmp.construction.noOfEmp == null
                                ? "0"
                                : i.workingEmp.construction.noOfEmp}
                            </span>
                          </div>
                        </TableCell> */}
                        {openModal && editData && manpowerId == i.id ? (
                          <ManpowerDrawer
                            edit={true}
                            open={openModal}
                            onClose={() => setOpenModal(false)}
                            id={manpowerId}
                            data={editData}
                            editManpower={editManpower}
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
        count={sortedDevices.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
