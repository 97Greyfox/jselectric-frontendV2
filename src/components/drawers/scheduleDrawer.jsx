import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
import moment from "moment";
import Swal from "sweetalert2";
import Image from "next/image";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});

function ScheduleDrawer({ open, userObj, onClose, edit, refreshData }) {
  const [userOpt, setUserOpt] = useState([]);
  const [user, setUser] = useState();
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [title, setTitle] = useState("");
  const [endTime, setEndTime] = useState("");
  useEffect(() => {
    setUserOpt([userObj]);
    setUser(userObj);
  }, [open]);
  const handleDate = (value) => {
    setDate(value);
  };
  const handleAddDevice = (e) => {
    e.preventDefault();
    const dataObj = {
      date,
      startTime: startTime,
      endTime: endTime,
      title: title.value,
    };
    axios
      .post(`${apiPath.prodPath}/api/users/addSchedule/${user.value}`, dataObj)
      .then((res) => {
        onClose();
        if (res.data && res.data.error) {
          Swal.fire({
            icon: "error",
            text: "Error occured while adding schedule",
          });
        } else {
          Swal.fire({
            icon: "success",
            text: "Successfully added Schedule",
          });
        }
        refreshData();
        resetValues();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClose = () => {
    resetValues();
    onClose();
  };
  const resetValues = () => {
    setDate("");
    setStartTime("");
    setEndTime("");
    setUser("");
    setTitle("");
  };

  const titleOpt = [
    { label: "Scheduled", value: "Scheduled" },
    { label: "Day Off", value: "Day Off" },
    { label: "Sick", value: "Sick" },
    { label: "Vacation", value: "Vacation" },
    { label: "Leave Of Absence", value: "Leave Of Absence" },
    { label: "Bereavement Leave", value: "Bereavement Leave" },
  ];
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
          {edit ? "Edit Schedule" : "Add Schedule"}
        </h1>

        <form
          onSubmit={handleAddDevice}
          className="flex flex-row gap-5 flex-wrap w-full mt-9"
        >
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Employee</label>
            <Select
              options={userOpt}
              value={user}
              onChange={(v) => setUser(v)}
              isDisabled={true}
              className="employee-names"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Title</label>
            <Select
              options={titleOpt}
              value={title}
              onChange={(v) => setTitle(v)}
              className="employee-names"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  onClick={() => console.log("clicked")}
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? (
                    moment(date).format("MM-DD-YYYY")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 cus-calendar">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => setDate(date)}
                />
              </PopoverContent>
            </Popover>
            {date !== "" ? (
              <p
                onClick={() => {
                  setDate("");
                  setDay("");
                }}
                className="clear-value"
              >
                Clear
              </p>
            ) : null}
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className={`${poppins.className} p-2 cus-tool-form`}
            />
            {startTime !== "" ? (
              <p
                onClick={() => {
                  setStartTime("");
                }}
                className="clear-value"
              >
                Clear
              </p>
            ) : null}
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className={`${poppins.className} p-2 cus-tool-form`}
            />
            {endTime !== "" ? (
              <p
                onClick={() => {
                  setEndTime("");
                }}
                className="clear-value"
              >
                Clear
              </p>
            ) : null}
          </div>
          <div className="flex flex-row justify-end w-full mt-10">
            <input
              className="p-3 bg-orange-400 text-white font-semibold rounded-xl"
              type="submit"
              value={edit ? "Edit Schedule" : "Add Schedule"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default ScheduleDrawer;
