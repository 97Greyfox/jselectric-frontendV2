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
import StorageLocationDrawer from "../drawers/storageLocationDrawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

function StorageLocationTable({ allStorageLocation, refreshData }) {
  const [openFlag, setOpenFlag] = useState(false);
  const [editData, setEditData] = useState("");
  const openEmpModal = (data) => {
    setEditData(data);
    setOpenFlag(!openFlag);
  };
  const deleteNeedTag = (idObj) => {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to delete this?",
      showCancelButton: true,
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiPath.prodPath}/api/storageLocation/${idObj}`)
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
    <section>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Actions</TableCell>
              <TableCell>Building</TableCell>
              <TableCell>Storage Id</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allStorageLocation.map((row) => {
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
                        <DropdownMenuItem
                          onClick={() => {
                            openEmpModal(row);
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            deleteNeedTag(row.id);
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell>{row.building}</TableCell>
                  <TableCell>{row.storageId}</TableCell>
                  <TableCell>{row.notes}</TableCell>
                  <TableCell>{row.description}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <StorageLocationDrawer
        open={openFlag}
        onClose={() => setOpenFlag(!openFlag)}
        refreshData={refreshData}
        edit={true}
        editData={editData}
        id={editData.id}
      />
    </section>
  );
}

export default StorageLocationTable;
