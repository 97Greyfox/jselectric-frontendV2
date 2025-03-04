import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
// import "./style.scss";
import moment from "moment";
import { Poppins } from "next/font/google";
import Select from "react-select";
// import { TimePicker } from "react-rainbow-components";
import Swal from "sweetalert2";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import { Scheduler } from "@aldabil/react-scheduler";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { Calendar as CalendarIcon } from "lucide-react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const poppins = Poppins({
  weight: ["300", "500", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

function ScheduleModal({ schedules, userObj, refreshData, handleClose, open }) {
  const [drawer, setDrawer] = useState(false);
  const [userOpt, setUserOpt] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [title, setTitle] = useState("");
  const [user, setUser] = useState("");
  const [edit, setEdit] = useState(false);
  const [eventObj, setEventObj] = useState("");
  useEffect(() => {
    setUserOpt([userObj]);
    setUser(userObj);
  }, []);

  const handleAddSchedule = (e) => {
    e.preventDefault();
    const dataObj = {
      date: date,
      startTime: startTime,
      endTime: endTime,
      title: title.value,
    };
    axios
      .post(`${apiPath.prodPath}/api/users/addSchedule/${user.value}`, dataObj)
      .then((res) => {
        handleClose();
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
  const resetValues = () => {
    startDate("");
    endDate("");
    setUser("");
    setTitle("");
  };
  let alteredSch =
    schedules &&
    schedules.map((i) => {
      return {
        event_id: i._id,
        title: `${i.title} - From ${i.startTime} to ${i.endTime}`,
        start:
          i.date == undefined || i.date == ""
            ? new Date()
            : new Date(`${moment(i.date).format("YYYY/MM/DD")} ${i.startTime}`),
        end:
          i.date == undefined || i.date == ""
            ? new Date()
            : new Date(`${moment(i.date).format("YYYY/MM/DD")} ${i.endTime}`),

        color:
          i.title == "Scheduled"
            ? "#000000"
            : i.title == "Day Off"
            ? "#89CFF0"
            : i.title == "Sick"
            ? "#FF5733"
            : i.title == "Leave Of Absence"
            ? "#990f02"
            : i.title == "Bereavement Leave"
            ? "#BC544B"
            : "#0000FF",
      };
    });
  console.log(alteredSch);
  const handleDeleEvent = (id) => {
    axios
      .delete(
        `${apiPath.prodPath}/api/users/deleteSchedule/${userObj.value}&&${id}`
      )
      .then((res) => {
        if (res.data && res.data.error) {
          Swal.fire({
            icon: "error",
            text: "Error deleting the schedule",
          });
        } else {
          refreshData();
          handleClose();
        }
      });
  };
  const editSchedule = (flagValue) => {
    if (flagValue) {
      Swal.fire({
        icon: "error",
        text: "Uneable to update the schedule",
      });
    } else {
      Swal.fire({
        icon: "success",
        text: "Successfully updated the schedule",
      });
      refreshData();
      handleClose();
    }
    // const dataObj = {
    //   date:moment(event.)
    // }
    // axios.post()
  };
  const storeEvent = (event) => {
    console.log("this is event", event);
    setEventObj(event);
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
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex flex-row justify-center align-middle w-full h-full"
    >
      <div
        className="bg-white w-5/6 h-dvh p-10 border-none overflow-y-scroll"
        style={{ alignSelf: "center" }}
      >
        <div className="mb-10">
          <Button
            onClick={() => handleClose()}
            className="bg-transparent flex flex-row text-black hover:bg-transparent text-3xl p-0"
          >
            <ArrowBackIosIcon className="text-4xl text-gray-500" />
            <h1 className="text-3xl font-semibold">Open</h1>
          </Button>
        </div>
        <div className="schedule-wrap">
          <form
            onSubmit={handleAddSchedule}
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
                required={true}
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
                min={startTime}
                onChange={(e) => setEndTime(e.target.value)}
                className={`${poppins.className} p-2 cus-tool-form`}
                required={true}
              />
              {/* <TimePicker
                id="datePicker-1"
                value={endTime}
                onChange={(value) => setEndTime(value)}
                locale={"en-US"}
              /> */}
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
        <Scheduler
          view="month"
          events={alteredSch}
          onDelete={handleDeleEvent}
          onEventClick={storeEvent}
          customEditor={(props) => (
            <SchedulerEditor
              eventObj={eventObj}
              onConfirm={editSchedule}
              props={props}
              userId={user.value}
            />
          )}
        />
      </div>
    </Modal>
  );
}
function SchedulerEditor({ onConfirm, userId, eventObj, close, props }) {
  console.log("eventObj", eventObj);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [title, setTitle] = useState("");
  useEffect(() => {
    setDate(moment(eventObj.date).format("MM/DD/YYYY"));
    setStartTime(moment(eventObj.start).format("hh:mm"));
    setEndTime(moment(eventObj.end).format("hh:mm"));
    setTitle({ label: eventObj.title, value: eventObj.title });
  }, []);
  const handleDate = (value) => {
    setDate(value);
  };
  const titleOpt = [
    { label: "Scheduled", value: "Scheduled" },
    { label: "Day Off", value: "Day Off" },
    { label: "Sick", value: "Sick" },
    { label: "Vacation", value: "Vacation" },
    { label: "Leave Of Absence", value: "Leave Of Absence" },
    { label: "Bereavement Leave", value: "Bereavement Leave" },
  ];
  const handleEditSchedule = (event) => {
    event.preventDefault();
    const dataObj = {
      date: date,
      startTime: startTime,
      endTime: endTime,
      id: eventObj.event_id,
      title: title.value,
    };
    axios
      .post(`${apiPath.prodPath}/api/users/editSchedule/${userId}`, dataObj)
      .then((res) => {
        onConfirm(res.data.error);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex flex-col w-full p-5">
      <div className="flex w-full flex-row justify-end">
        <p className="close-modal" onClick={props.close}>
          &#10005;
        </p>
      </div>
      <form
        className="flex flex-row gap-5 flex-wrap w-full mt-9"
        onSubmit={handleEditSchedule}
      >
        <div className="flex flex-col w-1/4 gap-2">
          <label className="font-semibold">Title</label>
          <Select
            options={titleOpt}
            value={title}
            onChange={(v) => setTitle(v)}
            className="employee-names"
          />
        </div>
        <div className="flex flex-col w-2/4 gap-2">
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
            required={true}
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
            min={startTime}
            onChange={(e) => setEndTime(e.target.value)}
            className={`${poppins.className} p-2 cus-tool-form`}
            required={true}
          />
          {/* <TimePicker
            id="datePicker-1"
            value={endTime}
            onChange={(value) => setEndTime(value)}
            locale={"en-US"}
          /> */}
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
            value="Edit Schedule"
          />
        </div>
      </form>
    </div>
  );
}
export default ScheduleModal;
