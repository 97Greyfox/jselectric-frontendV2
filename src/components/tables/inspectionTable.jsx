import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Poppins } from "next/font/google";
import { Skeleton } from "@/components/ui/skeleton";

import React, { useState, useEffect, use } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Image from "next/image";
import Swal from "sweetalert2";
import moment from "moment";
import VehicleInspectionInfo from "../modals/inspectionInfoModal";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export default function VehicleInspectionTable({
  allVehicleInspection,
  loading,
  refreshData,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [actionFlag, setActionFlag] = useState(false);
  const [vehicleId, setVehicleId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [infoModal, setInfoModal] = useState(false);
  const [item, setItem] = useState();
  useEffect(() => {
    setPage(0);
  }, [loading]);
  const handleActions = (id, objData) => {
    setVehicleId(id);
    setItem(objData);
    setActionFlag(!actionFlag);
  };
  const openEmpModal = (data) => {
    setEditData(data);
    setOpenModal(!openModal);
  };

  const editVehicle = (data, id) => {
    axios
      .patch(`${apiPath.prodPath}/api/vehicles/${id}`, data)
      .then((res) => {
        refreshData();
        openEmpModal();
        setActionFlag(false);
      })
      .catch((err) => console.log(err));
  };
  const deleteVehicle = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are You Sure?",
      text: "Are you sure you want to delete the vehicles data? This action is irreversible.",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiPath.prodPath}/api/vehicles/${id}`)
          .then((res) => {
            refreshData();
            openEmpModal();
            setActionFlag(false);
          })
          .catch((err) => console.log(err));
      }
    });
  };
  const sortedVehicles = allVehicleInspection;
  const openInfoDrawer = (i) => {
    setInfoModal(!infoModal);
    setActionFlag(false);
    setVehicleId(i.id);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper
      className={poppins.className}
      sx={{ width: "100%", overflow: "hidden" }}
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
                <TableCell style={{ minWidth: "120px" }}>Date</TableCell>
                <TableCell style={{ minWidth: "250px" }}>Employee</TableCell>
                <TableCell>Vehicle</TableCell>
                <TableCell>Mileage</TableCell>
                <TableCell style={{ minWidth: "120px" }}>Head Lights</TableCell>
                <TableCell style={{ minWidth: "120px" }}>Tail Lights</TableCell>
                <TableCell style={{ minWidth: "120px" }}>
                  Turn Signals
                </TableCell>
                <TableCell style={{ minWidth: "120px" }}>
                  Brake Lights
                </TableCell>
                <TableCell>Reflectors</TableCell>
                <TableCell style={{ minWidth: "120px" }}>Tires Rim</TableCell>
                <TableCell>Battery</TableCell>
                <TableCell>Radiator</TableCell>
                <TableCell style={{ minWidth: "150px" }}>
                  Exhaust System
                </TableCell>
                <TableCell>Suspension</TableCell>
                <TableCell style={{ minWidth: "120px" }}>Fuel System</TableCell>
                <TableCell>Leaks</TableCell>
                <TableCell style={{ minWidth: "120px" }}>Water Level</TableCell>
                <TableCell>Tranmission</TableCell>
                <TableCell>Gauges</TableCell>
                <TableCell>Horn</TableCell>
                <TableCell style={{ minWidth: "120px" }}>Wind Shield</TableCell>
                <TableCell style={{ minWidth: "170px" }}>
                  Windshield Wipers
                </TableCell>
                <TableCell>Speedometer</TableCell>
                <TableCell>Steering</TableCell>
                <TableCell style={{ minWidth: "150px" }}>
                  Brake System
                </TableCell>
                <TableCell style={{ minWidth: "120px" }}>Seat Belts</TableCell>
                <TableCell>Seats</TableCell>
                <TableCell>Heater</TableCell>
                <TableCell>Mirrors</TableCell>
                <TableCell style={{ minWidth: "170px" }}>
                  Safety Equipment
                </TableCell>
                <TableCell style={{ minWidth: "120px" }}>
                  Accident Kit
                </TableCell>
                <TableCell>Other</TableCell>
                <TableCell>Damage</TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell style={{ minWidth: "120px" }}>Signed By</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedVehicles.length == 0 ? (
                <TableRow>
                  <p className={poppins.className}>No Vehicles Data Found</p>
                </TableRow>
              ) : (
                sortedVehicles
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
                              <DropdownMenuItem
                                onClick={() => openInfoDrawer(i)}
                              >
                                Open
                              </DropdownMenuItem>
                              {/* <DropdownMenuItem onClick={() => openEmpModal(i)}>
                              Edit
                            </DropdownMenuItem> */}
                              {/* <DropdownMenuItem
                              onClick={() => deleteVehicle(i.id)}
                            >
                              Delete
                            </DropdownMenuItem> */}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                        <TableCell>
                          {moment(i.date).format("MM-DD-YYYY")}
                        </TableCell>
                        <TableCell>{i.employee}</TableCell>
                        <TableCell>{i.vehicle}</TableCell>
                        <TableCell>{i.mileage}</TableCell>
                        <TableCell>{i.headLights ? "true" : "false"}</TableCell>
                        <TableCell>{i.tailLights ? "true" : "false"}</TableCell>
                        <TableCell>
                          {i.turnSignals ? "true" : "false"}
                        </TableCell>
                        <TableCell>
                          {i.brakeLights ? "true" : "false"}
                        </TableCell>
                        <TableCell>{i.reflectors ? "true" : "false"}</TableCell>
                        <TableCell>{i.tiresRims ? "true" : "false"}</TableCell>
                        <TableCell>{i.battery ? "true" : "false"}</TableCell>
                        <TableCell>{i.radiator ? "true" : "false"}</TableCell>
                        <TableCell>
                          {i.exhaustSystem ? "true" : "false"}
                        </TableCell>
                        <TableCell>{i.suspension ? "true" : "false"}</TableCell>
                        <TableCell>{i.fuelSystem ? "true" : "false"}</TableCell>
                        <TableCell>{i.leaks ? "true" : "false"}</TableCell>
                        <TableCell>{i.waterLevel ? "true" : "false"}</TableCell>
                        <TableCell>
                          {i.tranmission ? "true" : "false"}
                        </TableCell>
                        <TableCell>{i.gauges ? "true" : "false"}</TableCell>
                        <TableCell>{i.horn ? "true" : "false"}</TableCell>
                        <TableCell>{i.windShield ? "true" : "false"}</TableCell>
                        <TableCell>
                          {i.windshieldWipers ? "true" : "false"}
                        </TableCell>
                        <TableCell>
                          {i.speedometer ? "true" : "false"}
                        </TableCell>
                        <TableCell>{i.steering ? "true" : "false"}</TableCell>
                        <TableCell>
                          {i.brakeSystem ? "true" : "false"}
                        </TableCell>
                        <TableCell>{i.seatBelts ? "true" : "false"}</TableCell>
                        <TableCell>{i.seats ? "true" : "false"}</TableCell>
                        <TableCell>{i.heater ? "true" : "false"}</TableCell>
                        <TableCell>{i.mirrors ? "true" : "false"}</TableCell>
                        <TableCell>
                          {i.safetyEquipment ? "true" : "false"}
                        </TableCell>
                        <TableCell>
                          {i.accidentKit ? "true" : "false"}
                        </TableCell>
                        <TableCell>{i.other ? "true" : "false"}</TableCell>
                        <TableCell>{i.damage}</TableCell>
                        <TableCell>{i.remarks}</TableCell>
                        <TableCell>{i.signedBy}</TableCell>
                        {infoModal && vehicleId == i.id ? (
                          <VehicleInspectionInfo
                            open={infoModal}
                            onClose={() => setInfoModal(false)}
                            item={i}
                          />
                        ) : null}
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
            {/* {openModal && editData ? (
              <VehicleDrawer
                edit={true}
                open={openModal}
                onClose={() => openEmpModal()}
                id={vehicleId}
                data={editData}
                editVehicle={editVehicle}
              />
            ) : null} */}
          </Table>
        </TableContainer>
      )}
      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={sortedVehicles.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
