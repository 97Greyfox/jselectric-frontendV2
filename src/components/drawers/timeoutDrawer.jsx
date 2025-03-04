import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { FileUploader } from "react-drag-drop-files";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import moment from "moment";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";
import Image from "next/image";

const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
const fileTypes = ["JPG", "PNG", "GIF", "PDF"];
function TimeoutDrawer({
  open,
  onClose,
  id,
  editFlag,
  data,
  refreshData,
  user,
}) {
  const [dateAdded, setDateAdded] = useState(
    moment(new Date()).format("MM-DD-YYYY")
  );
  const [addedBy, setAddedBy] = useState("");
  const [enteredBy, setEnteredBy] = useState("");
  const [timeoutReasonOpt, setTimeoutReasonOpt] = useState("");
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [jamieFlag, setJamieFlag] = useState(false);
  const [managementFlag, setManagementFlag] = useState(false);
  const [status, setStatus] = useState("Pending");
  const [usersOpt, setUsersOpt] = useState([]);

  useEffect(() => {
    getUsers();
    axios
      .get(`${apiPath.prodPath}/api/timeoutReason/`)
      .then((res) => {
        const optionArr = res.data.timeoutReasons.map((i) => {
          return { label: i.name, value: i.name };
        });
        setTimeoutReasonOpt(optionArr);
      })
      .catch((error) => console.log(error));
    if (editFlag == false) {
      setAddedBy(user.fullname);
    }
    if (editFlag == false) {
      setStatus("Pending");
    }
    if (editFlag) {
      setAddedBy(data.user);
      setEnteredBy({ label: data.enteredBy, value: data.enteredBy });
      setJamieFlag(data.jamieFlag);
      setManagementFlag(data.managementFlag);
      setReason({ label: data.reason, value: data.reason });
      setDateAdded(data.dateAdded);
      setStartDate(new Date(data.startDate));
      setEndDate(new Date(data.endDate));
    }
  }, [open]);
  const getUsers = () => {
    axios
      .get(`${apiPath.prodPath}/api/users/`)
      .then((res) => {
        const sorted = res.data.allUsers
          .map((i) => {
            return { label: i.fullname, value: i.fullname };
          })
          .sort((a, b) => {
            return a.label.localeCompare(b.label);
          });
        setUsersOpt(sorted);
      })
      .catch((err) => console.log(err));
  };
  const handleaddJob = (e) => {
    e.preventDefault();
    const dataObj = {
      user: addedBy,
      reason: reason.value,
      dateAdded: moment(dateAdded).format("MM-DD-YYYY"),
      startDate: moment(startDate).format("MM-DD-YYYY"),
      endDate: moment(endDate).format("MM-DD-YYYY"),
      status,
      jamieFlag,
      enteredBy: enteredBy.value,
      managementFlag,
    };
    if (editFlag) {
      axios
        .patch(`${apiPath.prodPath}/api/timeout/${id}`, dataObj)
        .then((res) => {
          if (res.data.error) {
            Swal.fire({
              icon: "error",
              text: "Error Occurred While Editing Timeout",
            });
          } else {
            refreshData();
            dataEntryRefresh();
            onClose();
          }
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .post(`${apiPath.prodPath}/api/timeout/addTimeout`, dataObj)
        .then((res) => {
          if (res.data.error) {
            Swal.fire({
              icon: "error",
              text: "Error Occurred While adding Timeout",
            });
          } else {
            dataEntryRefresh();
            refreshData();
            onClose();
          }
        })
        .catch((error) => console.log(error));
    }
  };
  const dataEntryRefresh = () => {
    setAddedBy("");
    setReason("");
    setStartDate("");
    setEndDate("");
    setJamieFlag("");
    setManagementFlag("");
    setStatus("");
    setEnteredBy("");
  };
  const today = new Date();
  const daysAfter20Days = new Date(new Date().setDate(today.getDate() + 20));
  const handleSubmitManagement = (e) => {
    setManagementFlag(e.target.checked);
  };
  const handleSubmitJamie = (e) => {
    setJamieFlag(e.target.checked);
  };
  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={onClose}
      className="tools-drawer"
    >
      <div className={`${poppins.className} w-full flex flex-col p-10`}>
        <h1 className="flex flex-row gap-x-3 font-bold text-2xl">
          <span
            onClick={() => onClose()}
            className="flex flex-col justify-center align-middle"
          >
            <Image src={"/back.png"} width={12} height={21} alt="Back" />
          </span>{" "}
          {editFlag ? "Edit Time Off Request" : "Add Time Off Request"}
        </h1>
        <form
          onSubmit={handleaddJob}
          className="flex flex-row gap-5 flex-wrap w-full mt-9"
        >
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Date Added</label>
            <input
              className="p-2 cus-tool-form"
              type="text"
              disabled={true}
              value={dateAdded}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">User</label>
            <input
              className="p-2 cus-tool-form"
              type="text"
              disabled={true}
              value={addedBy}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Entered By</label>
            <Select
              options={usersOpt}
              value={enteredBy}
              onChange={(v) => setEnteredBy(v)}
              required={true}
              className="employee-names"
            />
          </div>

          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Start Date</label>
            <p>Must be 2 weeks or more in advance</p>
            <DatePicker
              selected={startDate}
              selectsStart={true}
              onChange={(date) => setStartDate(date)}
              minDate={daysAfter20Days}
              className="p-2 cus-tool-form"
              required={true}
            />
          </div>
          {startDate == "" ? null : (
            <div className="flex flex-col w-1/4 gap-2">
              <label className="font-semibold">End Date</label>
              <DatePicker
                selected={endDate}
                startDate={startDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd={true}
                minDate={startDate}
                className="p-2 cus-tool-form"
                required={true}
              />
            </div>
          )}
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Reason</label>
            <Select
              options={timeoutReasonOpt}
              value={reason}
              onChange={(v) => setReason(v)}
              required={true}
              className="employee-names"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Status</label>
            <input
              className="p-2 cus-tool-form"
              type="text"
              disabled={true}
              value={status}
            />
          </div>

          <div className="flex flex-col w-1/4 gap-2">
            <FormControlLabel
              control={
                <Checkbox
                  checked={jamieFlag}
                  onChange={handleSubmitJamie}
                  inputProps={{ "aria-label": "controlled" }}
                  value={"jamie"}
                />
              }
              label="Submit to Jamie"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <FormControlLabel
              control={
                <Checkbox
                  checked={managementFlag}
                  onChange={handleSubmitManagement}
                  inputProps={{ "aria-label": "controlled" }}
                  value={"management"}
                  label="Submit"
                />
              }
              label="Submit to Management"
            />
          </div>
          <div className="flex flex-row justify-end w-full mt-10">
            <input
              className="p-3 bg-orange-400 text-white font-semibold rounded-xl"
              type="submit"
              value={editFlag ? "Edit Time Off" : "Add Time Off"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default TimeoutDrawer;
