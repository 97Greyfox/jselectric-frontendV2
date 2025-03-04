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
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Swal from "sweetalert2";
import moment from "moment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TagoutDrawer from "../drawers/tagoutDrawer";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
export default function TagoutTable({
  allTagouts,
  loading,
  refreshData,
  user,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [actionFlag, setActionFlag] = useState(false);
  const [tagoutId, settagoutId] = useState("");
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
  const handleActions = (id, objData) => {
    settagoutId(id);
    setItem(objData);
    setActionFlag(!actionFlag);
  };
  const openEmpModal = (data) => {
    settagoutId(data.id);
    setEditData(data);
    setOpenModal(true);
  };
  const openInfoDrawer = () => {
    setInfoModal(!infoModal);
    setActionFlag(false);
  };
  const editTagout = (data, id) => {
    axios
      .patch(`${apiPath.prodPath}/api/tagout/${id}`, data)
      .then((res) => {
        refreshData();
        setOpenModal(false);
        setActionFlag(false);
      })
      .catch((err) => console.log(err));
  };
  const deleteTagout = (id) => {
    setActionFlag(false);
    Swal.fire({
      icon: "warning",
      title: "Are You Sure?",
      text: "Are you sure you want to delete the Tagout data? This action is irreversible.",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiPath.prodPath}/api/tagout/${id}`)
          .then((res) => {
            refreshData();
            openEmpModal();
            setActionFlag(false);
          })
          .catch((err) => console.log(err));
      }
    });
  };
  const sortedTagout =
    allTagouts.length == 0
      ? []
      : allTagouts.sort((a, b) => a.tagNumber.localeCompare(b.tagNumber));
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
                <TableCell style={{ minWidth: 150 }}>Actions</TableCell>
                <TableCell style={{ minWidth: 150 }}>Tag Number</TableCell>
                <TableCell style={{ minWidth: 150 }}>User</TableCell>
                <TableCell style={{ minWidth: 150 }}>Current Date</TableCell>
                <TableCell style={{ minWidth: 150 }}>Name</TableCell>
                <TableCell style={{ minWidth: 150 }}>Phone</TableCell>
                <TableCell style={{ minWidth: 180 }}>Equipment Name</TableCell>
                <TableCell style={{ minWidth: 180 }}>
                  Equipment Location
                </TableCell>
                <TableCell style={{ minWidth: 120 }}>Date Applied</TableCell>
                <TableCell style={{ minWidth: 120 }}>Released Date</TableCell>
                <TableCell style={{ minWidth: 120 }}>
                  Released Initials
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedTagout.length == 0 ? (
                <TableRow>
                  <p className={poppins.className}>
                    No Lockout/Tagout Data Found
                  </p>
                </TableRow>
              ) : (
                sortedTagout
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
                                onClick={() => deleteTagout(i.id)}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                        <TableCell style={{ minWidth: 80 }}>
                          {i.tagNumber}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.user}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {moment(i.currentDate).format("MM-DD-YYYY")}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.name}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.phone}
                        </TableCell>
                        <TableCell style={{ minWidth: 120 }}>
                          {i.equipmentName}
                        </TableCell>
                        <TableCell style={{ minWidth: 120 }}>
                          {i.equipmentLocation}
                        </TableCell>
                        <TableCell style={{ minWidth: 120 }}>
                          {moment(i.dateApplied).format("MM-DD-YYYY")}
                        </TableCell>
                        <TableCell style={{ minWidth: 120 }}>
                          {moment(i.releasedDate).format("MM-DD-YYYY")}
                        </TableCell>
                        <TableCell style={{ minWidth: 120 }}>
                          {moment(i.releasedInitials).format("MM-DD-YYYY")}
                        </TableCell>
                        {openModal && editData && i.id == tagoutId ? (
                          <TagoutDrawer
                            edit={true}
                            open={openModal}
                            onClose={() => setOpenModal(false)}
                            id={tagoutId}
                            editData={editData}
                            editTagout={editTagout}
                            loggedInUser={user}
                          />
                        ) : null}
                      </TableRow>
                    );
                  })
              )}
            </TableBody>

            {/* {infoModal ? (
              <ToolInfo
                open={infoModal}
                onClose={openInfoDrawer}
                item={item}
                refreshData={refreshData}
              />
            ) : null} */}
          </Table>
        </TableContainer>
      )}
      <TablePagination
        rowsPerPageOptions={[20, 30, 40, 50]}
        component="div"
        count={sortedTagout.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
