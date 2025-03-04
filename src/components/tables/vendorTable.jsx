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
import { Skeleton } from "@/components/ui/skeleton";

import StarRateIcon from "@mui/icons-material/StarRate";
import VendorDrawer from "../drawers/vendorDrawer";
import VendorInfoModal from "../modals/vendorInfoModal";
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
export default function VendorTable({ allVendors, loading, refreshData }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [actionFlag, setActionFlag] = useState(false);
  const [vendorId, setVendorId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [infoModal, setInfoModal] = useState(false);
  const [item, setItem] = useState();
  useEffect(() => {
    setPage(0);
  }, [loading]);
  const handleActions = (id, objData) => {
    setVendorId(id);
    setItem(objData);
    setActionFlag(!actionFlag);
  };
  const openEmpModal = (data) => {
    setVendorId(data.id);
    setEditData(data);
    setOpenModal(!openModal);
  };
  const openInfoDrawer = (data) => {
    setVendorId(data.id);
    setInfoModal(true);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const editVendor = (data, id) => {
    axios
      .patch(`${apiPath.prodPath}/api/vendor/${id}`, data)
      .then((res) => {
        refreshData();
        openEmpModal();
        setActionFlag(false);
      })
      .catch((err) => console.log(err));
  };
  const deleteVendor = (id) => {
    setActionFlag(!actionFlag);
    Swal.fire({
      icon: "warning",
      title: "Are You Sure?",
      text: "Are you sure you want to delete the Vendor data? This action is irreversible.",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiPath.prodPath}/api/vendor/${id}`)
          .then((res) => {
            refreshData();
            openEmpModal();
            setActionFlag(false);
          })
          .catch((err) => console.log(err));
      }
    });
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
        <TableContainer sx={{ height: 550 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow style={{ position: "relative" }}>
                <TableCell style={{ minWidth: 10 }}></TableCell>
                <TableCell style={{ minWidth: 150 }}>Actions</TableCell>
                <TableCell style={{ minWidth: 150 }}>Name</TableCell>
                <TableCell style={{ minWidth: 150 }}>Company Name</TableCell>
                <TableCell style={{ minWidth: 150 }}>Address</TableCell>
                <TableCell style={{ minWidth: 150 }}>City</TableCell>
                <TableCell style={{ minWidth: 150 }}>State</TableCell>
                <TableCell style={{ minWidth: 150 }}>Zipcode</TableCell>
                <TableCell style={{ minWidth: 150 }}>Primary Contact</TableCell>
                <TableCell style={{ minWidth: 150 }}>Phone</TableCell>
                <TableCell style={{ minWidth: 150 }}>Email</TableCell>
                <TableCell style={{ minWidth: 150 }}>Website</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allVendors.length == 0 ? (
                <TableRow>
                  <p className={poppins.className}>No Jobs Data Found</p>
                </TableRow>
              ) : (
                allVendors
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((i) => {
                    return (
                      <TableRow key={i.id}>
                        <TableCell>
                          {i.preferred ? (
                            <StarRateIcon color="warning" />
                          ) : null}
                        </TableCell>
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
                              <DropdownMenuItem
                                onClick={() => deleteVendor(i.id)}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.name}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.companyName}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.address}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.city}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.state}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.zipCode}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.primaryContact}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.phone}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.email}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.website}
                        </TableCell>

                        {infoModal && i.id == vendorId ? (
                          <VendorInfoModal
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
            {openModal && editData ? (
              <VendorDrawer
                edit={true}
                open={openModal}
                onClose={() => setOpenModal(false)}
                id={vendorId}
                data={editData}
                editVendor={editVendor}
              />
            ) : null}
          </Table>
        </TableContainer>
      )}
      <TablePagination
        rowsPerPageOptions={[10, 20, 30, 40]}
        component="div"
        count={allVendors.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
