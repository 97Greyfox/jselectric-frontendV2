import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { TimePicker } from "react-rainbow-components";

import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
import Swal from "sweetalert2";
import Image from "next/image";

const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function ManpowerDrawer({
  open,
  onClose,
  addManpower,
  editManpower,
  id,
  edit,
  data,
}) {
  const [job, setJob] = useState("");
  const [jobOpt, setJobOpt] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [foreman, setForeman] = useState(0);
  const [journeyman, setJourneyman] = useState(0);
  const [apprentice, setApprentice] = useState(0);
  const [construction, setConstruction] = useState(0);
  const [shiftStartTime, setShiftStartTime] = useState("");
  const [shiftEndTime, setShiftEndTime] = useState("");
  const [notes, setNotes] = useState("");
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    axios
      .get(`${apiPath.prodPath}/api/jobNumber/`)
      .then((res) => {
        const sortedJobNumbers = res.data.jobNumbers
          .map((i) => {
            return {
              label: i.jobNumber,
              value: i.jobNumber,
            };
          })
          .sort((a, b) => a.label.localeCompare(b.label));
        setJobOpt(sortedJobNumbers);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    if (edit) {
      setJob({ label: data.job, value: data.job });
      setStartDate(new Date(data.startDate));
      setEndDate(new Date(data.endDate));
      setForeman(data.requiredEmp.foreman.noOfEmp);
      setJourneyman(data.requiredEmp.journeyman.noOfEmp);
      setApprentice(data.requiredEmp.apprentice.noOfEmp);
      setConstruction(data.requiredEmp.construction.noOfEmp);
      setShiftStartTime(data.shiftStartTime);
      setShiftEndTime(data.shiftEndTime);
      setNotes(data.notes);
    }
  }, []);
  function days(from, to) {
    var d = new Date(from),
      a = [],
      y = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ];
    while (d < to) {
      a.push(y[d.getDay()]);
      d.setDate(d.getDate() + 1);
    }
    if (d.getDay() === to.getDay())
      // include last day
      a.push(y[d.getDay()]);
    return a;
  }
  const handleaddManpower = (e) => {
    e.preventDefault();
    if (startDate == "" || endDate == "") {
      Swal.fire({
        icon: "error",
        text: "Start and End Dates are required",
      });
    } else {
      const dataObj = {
        job: job.value,
        startDate,
        endDate,
        shiftStartTime,
        shiftEndTime,
        notes,
        requiredEmp: {
          foreman: foreman == null ? 0 : foreman,
          journeyman: journeyman == null ? 0 : journeyman,
          apprentice: apprentice == null ? 0 : apprentice,
          construction: construction == null ? 0 : construction,
        },
      };
      if (edit) {
        editManpower(dataObj, id);
      } else {
        addManpower(dataObj);
        dataEntryRefresh();
      }
    }
  };
  const getWeek = (startD) => {
    var nextWeek = new Date(startD.getTime() + 7 * 24 * 60 * 60 * 1000);
    return nextWeek;
  };
  const dataEntryRefresh = () => {
    setForeman(0);
    setJourneyman(0);
    setApprentice(0);
    setConstruction(0);
    setJob("");
    setStartDate("");
    setEndDate("");
    setNotes("");
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
          {edit ? "Edit" : "Request Employee"}
        </h1>
        {loader ? (
          <p className="text-lg">loading...</p>
        ) : (
          <form
            onSubmit={handleaddManpower}
            className="flex flex-row gap-5 flex-wrap w-full mt-9"
          >
            <div className="flex flex-col w-1/4 gap-2">
              <label className="font-semibold">Job</label>
              <Select
                options={jobOpt}
                onChange={(v) => setJob(v)}
                id="example-select-1"
                value={job}
                required={true}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <div className="flex flex-row w-full gap-4">
                <div className="flex flex-col">
                  <label className="font-semibold">Start Date</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(v) => setStartDate(v)}
                    minDate={new Date()}
                    required={true}
                    className="p-2 border-solid border-gray-300 border-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold">End Date</label>
                  <DatePicker
                    required={true}
                    selected={endDate}
                    onChange={(v) => setEndDate(v)}
                    // minDate={startDate}
                    // maxDate={startDate == "" ? new Date() : getWeek(startDate)}
                    className="p-2 border-solid border-gray-300 border-2"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full gap-2">
              <div className="flex flex-row w-full gap-2">
                <div className="innerDateWrap">
                  <TimePicker
                    id="time-picker-1"
                    value={shiftStartTime}
                    label="Start Time"
                    onChange={(value) => setShiftStartTime(value)}
                    className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
                  />
                </div>
                <div className="innerDateWrap">
                  <TimePicker
                    id="time-picker-2"
                    value={shiftEndTime}
                    label="End Time"
                    onChange={(value) => setShiftEndTime(value)}
                    className="rainbow-m-vertical_x-large rainbow-p-horizontal_medium rainbow-m_auto"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full gap-3">
              <div className="flex flex-row justify-between">
                <p className="text-lg">Foreman</p>
                <input
                  value={foreman}
                  className="p-2 border-2 border-gray-300 rounded-xl"
                  type="number"
                  onChange={(e) => setForeman(e.target.value)}
                />
              </div>
              <div className="flex flex-row justify-between">
                <p className="text-lg">Journeyman</p>
                <input
                  value={journeyman}
                  className="p-2 border-2 border-gray-300 rounded-xl"
                  type="number"
                  onChange={(e) => setJourneyman(e.target.value)}
                />
              </div>
              <div className="flex flex-row justify-between">
                <p className="text-lg">Apprentice</p>
                <input
                  value={apprentice}
                  className="p-2 border-2 border-gray-300 rounded-xl"
                  type="number"
                  onChange={(e) => setApprentice(e.target.value)}
                />
              </div>
              <div className="flex flex-row justify-between">
                <p className="text-lg">Construction</p>
                <input
                  value={construction}
                  className="p-2 border-2 border-gray-300 rounded-xl"
                  type="number"
                  onChange={(e) => setConstruction(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col w-1/4 gap-2">
              <label className="font-semibold">Notes</label>
              <input
                value={notes}
                className="p-2 border-2 border-gray-300 rounded-xl"
                type="text"
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <div className="flex flex-row justify-end w-full mt-10">
              <input
                className="p-3 bg-orange-400 text-white rounded-xl font-semibold"
                type="submit"
                value={edit ? "Edit Request" : "Add Request"}
              />
            </div>
          </form>
        )}
      </div>
    </Drawer>
  );
}

export default ManpowerDrawer;
