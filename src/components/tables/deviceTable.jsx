import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Image from "next/image";
// import EmployeeDrawer from "../drawers/employeeDrawer";
import Swal from "sweetalert2";
import DeviceDrawer from "../drawers/deviceDrawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
export default function DeviceTable({ allDevices, loading, refreshData }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [actionFlag, setActionFlag] = useState(false);
  const [deviceId, setDeviceId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [infoModal, setInfoModal] = useState(false);
  const [item, setItem] = useState();
  useEffect(() => {
    setPage(0);
  }, [loading]);
  const openEmpModal = (data) => {
    setDeviceId(data.id);
    setEditData(data);
    setOpenModal(!openModal);
  };
  const openInfoDrawer = () => {
    if (infoModal) {
      setActionFlag(false);
    }
    setInfoModal(!infoModal);
  };
  const editDevice = (data, id) => {
    console.log("this is deviceID", deviceId);
    axios
      .patch(`${apiPath.prodPath}/api/devices/${deviceId}`, data)
      .then((res) => {
        refreshData();
        openEmpModal();
        setActionFlag(false);
      })
      .catch((err) => console.log(err));
    // axios
    //   .patch(`${apiPath.devPath}/api/devices/${id}`, data)
    //   .then((res) => {
    //     refreshData();
    //     openEmpModal();
    //     setActionFlag(false);
    //   })
    //   .catch((err) => console.log(err));
  };
  const deleteDevices = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are You Sure?",
      text: "Are you sure you want to delete the devices data? This action is irreversible.",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiPath.prodPath}/api/devices/${id}`)
          .then((res) => {
            refreshData();
            openEmpModal();
            setActionFlag(false);
          })
          .catch((err) => console.log(err));
      }
    });
  };
  const sortedDevices = allDevices.sort((a, b) =>
    a.category.localeCompare(b.category)
  );
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
      sx={{
        width: "100%",
        overflow: "scroll",
        bgcolor: "transparent",
        border: "none",
      }}
    >
      {loading ? (
        <h1 className={`${poppins.className} loading-h`}>Loading...</h1>
      ) : (
        <TableContainer sx={{ height: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 150 }}>Actions</TableCell>
                <TableCell style={{ minWidth: 150 }}>Category</TableCell>
                <TableCell style={{ minWidth: 150 }}>Billing Account</TableCell>
                <TableCell style={{ minWidth: 150 }}>Phone No</TableCell>
                <TableCell style={{ minWidth: 120 }}>Username</TableCell>
                <TableCell style={{ minWidth: 120 }}>Make/Model</TableCell>
                <TableCell style={{ minWidth: 120 }}>Upgrade Date</TableCell>
                <TableCell style={{ minWidth: 150 }}>
                  Usage Last Month
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedDevices.length == 0 ? (
                <TableRow>
                  <p className={poppins.className}>No Devices Data Found</p>
                </TableRow>
              ) : (
                sortedDevices
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((i) => {
                    return (
                      <TableRow key={i.id}>
                        <TableCell>
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
                                onClick={() => deleteDevices(i.id)}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                        <TableCell>{i.category}</TableCell>
                        <TableCell>{i.billingAccount}</TableCell>
                        <TableCell>{i.phoneNo}</TableCell>
                        <TableCell>{i.username}</TableCell>
                        <TableCell>{i.make}</TableCell>
                        <TableCell>{i.upgradeDate}</TableCell>
                        <TableCell>{i.usageLastMonth}</TableCell>
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
            {openModal && editData ? (
              <DeviceDrawer
                edit={true}
                open={openModal}
                onClose={() => setOpenModal(false)}
                id={deviceId}
                data={editData}
                editDevice={editDevice}
              />
            ) : null}
          </Table>
        </TableContainer>
      )}
      <TablePagination
        rowsPerPageOptions={[20, 30, 40, 50]}
        component="div"
        count={sortedDevices.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
