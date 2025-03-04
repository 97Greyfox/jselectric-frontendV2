import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import { Poppins } from "next/font/google";
import React, { useState, useEffect, use } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
function NoteTaskTable({ noteTasks, deleteNoteTask, editNoteTask }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  useEffect(() => {
    console.log(noteTasks);
  }, [noteTasks]);
  const handleDelete = (data) => {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to delete the sub task",
      showCancelButton: true,
      showConfirmButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        deleteNoteTask(data.id);
      }
    });
  };
  const handleEdit = (data) => {
    editNoteTask(data, data.id);
  };
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
      sx={{ width: "100%", overflow: "hidden" }}
    >
      <TableContainer sx={{ height: 400 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: 100 }}>Action</TableCell>
              <TableCell style={{ minWidth: 150 }}>Current Date</TableCell>
              <TableCell style={{ minWidth: 150 }}>User</TableCell>
              <TableCell style={{ minWidth: 150 }}>Note Category</TableCell>
              <TableCell style={{ minWidth: 120 }}>Due Date</TableCell>
              <TableCell style={{ minWidth: 120 }}>Description</TableCell>
              <TableCell style={{ minWidth: 120 }}>Note Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {noteTasks.length == 0 ? (
              <TableRow>
                <p className={poppins.className}>No Notes Data Found</p>
              </TableRow>
            ) : (
              noteTasks
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((i) => {
                  return (
                    <TableRow key={i.id}>
                      <TableCell style={{ minWidth: 100 }}>
                        <div className="flex flex-row gap-4">
                          <CloseIcon
                            className="text-orange-400 hover:cursor-pointer"
                            onClick={() => handleDelete(i)}
                          />
                          <EditIcon
                            className="text-orange-400 hover:cursor-pointer"
                            onClick={() => handleEdit(i)}
                          />
                        </div>
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {moment(i.currentDate).format("MM-DD-YYYY")}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>{i.user}</TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.noteCategory}
                      </TableCell>
                      <TableCell style={{ minWidth: 120 }}>
                        {moment(i.dueDate).format("MM-DD-YYYY")}
                      </TableCell>
                      <TableCell style={{ minWidth: 120 }}>
                        {i.description}
                      </TableCell>
                      <TableCell style={{ minWidth: 120 }}>
                        {i.noteStatus}
                      </TableCell>
                    </TableRow>
                  );
                })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={noteTasks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default NoteTaskTable;
