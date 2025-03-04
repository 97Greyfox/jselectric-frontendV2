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
import TrainingDrawer from "../drawers/trainingDrawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SlideModal from "../modals/slideModal";
import VideoModal from "../modals/videoModal";

const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
export default function TrainingTable({ data, refreshData, loading, user }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [oldFiles, setOldFiles] = useState("");
  const [item, setItem] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [trainId, setTrainId] = useState("");
  const [actionFlag, setActionFlag] = useState(false);
  const [slideModalFlag, setSlideModalFlag] = useState(false);
  const [videoModalFlag, setVideoModalFlag] = useState(false);
  const [modalData, setModalData] = useState("");
  useEffect(() => {
    setPage(0);
  }, [loading]);
  const handleActions = (id, objData) => {
    setTrainId(id);
    setItem(objData);
    setActionFlag(!actionFlag);
  };
  const handleEdit = (item) => {
    setItem(item);
    setTrainId(item.id);
    setDrawer(true);
    setActionFlag(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleDelete = (data) => {
    setActionFlag(false);
    setOldFiles(data.attachments);
    Swal.fire({
      icon: "error",
      text: "Are you sure you want to delete the Training data",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      showConfirmButton: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const dataObj = {
          oldFiles: data.attachments,
          trainingType: data.trainingType,
        };
        axios({
          method: "put",
          url: `${apiPath.prodPath}/api/training/deleteTraining/${data.id}`,
          data: dataObj,
          withCredentials: false,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((res) => {
            refreshData();
          })
          .catch((err) => console.log(err));
      }
    });
  };
  const handleCloseDrawer = () => {
    setDrawer(false);
  };
  const handleSlideModal = (item) => {
    setModalData(item);
    setSlideModalFlag(true);
    setTrainId(item.id);
  };
  const handleVideoModal = (item) => {
    setModalData(item);
    setVideoModalFlag(true);
    setTrainId(item.id);
  };
  return (
    <Paper
      className={poppins.className}
      sx={{ width: "100%", overflow: "hidden", bgcolor: "transparent" }}
    >
      {loading ? (
        <h1 className={`${poppins.className} loading-h`}>Loading...</h1>
      ) : (
        <TableContainer sx={{ height: 500 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 150 }}>Actions</TableCell>
                <TableCell style={{ minWidth: 150 }}>Training Id</TableCell>
                <TableCell style={{ minWidth: 150 }}>Training Type</TableCell>
                <TableCell style={{ minWidth: 150 }}>
                  Training Category
                </TableCell>
                <TableCell style={{ minWidth: 150 }}>Title</TableCell>
                <TableCell style={{ minWidth: 150 }}>Added Date</TableCell>
                <TableCell style={{ minWidth: 150 }}>Added By</TableCell>
                <TableCell style={{ minWidth: 150 }}>Description</TableCell>
                <TableCell style={{ minWidth: 150 }}>Attachments</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length == 0 ? (
                <TableRow>
                  <p className={poppins.className}>No Training Data found</p>
                </TableRow>
              ) : (
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
                          {i.trainingId}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.trainingType}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.trainingCategory}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.title}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.dateAdded}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.addedBy}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.description}
                        </TableCell>
                        <TableCell style={{ minWidth: 150 }}>
                          {i.trainingType == "Picture" ? (
                            <button
                              className="bg-orange-400 text-white p-2 rounded-xl"
                              onClick={() => handleSlideModal(i)}
                            >
                              View Slides
                            </button>
                          ) : (
                            <button
                              className="bg-orange-400 text-white p-2 rounded-xl"
                              onClick={() => handleVideoModal(i)}
                            >
                              View Videos
                            </button>
                          )}
                        </TableCell>
                        {slideModalFlag && trainId == i.id ? (
                          <SlideModal
                            modalData={modalData}
                            open={slideModalFlag}
                            onClose={() => setSlideModalFlag(false)}
                          />
                        ) : null}
                        {videoModalFlag && trainId == i.id ? (
                          <VideoModal
                            modalData={modalData}
                            open={videoModalFlag}
                            onClose={() => setVideoModalFlag(false)}
                          />
                        ) : null}
                        {drawer && trainId == i.id ? (
                          <TrainingDrawer
                            refreshData={refreshData}
                            open={drawer}
                            data={item}
                            onClose={handleCloseDrawer}
                            editFlag={true}
                            id={item.id}
                            user={user}
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
