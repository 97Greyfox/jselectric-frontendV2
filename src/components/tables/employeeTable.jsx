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
import Swal from "sweetalert2";
import EmployeeDrawer from "../drawers/employeeDrawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EmployeeInfo from "../modals/employeeInfoModal";
import { Skeleton } from "../ui/skeleton";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
export default function EmployeeTable({ allUsers, loading, refreshData }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [actionFlag, setActionFlag] = useState(false);
  const [empId, setEmpId] = useState("");
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
    setEmpId(id);
    setItem(objData);
    setActionFlag(!actionFlag);
  };
  const openEmpModal = (data) => {
    setEmpId(data.id);
    setEditData(data);
    if (openModal) {
      refreshData();
    }
    setOpenModal(!openModal);
  };
  const openInfoDrawer = (i) => {
    setEmpId(i.id);
    setInfoModal(!infoModal);
  };
  const editEmp = (data, id) => {
    axios
      .patch(`${apiPath.prodPath}/api/users/${id}`, data)
      .then((res) => {
        refreshData();
        openEmpModal();
        setActionFlag(false);
      })
      .catch((err) => console.log(err));
  };
  const deleteEmp = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are You Sure?",
      text: "Are you sure you want to delete the employee data? This action is irreversible.",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiPath.prodPath}/api/users/${id}`)
          .then((res) => {
            refreshData();
            openEmpModal();
            setActionFlag(false);
          })
          .catch((err) => console.log(err));
      }
    });
  };
  const sortedUser = allUsers.sort((a, b) =>
    a.fullname.localeCompare(b.fullname)
  );
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
        <TableContainer sx={{ height: 550 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 150 }}>Actions</TableCell>
                <TableCell style={{ minWidth: 150 }}>User Status</TableCell>
                <TableCell style={{ minWidth: 150 }}>Full name</TableCell>
                <TableCell style={{ minWidth: 150 }}>Position</TableCell>
                <TableCell style={{ minWidth: 150 }}>Personal Phone</TableCell>
                <TableCell style={{ minWidth: 150 }}>Company Phone</TableCell>
                <TableCell style={{ minWidth: 150 }}>Email</TableCell>
                <TableCell style={{ minWidth: 150 }}>Vehicle</TableCell>
                <TableCell style={{ minWidth: 150 }}>Tablet</TableCell>
                <TableCell style={{ minWidth: 150 }}>Primary Address</TableCell>
                <TableCell style={{ minWidth: 150 }}>City</TableCell>
                <TableCell style={{ minWidth: 150 }}>State</TableCell>
                <TableCell style={{ minWidth: 150 }}>Zipcode</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedUser.length == 0 ? (
                <TableRow>
                  <p className={poppins.className}>No Employee Data Found</p>
                </TableRow>
              ) : (
                sortedUser
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
                              <DropdownMenuItem
                                onClick={() => openInfoDrawer(i)}
                              >
                                Open
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openEmpModal(i)}>
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => deleteEmp(i.id)}>
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                        <TableCell>{i.userStatus}</TableCell>
                        <TableCell>{i.fullname}</TableCell>
                        <TableCell>{i.position}</TableCell>
                        <TableCell>{i.personalPhone}</TableCell>
                        <TableCell>{i.companyPhone}</TableCell>
                        <TableCell>{i.email}</TableCell>
                        <TableCell>{i.vehicle}</TableCell>
                        <TableCell>{i.tablet}</TableCell>
                        <TableCell>
                          {i.primaryAddress == undefined
                            ? "N/A"
                            : i.primaryAddress}
                        </TableCell>
                        <TableCell>{i.city}</TableCell>
                        <TableCell>
                          {i.state == undefined ? "N/A" : i.state}
                        </TableCell>
                        <TableCell>
                          {i.zipcode == undefined ? "N/A" : i.zipcode}
                        </TableCell>
                        {openModal && empId == i.id ? (
                          <EmployeeDrawer
                            edit={true}
                            open={openModal}
                            onClose={() => setOpenModal(false)}
                            id={i.id}
                            data={i}
                            editEmp={editEmp}
                          />
                        ) : null}
                        {infoModal && empId == i.id ? (
                          <EmployeeInfo
                            open={infoModal}
                            onClose={() => setInfoModal(false)}
                            item={i}
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
        count={sortedUser.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
