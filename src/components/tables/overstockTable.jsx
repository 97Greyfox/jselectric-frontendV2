import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["300", "500"],
  style: ["normal"],
  subsets: ["latin"],
});
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import Swal from "sweetalert2";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import OverstockDrawer from "../drawers/overstockDrawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Paper } from "@mui/material";

// import NeedTagDrawer from "../drawers/needTagDrawer";
function OverstockTable({ overstock, refreshData }) {
  const [openFlag, setOpenFlag] = useState(false);
  const [editData, setEditData] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const openEmpModal = (data) => {
    setEditData(data);
    setOpenFlag(!openFlag);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const deleteOverstock = (idObj) => {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to delete this?",
      showCancelButton: true,
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiPath.prodPath}/api/overstock/${idObj}`)
          .then((res) => {
            if (res.data.error) {
              Swal.fire({
                icon: "error",
                text: "Unable to delete",
              });
            }
            if (res.data.error == false) {
              Swal.fire({
                icon: "success",
                text: "Deleted Successfully",
              });
              refreshData();
            }
          });
      }
    });
  };
  return (
    <Paper
      className={poppins.className}
      sx={{ width: "100%", overflow: "hidden", bgcolor: "transparent" }}
    >
      <TableContainer sx={{ maxHeight: 550 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Actions</TableCell>
              <TableCell>Overstock Categories</TableCell>
              <TableCell>Item Description</TableCell>
              <TableCell>EST Avail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {overstock
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
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
                          <DropdownMenuItem onClick={() => openEmpModal(row)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => deleteOverstock(row.id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                    <TableCell>{row.overstockCategory}</TableCell>
                    <TableCell>{row.itemDesc}</TableCell>
                    <TableCell>{row.estAvail}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <OverstockDrawer
        open={openFlag}
        onClose={() => setOpenFlag(!openFlag)}
        refreshData={refreshData}
        edit={true}
        editData={editData}
        id={editData.id}
      />
      <TablePagination
        rowsPerPageOptions={[20, 30, 40, 50]}
        component="div"
        count={overstock.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default OverstockTable;
