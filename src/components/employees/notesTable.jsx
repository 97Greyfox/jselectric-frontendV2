import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
function NoteTableComp({ allNotes, editHandler, deleteHandler }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", bgcolor: "transparent" }}>
      <TableContainer sx={{ height: 550 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: 150 }}>Actions</TableCell>
              <TableCell style={{ minWidth: 150 }}>Added By</TableCell>
              <TableCell style={{ minWidth: 150 }}>Date</TableCell>
              <TableCell style={{ minWidth: 150 }}>Time</TableCell>
              <TableCell style={{ minWidth: 350 }}>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allNotes.length == 0 ? (
              <TableRow>
                <p className={poppins.className}>No Notes Found</p>
              </TableRow>
            ) : (
              allNotes
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((i) => {
                  return (
                    <TableRow key={i.id}>
                      <TableCell style={{ position: "relative" }}>
                        <div className="flex flex-row gap-2">
                          <EditIcon
                            className="text-blue-400"
                            onClick={() => editHandler(i.note, i.id)}
                          />
                          <DeleteIcon
                            className="text-red-500"
                            onClick={() => deleteHandler(i.id)}
                          />
                        </div>
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>{i.user}</TableCell>
                      <TableCell style={{ minWidth: 150 }}>{i.date}</TableCell>
                      <TableCell style={{ minWidth: 150 }}>{i.time}</TableCell>
                      <TableCell style={{ minWidth: 350 }}>{i.note}</TableCell>
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
        count={allNotes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default NoteTableComp;
