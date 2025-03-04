import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["300", "500"],
  style: ["normal"],
  subsets: ["latin"],
});
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import { EditIcon } from "lucide-react";
import ReimbursalModal from "../modals/timeTrackModal";

function TimeTrackTable({
  allTimeTrack,
  loading,
  deleteData,
  handleEdit,
  handlePagination,
  totalCount,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  console.log("loading", loading);
  console.log("allTime", allTimeTrack);
  const [openFlag, setOpenFlag] = useState(false);
  const [history, setHistory] = useState([]);
  const [id, setId] = useState("");
  const [modalFlag, setModalFlag] = useState(false);
  const [modalData, setModalData] = useState([]);
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
  const handleReimModal = (id, reim) => {
    setModalData(reim);
    setId(id);
    setModalFlag(!modalFlag);
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
  return loading ? (
    <p className={poppins.className}>Loading...</p>
  ) : (
    <section>
      <TableContainer className={poppins.className} sx={{ maxHeight: 550 }}>
        <Table stickyHeader aria-label="sticky table" id="time-track-report">
          <TableHead>
            <TableRow>
              <TableCell>Actions</TableCell>
              <TableCell style={{ minWidth: 150 }}>Employee</TableCell>
              <TableCell style={{ minWidth: 150 }}>Job Description</TableCell>
              <TableCell style={{ minWidth: 150 }}>Phase</TableCell>
              <TableCell style={{ minWidth: 100 }}>Date</TableCell>
              <TableCell style={{ minWidth: 150 }}>Timings</TableCell>
              <TableCell style={{ minWidth: 150 }}>Lunch</TableCell>
              <TableCell style={{ minWidth: 150 }}>Lunch Timings</TableCell>
              <TableCell style={{ minWidth: 150 }}>Spectrum</TableCell>
              <TableCell style={{ minWidth: 150 }}>Notes</TableCell>
              <TableCell style={{ minWidth: 150 }}>User</TableCell>
              <TableCell style={{ minWidth: 150 }}>Reimbursal Flag</TableCell>
              <TableCell style={{ minWidth: 150 }}>Reimbursals</TableCell>
            </TableRow>
          </TableHead>
          {loading ? (
            <p>Loading....</p>
          ) : (
            <TableBody>
              {allTimeTrack && allTimeTrack.length ? (
                allTimeTrack
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row._id}
                      >
                        <TableCell>
                          <div className="action-wrap">
                            <EditIcon
                              onClick={() => handleEdit(row)}
                              className="text-orange-400 hover:cursor-pointer"
                            />
                          </div>
                        </TableCell>
                        <TableCell>{row.employee}</TableCell>
                        <TableCell>{row.jobDescription}</TableCell>
                        <TableCell>{row.phase}</TableCell>
                        <TableCell>
                          {moment(row.date).format("MM/DD/YYYY")}
                        </TableCell>
                        <TableCell>{`${tConvert(row.startTime)} to ${tConvert(
                          row.endTime
                        )}`}</TableCell>
                        <TableCell>
                          {row.lunch == false ? "No" : "Yes"}
                        </TableCell>
                        <TableCell>
                          {row.lunch ? `${row.lunchTime} min` : "none"}
                        </TableCell>
                        <TableCell>
                          {row.spectrum == false ? "No" : "Yes"}
                        </TableCell>
                        <TableCell>{row.notes}</TableCell>
                        <TableCell>{row.user}</TableCell>
                        <TableCell>
                          {row.reimbursalFlag == "reimbursal"
                            ? "true"
                            : "false"}
                        </TableCell>
                        <TableCell>
                          {row.reimbursal && row.reimbursal.length > 0 ? (
                            <button
                              className="bg-orange-400 text-white rounded-xl p-2 font-semibold"
                              onClick={() =>
                                handleReimModal(row.id, row.reimbursal)
                              }
                            >
                              View
                            </button>
                          ) : (
                            "none"
                          )}
                        </TableCell>
                        {modalFlag && id == row._id ? (
                          <ReimbursalModal
                            openFlag={modalFlag}
                            data={modalData}
                            handleClose={() => setModalFlag(false)}
                          />
                        ) : null}
                      </TableRow>
                    );
                  })
              ) : (
                <p>No Data Found</p>
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[20, 30, 40, 50]}
        component="div"
        rowsPerPage={rowsPerPage}
        count={allTimeTrack.length}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </section>
  );
}

export default TimeTrackTable;
