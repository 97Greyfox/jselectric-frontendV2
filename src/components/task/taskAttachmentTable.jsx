import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Poppins } from "next/font/google";
import Image from "next/image";
import AttachmentModal from "../modals/attachmentModal";

const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
function TaskAttachmentTable({ attachments, openEdit, deleteTool }) {
  const [actionFlag, setActionFlag] = useState(false);
  const [attachmentId, setAttachmentId] = useState("");
  const [item, setItem] = useState();
  const [modalFlag, setModalFlag] = useState(false);
  const handleActions = (id, objData) => {
    setAttachmentId(id);
    setItem(objData);
    setActionFlag(!actionFlag);
  };
  const handleModal = (id) => {
    setAttachmentId(id);
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
              <TableCell style={{ minWidth: 150 }}>Attachments</TableCell>
              <TableCell style={{ minWidth: 150 }}>Date</TableCell>
              <TableCell style={{ minWidth: 150 }}>Note</TableCell>
              <TableCell style={{ minWidth: 150 }}>
                Attachment Category
              </TableCell>
              <TableCell style={{ minWidth: 150 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attachments && attachments.length == 0 ? (
              <TableRow>
                <p className={poppins.className}>No Attachments Found</p>
              </TableRow>
            ) : (
              attachments &&
              attachments.map((i) => {
                return (
                  <TableRow key={i.id}>
                    <TableCell>
                      {i.files.length ? (
                        <button onClick={() => handleModal(i.id)}>View</button>
                      ) : (
                        "no files"
                      )}
                    </TableCell>
                    <TableCell>{i.date}</TableCell>
                    <TableCell>{i.note}</TableCell>
                    <TableCell>{i.attachmentCategories}</TableCell>

                    <TableCell style={{ position: "relative" }}>
                      <Image
                        onClick={() => handleActions(i.id, i)}
                        src="/dots.png"
                        width={32}
                        height={32}
                      />
                      {actionFlag && i.id == attachmentId ? (
                        <div className="dropdown-div">
                          <p
                            onClick={() => openEdit(i)}
                            className={poppins.className}
                          >
                            Edit
                          </p>
                          <p
                            onClick={() => deleteTool(i)}
                            className={poppins.className}
                          >
                            Delete
                          </p>
                        </div>
                      ) : null}
                    </TableCell>
                    {modalFlag && attachmentId == i.id ? (
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
    </Paper>
  );
}

export default TaskAttachmentTable;
