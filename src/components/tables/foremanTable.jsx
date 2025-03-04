import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Monda, Poppins } from "next/font/google";
import React, { useState, useEffect, use } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";

import moment from "moment";
import ForemanEmpModal from "../modals/foremanEmpModal";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
export default function ForemanTable({ loading, allManpower, refreshData }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [users, setUsers] = useState([]);
  const [jobModal, setJobModal] = useState(false);
  const [id, setId] = useState("");
  const [jobNo, setJobNo] = useState("");
  console.log("@@##", allManpower);
  useEffect(() => {
    setPage(0);
  }, [loading]);
  const handleEmpModal = (i) => {
    setId(i.id);
    setJobNo(i.job);
    setJobModal(true);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  console.log("this is allmanpower", allManpower);
  return (
    <Paper
      className={poppins.className}
      sx={{ width: "100%", overflow: "hidden" }}
    >
      {loading ? (
        <h1 className={`${poppins.className} loading-h`}>Loading...</h1>
      ) : (
        <TableContainer sx={{ height: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 150 }}>Job Name</TableCell>
                <TableCell style={{ minWidth: 150 }}>Start Date</TableCell>
                <TableCell style={{ minWidth: 150 }}>End Date</TableCell>
                <TableCell style={{ minWidth: 150 }}>
                  Assigned Employees
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <p>LOADING....</p>
                </TableRow>
              ) : allManpower.length ? (
                allManpower
                  .sort((a, b) => a.job.localeCompare(b.job))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((i) => {
                    return (
                      <TableRow key={i.id}>
                        <TableCell style={{ minWidth: 150 }}>{i.job}</TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {moment(i.startDate).format("MM-DD-YYYY")}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {moment(i.endDate).format("MM-DD-YYYY")}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          <button
                            className="bg-orange-400 text-white p-2 rounded-xl font-semibold"
                            onClick={() => handleEmpModal(i)}
                          >
                            View Employees
                          </button>
                        </TableCell>
                        {i.id == id && jobModal ? (
                          <ForemanEmpModal
                            open={jobModal}
                            jobNo={jobNo}
                            manpowerId={i.id}
                            jobStartDate={i.startDate}
                            jobEndDate={i.endDate}
                            onClose={() => setJobModal(false)}
                            refreshData={refreshData}
                            assignedEmp={i.assignedEmp}
                          />
                        ) : null}
                      </TableRow>
                    );
                  })
              ) : (
                <p>No Data Found</p>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <TablePagination
        rowsPerPageOptions={[20, 30, 40, 50]}
        component="div"
        count={allManpower.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
