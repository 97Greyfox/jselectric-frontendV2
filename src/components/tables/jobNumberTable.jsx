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
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Swal from "sweetalert2";
import JobNumberDrawer from "../drawers/jobNumberDrawer";
import JobNumberInfo from "../modals/jobNumberInfoModal";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
export default function JobNumberTable({
  allJobNumbers,
  loading,
  refreshData,
  handlePagination,
  totalCount,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [actionFlag, setActionFlag] = useState(false);
  const [jobId, setJobId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [infoModal, setInfoModal] = useState(false);
  const [item, setItem] = useState();
  useEffect(() => {
    setPage(0);
  }, [loading]);
  const handleActions = (id, objData) => {
    setJobId(id);
    setItem(objData);
    setActionFlag(!actionFlag);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    handlePagination(rowsPerPage, newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const openEmpModal = (data) => {
    setJobId(data.id);
    setEditData(data);
    setOpenModal(!openModal);
  };
  const openInfoDrawer = (id) => {
    setJobId(id);
    setInfoModal(!infoModal);
  };
  const editJob = (data, id) => {
    axios
      .patch(`${apiPath.prodPath}/api/jobNumber/${id}`, data)
      .then((res) => {
        refreshData();
        openEmpModal();
        setActionFlag(false);
      })
      .catch((err) => console.log(err));
    const sheetData = {
      newEntry: data,
      oldEntry: item,
    };
    axios
      .put(`${apiPath.prodPath}/api/sheetsData/editSingleJob/`, sheetData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  const deleteJobNumber = (id) => {
    setActionFlag(false);
    Swal.fire({
      icon: "warning",
      title: "Are You Sure?",
      text: "Are you sure you want to delete the Job Number data? This action is irreversible.",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiPath.prodPath}/api/jobNumber/${id}`)
          .then((res) => {
            refreshData();
            openEmpModal();
            setActionFlag(false);
          })
          .catch((err) => console.log(err));
        axios
          .delete(`${apiPath.prodPath}/api/sheetsData/${item.jobNumber}`)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      }
    });
  };
  function numberWithCommas(x) {
    const formatCus = (Math.round(x * 100) / 100).toFixed(2);
    return formatCus.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
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
        <>
          <TableContainer sx={{ height: 500 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ minWidth: 150 }}>Actions</TableCell>
                  <TableCell style={{ minWidth: 150 }}>Job Number</TableCell>
                  <TableCell style={{ minWidth: 150 }}>Job Name</TableCell>
                  <TableCell style={{ minWidth: 150 }}>Initials</TableCell>
                  <TableCell style={{ minWidth: 150 }}>
                    General Contractor
                  </TableCell>
                  <TableCell style={{ minWidth: 150 }}>Contract / TM</TableCell>
                  <TableCell style={{ minWidth: 150 }}>Job PM</TableCell>
                  <TableCell style={{ minWidth: 150 }}>Date Created</TableCell>
                  <TableCell style={{ minWidth: 150 }}>Date Billed</TableCell>
                  <TableCell style={{ minWidth: 150 }}>PO</TableCell>
                  <TableCell style={{ minWidth: 150 }}>Amount</TableCell>
                  <TableCell style={{ minWidth: 150 }}>CO</TableCell>
                  <TableCell style={{ minWidth: 150 }}>
                    Percentage Billed
                  </TableCell>
                  <TableCell style={{ minWidth: 150 }}>Notes</TableCell>
                  <TableCell style={{ minWidth: 150 }}>
                    Project Checklist
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allJobNumbers.length == 0 ? (
                  <TableRow>
                    <p className={poppins.className}>No Jobs Data Found</p>
                  </TableRow>
                ) : (
                  allJobNumbers
                    .sort((a, b) => a.jobNumber.localeCompare(b.jobNumber))
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
                                  onClick={() => openInfoDrawer(i.id)}
                                >
                                  Open
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => openEmpModal(i)}
                                >
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => deleteJobNumber(i.id)}
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                          <TableCell style={{ minWidth: 150 }}>
                            {i.jobNumber}
                          </TableCell>
                          <TableCell style={{ minWidth: 150 }}>
                            {i.jobName}
                          </TableCell>
                          <TableCell style={{ minWidth: 150 }}>
                            {i.initials}
                          </TableCell>
                          <TableCell style={{ minWidth: 150 }}>
                            {i.generalContractor}
                          </TableCell>
                          <TableCell style={{ minWidth: 150 }}>
                            {i.contractTM}
                          </TableCell>
                          <TableCell style={{ minWidth: 150 }}>
                            {i.jobPM}
                          </TableCell>
                          <TableCell style={{ minWidth: 150 }}>
                            {i.dateCreated}
                          </TableCell>
                          <TableCell style={{ minWidth: 150 }}>
                            {i.dateBilled}
                          </TableCell>
                          <TableCell style={{ minWidth: 150 }}>
                            {i.PO}
                          </TableCell>
                          <TableCell style={{ minWidth: 150 }}>
                            {i.amount}
                          </TableCell>
                          <TableCell style={{ minWidth: 150 }}>
                            {i.CO}
                          </TableCell>
                          <TableCell style={{ minWidth: 150 }}>
                            {i.percentageBilled}
                          </TableCell>
                          <TableCell style={{ minWidth: 150 }}>
                            {i.notes}
                          </TableCell>
                          <TableCell style={{ minWidth: 150 }}>
                            {i.projectChecklist}
                          </TableCell>
                          {openModal && editData && jobId == i.id ? (
                            <JobNumberDrawer
                              edit={true}
                              open={openModal}
                              onClose={() => setOpenModal(false)}
                              id={jobId}
                              data={editData}
                              editJob={editJob}
                            />
                          ) : null}
                          {infoModal && jobId == i.id ? (
                            <JobNumberInfo
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
          <TablePagination
            rowsPerPageOptions={[20]}
            component="div"
            rowsPerPage={rowsPerPage}
            count={totalCount}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Paper>
  );
}
