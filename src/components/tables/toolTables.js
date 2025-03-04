import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Image from "next/image";
import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ToolsDrawer from "../drawers/toolsAdd";
import ToolInfoModal from "../modals/toolInfoModal";

function ToolsTable({ allTools, active, refreshData }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [toolId, setToolId] = useState("");
  const [item, setItem] = useState();
  const [openFlag, setOpenFLag] = useState(false);
  const [infoModalFlag, setInfoModalFLag] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleOpenItem = (item) => {
    setInfoModalFLag(true);
    setToolId(item.id);
    setItem(item);
  };
  const handleEditItem = (item) => {
    setToolId(item.id);
    setItem(item);
    setOpenFLag(true);
  };
  const editToolHandler = (data, id) => {
    axios
      .patch(`${apiPath.prodPath}/api/tools/${id}`, data)
      .then((res) => {
        refreshData();
      })
      .catch((err) => console.log(err));
  };
  const handleDeleteItem = (item, fileObj) => {
    setToolId(item.id);
    setItem(item);
    const file = JSON.stringify(fileObj);
    Swal.fire({
      icon: "warning",
      title: "Are You Sure?",
      text: "Are you sure you want to delete the Tools data? This action is irreversible.",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`${apiPath.prodPath}/api/tools/${item.id}`, { file })
          .then((res) => {
            refreshData();
          })
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <>
      <TableContainer sx={{ height: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: 100 }}>Actions</TableCell>
              <TableCell style={{ minWidth: 80 }}>Tool#</TableCell>
              <TableCell style={{ minWidth: 80 }}>Serial#</TableCell>
              <TableCell style={{ minWidth: 150 }}>Category</TableCell>
              <TableCell style={{ minWidth: 150 }}>Sub-Category</TableCell>
              <TableCell style={{ minWidth: 150 }}>Brand</TableCell>
              <TableCell style={{ minWidth: 150 }}>Description</TableCell>
              <TableCell style={{ minWidth: 120 }}>Tech Assigned</TableCell>
              <TableCell style={{ minWidth: 120 }}>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allTools.length == 0 ? (
              <TableRow>
                <TableCell>No Tools Data Found</TableCell>
              </TableRow>
            ) : (
              allTools
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
                            <DropdownMenuItem onClick={() => handleOpenItem(i)}>
                              Open
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditItem(i)}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteItem(i, i.picture)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                      <TableCell>{i.toolNumber}</TableCell>
                      <TableCell>{i.serial}</TableCell>
                      <TableCell>{i.category}</TableCell>
                      <TableCell>{i.subCategory}</TableCell>
                      <TableCell>{i.brand}</TableCell>
                      <TableCell>{i.description}</TableCell>
                      <TableCell>{i.techAssigned}</TableCell>
                      <TableCell>{i.location}</TableCell>
                      {i.id == toolId && openFlag ? (
                        <ToolsDrawer
                          open={openFlag}
                          onClose={() => setOpenFLag(false)}
                          edit={true}
                          editTool={editToolHandler}
                          id={toolId}
                          data={item}
                        />
                      ) : null}
                      {i.id == toolId && infoModalFlag ? (
                        <ToolInfoModal
                          open={infoModalFlag}
                          item={item}
                          handleClose={() => setInfoModalFLag(false)}
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
      <TablePagination
        rowsPerPageOptions={[20, 30, 40, 50]}
        component="div"
        count={allTools.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default ToolsTable;
