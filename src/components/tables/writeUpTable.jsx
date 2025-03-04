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
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
import WriteUpDrawer from "../drawers/writeup";
import WriteUpInfo from "../modals/writeUpInfoModal";
import SignatureModal from "../modals/signatureModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export default function WriteUpTable({ data, refreshData, loading }) {
  const [oldFiles, setOldFiles] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [item, setItem] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [writeUpId, setwriteUpId] = useState("");
  const [actionFlag, setActionFlag] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [signatureModal, setSignatureModal] = useState(false);
  useEffect(() => {
    setPage(0);
  }, [loading]);
  const handleActions = (id, objData) => {
    setwriteUpId(id);
    setItem(objData);
    setActionFlag(!actionFlag);
  };
  const handleEdit = (item) => {
    setItem(item);
    setwriteUpId(item.id);
    setDrawer(true);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = (data) => {
    Swal.fire({
      icon: "error",
      text: "Are you sure you want to delete the Write Up data",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      showConfirmButton: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiPath.prodPath}/api/writeUp/${writeUpId}`)
          .then((res) => {
            if (res.data.error) {
              Swal.fire({ icon: "error", text: "Error Deleting Data" });
            } else {
              Swal.fire({ icon: "success", text: "Deleted Successfully" });
              refreshData();
            }
          });
      }
    });
  };
  const handleCloseDrawer = () => {
    setDrawer(false);
  };
  const openInfoDrawer = (i) => {
    setwriteUpId(i.id);
    setInfoModal(!infoModal);
  };
  const openSignatrueModal = (i) => {
    setItem(i);
    setwriteUpId(i.id);
    setSignatureModal(!signatureModal);
  };
  return (
    <Paper
      className={poppins.className}
      sx={{ width: "100%", overflow: "hidden", bgcolor: "transparent" }}
    >
      {loading ? (
        <h1 className={`${poppins.className} loading-h`}>Loading...</h1>
      ) : (
        <TableContainer sx={{ height: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 150 }}>Actions</TableCell>
                <TableCell style={{ minWidth: 150 }}>Signature</TableCell>
                <TableCell style={{ minWidth: 150 }}>Date Created</TableCell>
                <TableCell style={{ minWidth: 150 }}>Created By</TableCell>
                <TableCell style={{ minWidth: 150 }}>Employee Name</TableCell>
                <TableCell style={{ minWidth: 150 }}>Date Added</TableCell>
                <TableCell style={{ minWidth: 150 }}>Warning</TableCell>
                <TableCell style={{ minWidth: 150 }}>Offences</TableCell>
                <TableCell style={{ minWidth: 150 }}>Other Offence</TableCell>
                <TableCell style={{ minWidth: 150 }}>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.length == 0 ? (
                <TableRow>
                  <p className={poppins.className}>No Training Data found</p>
                </TableRow>
              ) : (
                data &&
                data
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
                              <DropdownMenuItem onClick={() => handleEdit(i)}>
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDelete(i)}>
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          <button
                            className="p-2 bg-orange-400 text-white rounded-xl"
                            onClick={() => openSignatrueModal(i)}
                          >
                            {i.signature == undefined
                              ? "Add"
                              : Object.keys(i.signature).length == 0
                              ? "Add"
                              : "View"}
                          </button>
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.dateCreated}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.createdBy}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.employeeName}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.dateAdded}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.typeOfWarning}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.typeOfOffences.length
                            ? i.typeOfOffences.map((inner, ind) => {
                                if (ind == i.typeOfOffences.length - 1) {
                                  return `${inner}`;
                                } else {
                                  return `${inner}, `;
                                }
                              })
                            : "N/A"}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.otherOffence}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.description}
                        </TableCell>
                        {signatureModal && writeUpId == i.id ? (
                          <SignatureModal
                            moduleName="writeUp"
                            item={item}
                            handleClose={() => setSignatureModal(false)}
                            open={signatureModal}
                            refreshData={refreshData}
                          />
                        ) : null}
                        {drawer && writeUpId == i.id ? (
                          <WriteUpDrawer
                            refreshData={refreshData}
                            open={drawer}
                            data={item}
                            onClose={handleCloseDrawer}
                            editFlag={true}
                            id={item.id}
                          />
                        ) : null}
                        {infoModal && writeUpId == i.id ? (
                          <WriteUpInfo
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
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
