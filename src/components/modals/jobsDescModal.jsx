import {
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import moment from "moment";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React, { useState } from "react";
import { Button } from "../ui/button";
function JobDescModal({ open, onClose, job }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex flex-row justify-center align-middle w-full h-full"
    >
      <div className="bg-white w-5/6 h-dvh p-10 border-none overflow-y-scroll">
        <div className="mb-10">
          <Button
            onClick={() => onClose()}
            className="bg-transparent flex flex-row text-black hover:bg-transparent text-3xl p-0"
          >
            <ArrowBackIosIcon className="text-4xl text-gray-500" />
            <h1 className="text-3xl font-semibold">Assigned Jobs</h1>
          </Button>
        </div>
        <Paper
          sx={{ width: "100%", overflow: "hidden", bgcolor: "transparent" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Job</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {job.userLabor &&
                job.userLabor
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((i) => {
                    return (
                      <TableRow key={i.id}>
                        <TableCell>{i.job}</TableCell>
                        <TableCell>
                          {moment(i.startDate).format("MM/DD/YYYY")}
                        </TableCell>
                        <TableCell>
                          {moment(i.endDate).format("MM/DD/YYYY")}
                        </TableCell>
                        <TableCell>
                          {i.foreman
                            ? "Foreman"
                            : i.journeyman
                            ? "Journeyman"
                            : i.apprentice
                            ? "Apprentice"
                            : "Construction"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[20, 30, 40, 50]}
            component="div"
            count={job && job.userLabor.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </Modal>
  );
}

export default JobDescModal;
