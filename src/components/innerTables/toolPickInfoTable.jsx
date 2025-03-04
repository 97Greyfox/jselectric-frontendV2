import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
// import AttachmentModal from "./attachmentsModal";
import TableRow from "@mui/material/TableRow";
import { Poppins } from "next/font/google";
import Image from "next/image";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AttachmentModal from "../modals/attachmentModal";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
function PicInfoTable({ attachments, openEdit, deleteTool }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [actionFlag, setActionFlag] = useState(false);
  const [attachmentId, setAttachmentId] = useState("");
  const [item, setItem] = useState();
  const [modalFlag, setModalFlag] = useState(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleActions = (id, objData) => {
    setAttachmentId(id);
    setItem(objData);
    setActionFlag(!actionFlag);
  };
  const handleModal = () => {
    setModalFlag(!modalFlag);
  };
  return (
    <Paper
      className={poppins.className}
      sx={{ width: "100%", overflow: "hidden" }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: 80 }}>Note</TableCell>
              <TableCell style={{ minWidth: 150 }}>Attachments</TableCell>
              <TableCell style={{ minWidth: 150 }}>Date</TableCell>
              <TableCell style={{ minWidth: 150 }}>Time</TableCell>
              <TableCell style={{ minWidth: 150 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attachments.length == 0 ? (
              <TableRow>
                <p className={poppins.className}>No Tools Data Found</p>
              </TableRow>
            ) : (
              attachments
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((i) => {
                  return (
                    <TableRow key={i.id}>
                      <TableCell>
                        <span className={poppins.className}>{i.note}</span>
                      </TableCell>
                      <TableCell>
                        {i.files.length ? (
                          <button
                            className={`${poppins.className} p-2 bg-orange-400 text-white`}
                            onClick={() => {
                              setAttachmentId(i.id);
                              handleModal();
                            }}
                          >
                            View
                          </button>
                        ) : (
                          "no files"
                        )}
                      </TableCell>
                      <TableCell>
                        <span className={poppins.className}>{i.date}</span>
                      </TableCell>
                      <TableCell>
                        <span className={poppins.className}>{i.time}</span>
                      </TableCell>
                      <TableCell style={{ position: "relative" }}>
                        <div className="flex flex-row gap-2">
                          <EditIcon
                            className="text-blue-400"
                            onClick={() => {
                              openEdit(i);
                              setActionFlag(false);
                            }}
                          />
                          <DeleteIcon
                            className="text-red-500"
                            onClick={() => {
                              deleteTool(i);
                              setActionFlag(false);
                            }}
                          />
                        </div>
                      </TableCell>
                      {modalFlag && i.id == attachmentId ? (
                        <AttachmentModal
                          files={i.files}
                          openFlag={modalFlag}
                          closeModal={handleModal}
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
        rowsPerPageOptions={[3]}
        component="div"
        count={attachments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default PicInfoTable;
