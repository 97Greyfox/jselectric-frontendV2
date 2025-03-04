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
import JobDescModal from "../modals/jobsDescModal";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
export default function ManpowerEmpTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [jobModal, setJobModal] = useState(false);
  const [empId, setEmpId] = useState("");
  useEffect(() => {
    setLoading(false);
    axios
      .get(`${apiPath.prodPath}/api/users/`)
      .then((res) => {
        const sortedUser = res.data.allUsers.sort((a, b) =>
          a.fullname.localeCompare(b.fullname)
        );
        setUsers(sortedUser);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
                <TableCell style={{ minWidth: 150 }}>Name</TableCell>
                <TableCell style={{ minWidth: 150 }}>Job Assigned</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users && users.length == 0 ? (
                <TableRow>
                  <p className={poppins.className}>No Devices Data Found</p>
                </TableRow>
              ) : (
                users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((i) => {
                    return (
                      <TableRow key={i.id}>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.fullname}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.userLabor.length == 0 ? (
                            "No job assigned"
                          ) : (
                            <button
                              className="bg-orange-400 text-white font-semibold p-2 rounded-xl"
                              onClick={() => {
                                setEmpId(i.id);
                                setJobModal(true);
                              }}
                            >
                              View Jobs
                            </button>
                          )}
                        </TableCell>
                        {empId == i.id && jobModal ? (
                          <JobDescModal
                            job={i}
                            open={jobModal}
                            onClose={() => setJobModal(false)}
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
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
