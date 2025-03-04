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
import JobDrawer from "../drawers/jobDrawer";
import { Skeleton } from "@/components/ui/skeleton";
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
export default function JobTable({ allJobs, loading, refreshData }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [actionFlag, setActionFlag] = useState(false);
  const [jobId, setJobId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [infoModal, setInfoModal] = useState(false);
  const [item, setItem] = useState();
  useEffect(() => {
    setPage(0);
  }, [loading]);
  const openEmpModal = (data) => {
    setJobId(data.id);
    setEditData(data);
    setOpenModal(!openModal);
  };
  const openInfoDrawer = () => {
    if (infoModal) {
      setActionFlag(false);
    }
    setInfoModal(!infoModal);
  };
  const editJob = (data, id) => {
    axios
      .patch(`${apiPath.prodPath}/api/job/${id}`, data)
      .then((res) => {
        refreshData();
        setOpenModal(false);
      })
      .catch((err) => console.log(err));
  };
  const deleteJob = (id) => {
    setActionFlag(!actionFlag);
    Swal.fire({
      icon: "warning",
      title: "Are You Sure?",
      text: "Are you sure you want to delete the devices data? This action is irreversible.",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiPath.prodPath}/api/job/${id}`)
          .then((res) => {
            refreshData();
            openEmpModal();
            setActionFlag(false);
          })
          .catch((err) => console.log(err));
      }
    });
  };
  const sortedJobs = allJobs.sort((a, b) => a.jobId.localeCompare(b.jobId));
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
        <TableContainer sx={{ height: 500 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 150 }}>Actions</TableCell>
                <TableCell style={{ minWidth: 150 }}>Job Id</TableCell>
                <TableCell style={{ minWidth: 150 }}>Job Type</TableCell>
                <TableCell style={{ minWidth: 150 }}>Client</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedJobs.length == 0 ? (
                <TableRow>
                  <p className={poppins.className}>No Jobs Data Found</p>
                </TableRow>
              ) : (
                sortedJobs.map((i) => {
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
                            <DropdownMenuItem onClick={() => openEmpModal(i)}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteJob(i.id)}>
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                      <TableCell>{i.jobId}</TableCell>
                      <TableCell>{i.jobType}</TableCell>
                      <TableCell>{i.client}</TableCell>
                      {openModal && jobId == i.id ? (
                        <JobDrawer
                          edit={true}
                          open={openModal}
                          onClose={() => setOpenModal(false)}
                          id={jobId}
                          data={i}
                          editJob={editJob}
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
    </Paper>
  );
}
