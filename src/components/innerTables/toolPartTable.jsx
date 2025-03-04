import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";

function ToolPartTable({ allParts, loading, editData, deletePart }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Actions</TableCell>
              <TableCell>Parts No</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell>Loading....</TableCell>
              </TableRow>
            ) : allParts.length ? (
              allParts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((i) => {
                  return (
                    <TableRow key={i.id}>
                      <TableCell>
                        <div className="flex flex-row gap-2">
                          <EditIcon
                            className="text-blue-400"
                            onClick={() => editData(i)}
                          />
                          <DeleteIcon
                            className="text-red-500"
                            onClick={() => deletePart(i.id)}
                          />
                        </div>

                        {/* <Image
                          onClick={() => handleActions(i.id, i)}
                          src="/dots.png"
                          width={32}
                          height={32}
                        />
                        {actionFlag && i.id == partId ? (
                          <div className="dropdown-div">
                            <p
                              onClick={() => editData(i)}
                              className={poppins.className}
                            >
                              Edit
                            </p>
                            <p
                              onClick={() => deletePart(i.id)}
                              className={poppins.className}
                            >
                              Delete
                            </p>
                          </div>
                        ) : null} */}
                      </TableCell>
                      <TableCell>{i.partNo}</TableCell>
                      <TableCell>{i.description}</TableCell>
                    </TableRow>
                  );
                })
            ) : (
              <TableRow>
                <TableCell>No Data Found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3]}
        component="div"
        count={allParts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

export default ToolPartTable;
