import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  TableContainer,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";

import ReimbursalModal from "../modals/timeTrackModal";
function HistoryShifts({ shifts }) {
  const [reimModal, setReimModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const handleReimModal = (dataObj) => {
    setData(dataObj);
    setReimModal(true);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <TableContainer sx={{ height: 400 }}>
      <Table stickyHeader style={{ width: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell style={{ minWidth: 200 }}>Date</TableCell>
            <TableCell style={{ minWidth: 100 }}>Day</TableCell>
            <TableCell style={{ minWidth: 100 }}>Checked In</TableCell>
            <TableCell style={{ minWidth: 100 }}>Checked Out</TableCell>
            <TableCell style={{ minWidth: 100 }}>Lunch Start</TableCell>
            <TableCell style={{ minWidth: 100 }}>Lunch End</TableCell>
            <TableCell style={{ minWidth: 100 }}>Notes</TableCell>
            <TableCell style={{ minWidth: 100 }}>Reimbursal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shifts.length
            ? shifts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((i, ind) => {
                  return (
                    <TableRow key={`${i.fullname}-${ind}`}>
                      <TableCell style={{ minWidth: 200 }}>
                        {moment(i.date).format("MM-DD-YYYY")}
                      </TableCell>
                      <TableCell style={{ minWidth: 100 }}>
                        {i.dayName}
                      </TableCell>
                      <TableCell style={{ minWidth: 100 }}>
                        {i.checkedIn == "" ? "N/A" : i.checkedIn}
                      </TableCell>
                      <TableCell style={{ minWidth: 100 }}>
                        {i.checkedOut == "" ? "N/A" : i.checkedOut}
                      </TableCell>
                      <TableCell style={{ minWidth: 100 }}>
                        {i.lunchTimeStart == "" ? "N/A" : i.lunchTimeStart}
                      </TableCell>
                      <TableCell style={{ minWidth: 100 }}>
                        {i.lunchTimeEnd == "" ? "N/A" : i.lunchTimeEnd}
                      </TableCell>
                      <TableCell style={{ minWidth: 100 }}>
                        {i.notes == "" ? "N/A" : i.notes}
                      </TableCell>
                      <TableCell style={{ minWidth: 100 }}>
                        {i.reimbursal.length == 0 ? (
                          "N/A"
                        ) : (
                          <button
                            onClick={() => handleReimModal(i.reimbursal)}
                            className="bg-orange-400 p-2 text-white rounded-xl"
                          >
                            View Reimbursals
                          </button>
                        )}
                      </TableCell>
                      <ReimbursalModal
                        data={data}
                        openFlag={reimModal}
                        handleClose={() => setReimModal(false)}
                      />
                    </TableRow>
                  );
                })
            : null}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={shifts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}

export default HistoryShifts;
