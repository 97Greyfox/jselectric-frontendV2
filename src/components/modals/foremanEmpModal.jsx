import { apiPath } from "@/utils/routes";
import {
  TableContainer,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import axios from "axios";
import { Poppins } from "next/font/google";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "../ui/button";
import TimeEntryModal from "./timeEntryModal";
import GroupedModal from "./groupedModal";
import Swal from "sweetalert2";
import useStore from "@/utils/store/store";

const poppins = Poppins({
  style: ["normal"],
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});
function ForemanEmpModal({ open, onClose, jobNo, manpowerId, assignedEmp }) {
  const laborFlag = useStore((state) => state.laborRefresh);
  const laborRefreshHandle = useStore((state) => state.laborRefreshHandle);
  const [allUserLabors, setAllUserLabors] = useState([]);
  const [loader, setLoader] = useState(false);
  const [jobName, setJobName] = useState("");
  const [timeEnteryModal, setTimeEnteryModal] = useState(false);
  const [id, setId] = useState("");
  const [groupedModal, setGroupedModal] = useState(false);
  useEffect(() => {
    setLoader(true);
    axios
      .get(`${apiPath.prodPath}/api/manpowerUsers/${jobNo}`)
      .then((res) => {
        const sortedUserJobs = res.data.allUserLabors.filter(
          (item) =>
            item.userManpower.job == jobNo &&
            item.userManpower.manpowerId == manpowerId
        );
        setAllUserLabors(sortedUserJobs);
        const mappedSortedUserJobs = sortedUserJobs.map((inner) => {
          return {
            label: `${inner.fullname} - ${
              inner.userManpower.foreman
                ? "Foreman"
                : inner.userManpower.journeyman
                ? "Journeyman"
                : inner.userManpower.apprentice
                ? "Apprentice"
                : "Construction"
            }`,
            value: `${inner.fullname} - ${
              inner.userManpower.foreman
                ? "Foreman"
                : inner.userManpower.journeyman
                ? "Journeyman"
                : inner.userManpower.apprentice
                ? "Apprentice"
                : "Construction"
            }`,
            type: inner.userManpower.foreman
              ? "foreman"
              : inner.userManpower.journeyman
              ? "journeyman"
              : inner.userManpower.apprentice
              ? "apprentice"
              : "construction",
            userId: inner.userId,
            id: inner.userManpower._id,
            fullname: inner.fullname,
            manpowerId: inner.userManpower.manpowerId,
          };
        });
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
    axios
      .get(`${apiPath.prodPath}/api/jobNumber/`)
      .then((res) => {
        const sortedJobNumbers = res.data.jobNumbers
          .map((i) => {
            return {
              jobNumber: i.jobNumber,
              jobName: i.jobName,
            };
          })
          .find((inner) => inner.jobNumber == jobNo);
        setJobName(sortedJobNumbers.jobName);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [open, laborFlag]);
  const loadUserLaborData = () => {
    setLoader(true);
    axios
      .get(`${apiPath.prodPath}/api/manpowerUsers/${jobNo}`)
      .then((res) => {
        const sortedUserJobs = res.data.allUserLabors.filter(
          (item) =>
            item.userManpower.job == jobNo &&
            item.userManpower.manpowerId == manpowerId
        );
        setAllUserLabors(sortedUserJobs);
        const mappedSortedUserJobs = sortedUserJobs.map((inner) => {
          return {
            label: `${inner.fullname} - ${
              inner.userManpower.foreman
                ? "Foreman"
                : inner.userManpower.journeyman
                ? "Journeyman"
                : inner.userManpower.apprentice
                ? "Apprentice"
                : "Construction"
            }`,
            value: `${inner.fullname} - ${
              inner.userManpower.foreman
                ? "Foreman"
                : inner.userManpower.journeyman
                ? "Journeyman"
                : inner.userManpower.apprentice
                ? "Apprentice"
                : "Construction"
            }`,
            type: inner.userManpower.foreman
              ? "foreman"
              : inner.userManpower.journeyman
              ? "journeyman"
              : inner.userManpower.apprentice
              ? "apprentice"
              : "construction",
            userId: inner.userId,
            id: inner.userManpower._id,
            fullname: inner.fullname,
            manpowerId: inner.userManpower.manpowerId,
          };
        });
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${apiPath.prodPath}/api/jobNumber/`)
      .then((res) => {
        const sortedJobNumbers = res.data.jobNumbers
          .map((i) => {
            return {
              jobNumber: i.jobNumber,
              jobName: i.jobName,
            };
          })
          .find((inner) => inner.jobNumber == jobNo);
        setJobName(sortedJobNumbers.jobName);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };
  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }
  const handleEnteriesModal = (item) => {
    setId(item.userId);
    setTimeEnteryModal(true);
  };
  const handleGroupModal = () => {
    setGroupedModal(true);
  };
  const addGroupedValues = (dataObj) => {
    axios
      .post(`${apiPath.prodPath}/api/manpowerUsers/setGroupValues/`, dataObj)
      .then((res) => {
        console.log(res);
        if (res.data.error) {
          Swal.fire({
            icon: "error",
            text: "Error Occurred While adding grouped values",
          });
        } else {
          loadUserLaborData();
          laborRefreshHandle(laborFlag);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex flex-row justify-center align-middle w-full h-full"
    >
      <div className="bg-white w-5/6 h-dvh p-10 border-none overflow-y-scroll">
        <div className="mb-10">
          <Button
            onClick={() => onClose()}
            className="bg-transparent flex flex-row text-black hover:bg-transparent text-3xl p-0"
          >
            <ArrowBackIosIcon className="text-4xl text-gray-500" />
            <h1 className="text-3xl font-semibold">
              Job: {jobNo} - {jobName}
            </h1>
          </Button>
        </div>
        <div className="flex flex-row gap-4 p-2">
          <button
            onClick={() => handleGroupModal()}
            className="bg-orange-400 text-white p-2 font-semibold rounded-xl"
          >
            Set Grouped Values
          </button>
        </div>
        <TableContainer sx={{ height: 700 }}>
          <Table stickyHeader style={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 200 }}>Employee</TableCell>
                <TableCell style={{ minWidth: 100 }}>Type</TableCell>
                <TableCell style={{ minWidth: 100 }}>Shift Start</TableCell>
                <TableCell style={{ minWidth: 100 }}>Shift End</TableCell>
                <TableCell style={{ minWidth: 100 }}>Time Shifts</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loader ? (
                <TableRow>loading....</TableRow>
              ) : allUserLabors.length ? (
                allUserLabors.map((i, ind) => {
                  return (
                    <TableRow key={`${i.userId}-${ind}`}>
                      <TableCell style={{ minWidth: 200 }}>
                        {i.fullname}
                      </TableCell>
                      <TableCell style={{ minWidth: 100 }}>
                        {i.userManpower.foreman
                          ? "Foreman"
                          : i.userManpower.journeyman
                          ? "Journeyman"
                          : i.userManpower.apprentice
                          ? "Apprentice"
                          : "Construction"}
                      </TableCell>
                      <TableCell style={{ minWidth: 100 }}>
                        {tConvert(i.userManpower.shiftStartTime)}
                      </TableCell>
                      <TableCell style={{ minWidth: 100 }}>
                        {tConvert(i.userManpower.shiftEndTime)}
                      </TableCell>
                      <TableCell style={{ minWidth: 100 }}>
                        {i.userManpower.timeEntries.length ? (
                          <button
                            onClick={() => handleEnteriesModal(i)}
                            className="bg-orange-400 text-white p-2 font-semibold rounded-xl"
                          >
                            View
                          </button>
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                      {timeEnteryModal && id == i.userId ? (
                        <TimeEntryModal
                          openFlag={timeEnteryModal}
                          closeModal={() => setTimeEnteryModal(false)}
                          timeEntries={i.userManpower.timeEntries}
                          empName={i.fullname}
                          userId={i.userId}
                          job={i.userManpower.job}
                          jobId={i.userManpower._id}
                          manpowerId={i.userManpower.manpowerId}
                          loadUserLaborData={loadUserLaborData}
                          assignedEmp={assignedEmp}
                          types={
                            i.userManpower.foreman
                              ? "foreman"
                              : i.userManpower.journeyman
                              ? "journeyman"
                              : i.userManpower.apprentice
                              ? "apprentice"
                              : "construction"
                          }
                        />
                      ) : null}
                      {groupedModal ? (
                        <GroupedModal
                          open={groupedModal}
                          onClose={() => setGroupedModal(false)}
                          userLabors={allUserLabors}
                          handleGroupedForm={addGroupedValues}
                          loadUserLaborData={loadUserLaborData}
                        />
                      ) : null}
                    </TableRow>
                  );
                })
              ) : null}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Modal>
  );
}

export default ForemanEmpModal;
