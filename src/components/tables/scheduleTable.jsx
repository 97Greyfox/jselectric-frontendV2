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
import { Skeleton } from "@/components/ui/skeleton";

import ScheduleDrawer from "../drawers/scheduleDrawer";
import ScheduleModal from "../modals/scheduleModal";
// import ScheduleModal from "../modal/scheduleModal";
// import ScheduleDrawer from "../drawers/scheduleDrawer";
// import EmployeeDrawer from "../drawers/employeeDrawer";
import Swal from "sweetalert2";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
function ScheduleTable({ allUsers, refreshData, loading }) {
  const [actionFlag, setActionFlag] = useState(false);
  const [scheduleId, setScheduleId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [item, setItem] = useState("");
  const [scheduleModal, setScheduleModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
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
  const handleActions = (id, objData) => {
    setScheduleId(id);
    setActionFlag(!actionFlag);
  };
  const openEmpModal = (data) => {
    setEditData(data);
    setOpenModal(!openModal);
  };
  const scheduleModalHandler = (i) => {
    setItem(i);
    setScheduleModal(!scheduleModal);
  };
  const handleCloseDrawer = () => {
    setDrawer(!drawer);
  };
  return (
    <Paper
      className={poppins.className}
      sx={{ width: "100%", overflow: "hidden", bgcolor: "transparent" }}
    >
      {loading ? (
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[300px] w-[500px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : (
        <TableContainer sx={{ height: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 150 }}>Employee Name</TableCell>
                <TableCell style={{ minWidth: 150 }}>Position</TableCell>
                <TableCell style={{ minWidth: 150 }}>Email</TableCell>
                <TableCell style={{ minWidth: 120 }}>Schedule</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers.length == 0 ? (
                <TableRow>
                  <p className={poppins.className}>No Schedule Data Found</p>
                </TableRow>
              ) : (
                allUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((i) => {
                    return (
                      <TableRow key={i.id}>
                        <TableCell>{i.fullname}</TableCell>
                        <TableCell>{i.position}</TableCell>
                        <TableCell>{i.email}</TableCell>
                        <TableCell>
                          {i.schedules && i.schedules.length ? (
                            <button
                              className={`${poppins.className} border-2 border-orange-400 bg-orange-400 rounded-xl p-2 text-white`}
                              onClick={() => scheduleModalHandler(i)}
                            >
                              View Schedules
                            </button>
                          ) : (
                            <button
                              className={`${poppins.className} border-2 border-orange-400 bg-orange-300 rounded-xl p-2 text-white`}
                              onClick={() => {
                                setItem(i);
                                setDrawer(true);
                              }}
                            >
                              Set Schedule
                            </button>
                          )}
                        </TableCell>
                        {scheduleModal && i._id == item._id ? (
                          <ScheduleModal
                            open={scheduleModal}
                            handleClose={() => setScheduleModal(false)}
                            schedules={item.schedules}
                            userObj={{ label: item.fullname, value: item.id }}
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
      <ScheduleDrawer
        open={drawer}
        onClose={handleCloseDrawer}
        refreshData={refreshData}
        userObj={{ label: item.fullname, value: item.id }}
      />
      <TablePagination
        rowsPerPageOptions={[20, 30, 40, 50]}
        component="div"
        count={allUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default ScheduleTable;
