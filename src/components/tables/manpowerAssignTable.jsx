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
// import EmployeeDrawer from "../drawers/employeeDrawer";
import Swal from "sweetalert2";
import moment from "moment";
import LaborAssignModal from "../modals/laborAssignModal";

const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
export default function ManpowerAssignTable({
  allManpower,
  loading,
  refreshData,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [assignModal, setAssignModal] = useState(false);
  const [laborId, setLaborId] = useState("");
  useEffect(() => {
    console.log("called", allManpower);
  }, [allManpower]);
  useEffect(() => {
    setPage(0);
  }, [loading]);
  const sortedDevices = allManpower.sort((a, b) =>
    b.startDate.localeCompare(a.startDate)
  );
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const dateCal = (startDate, endDate) => {
    let date1 = new Date(startDate);
    let date2 = new Date(endDate);

    // Calculating the time difference
    // of two dates
    let Difference_In_Time = date2.getTime() - date1.getTime();

    // Calculating the no. of days between
    // two dates
    let Difference_In_Days = Math.round(
      Difference_In_Time / (1000 * 3600 * 24)
    );
    return Difference_In_Days;
  };
  const handleAssignModal = (item) => {
    setLaborId(item.id);
    setAssignModal(true);
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
                <TableCell style={{ minWidth: 150 }}>Job Name</TableCell>
                <TableCell style={{ minWidth: 150 }}>Notes</TableCell>
                <TableCell style={{ minWidth: 150 }}>Start Date</TableCell>
                <TableCell style={{ minWidth: 150 }}>End Date</TableCell>
                <TableCell style={{ minWidth: 200 }}>
                  <p>Required Labor</p>
                  <div className="bg-orange-400 flex flex-row gap-4 p-2">
                    <span className="text-white text-md font-semibold">F</span>
                    <span className="text-white text-md font-semibold">J</span>
                    <span className="text-white text-md font-semibold">A</span>
                    <span className="text-white text-md font-semibold">C</span>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: 200 }}>
                  Assigned Labor
                  <div className="bg-orange-400 flex flex-row gap-4 p-2">
                    <span className="text-white text-md font-semibold">F</span>
                    <span className="text-white text-md font-semibold">J</span>
                    <span className="text-white text-md font-semibold">A</span>
                    <span className="text-white text-md font-semibold">C</span>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: 120 }}>Days Required</TableCell>
                <TableCell style={{ minWidth: 200 }}>Assign Employee</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedDevices.length == 0 ? (
                <TableRow>
                  <p className={poppins.className}>No Data Found</p>
                </TableRow>
              ) : (
                sortedDevices
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((i) => {
                    return (
                      <TableRow key={i.id}>
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
                        <TableCell style={{ minWidth: 120 }}>
                          <div className="flex flex-row gap-4 p-2">
                            <span className="text-md">
                              {i.requiredEmp.foreman.noOfEmp}
                            </span>
                            <span className="text-md">
                              {i.requiredEmp.journeyman.noOfEmp}
                            </span>
                            <span className="text-md">
                              {i.requiredEmp.apprentice.noOfEmp}
                            </span>
                            <span className="text-md">
                              {i.requiredEmp.construction.noOfEmp}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell style={{ minWidth: 120 }}>
                          <div className="flex flex-row gap-4 p-2">
                            <span className="text-md">
                              {i.assignedEmp.foreman.noOfEmp}
                            </span>
                            <span className="text-md">
                              {i.assignedEmp.journeyman.noOfEmp}
                            </span>
                            <span className="text-md">
                              {i.assignedEmp.apprentice.noOfEmp}
                            </span>
                            <span className="text-md">
                              {i.assignedEmp.construction.noOfEmp}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {dateCal(i.startDate, i.endDate) == 7
                            ? "A Week"
                            : `${dateCal(i.startDate, i.endDate)} days`}
                        </TableCell>
                        <TableCell>
                          <button
                            onClick={() => handleAssignModal(i)}
                            className="bg-orange-400 p-2 font-semibold text-md rounded-xl text-white"
                          >
                            Assign Employee
                          </button>
                        </TableCell>
                        {i.id == laborId && assignModal ? (
                          <LaborAssignModal
                            item={i}
                            onClose={() => setAssignModal(false)}
                            open={assignModal}
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
        count={sortedDevices.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
