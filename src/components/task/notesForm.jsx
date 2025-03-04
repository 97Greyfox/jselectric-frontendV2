import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
import moment from "moment";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
import "react-datepicker/dist/react-datepicker.css";
import useStore from "@/utils/store/store";

function NoteTaskForm({
  handleForm,
  editFlag,
  currentItem,
  editNoteTaskData,
  task,
}) {
  const currentUser = useStore((state) => state.user);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dueDate, setDueDate] = useState("");
  const [noteCategoryOpt, setNoteCategoryOpt] = useState([]);
  const [noteCategory, setNoteCategory] = useState("");
  const [noteStatusOpt, setNoteStatusOpt] = useState([]);
  const [noteStatus, setNoteStatus] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState([]);
  const [assignedToOpt, setAssignedToOpt] = useState([]);
  const [user, setUser] = useState(
    currentUser && currentUser ? currentUser.fullname : ""
  );
  useEffect(() => {
    if (editFlag == false) {
      dataEntryRefresh();
    }
    axios
      .get(`${apiPath.prodPath}/api/notesCategory`)
      .then((res) => {
        setNoteCategoryOpt(
          res.data.notesCategory.map((i) => {
            return { label: i.name, value: i.name };
          })
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/notesStatus`)
      .then((res) => {
        setNoteStatusOpt(
          res.data.notesStatus.map((i) => {
            return { label: i.name, value: i.name };
          })
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/users`)
      .then((res) => {
        setAssignedToOpt(
          res.data.allUsers.map((i) => {
            return { label: i.fullname, value: i.fullname, email: i.email };
          })
        );
      })
      .catch((err) => console.log(err));
    if (editFlag) {
      setCurrentDate(new Date(currentItem.currentDate));
      setDueDate(new Date(currentItem.dueDate));
      setUser(currentItem.user);
      setDescription(currentItem.description);
      setNoteCategory({
        label: currentItem.noteCategory,
        value: currentItem.noteCategory,
      });
      setNoteStatus({
        label: currentItem.noteStatus,
        value: currentItem.noteStatus,
      });
      // setAssignedTo(
      //   currentItem.assignedTo.map((i) => {
      //     return { label: i.fullname, value: i.fullname };
      //   })
      // );
    }
  }, [editFlag]);
  const handleFormInner = (e) => {
    e.preventDefault();
    const dataObj = {
      currentDate,
      user,
      noteCategory: noteCategory.value,
      dueDate,
      description,
      noteStatus: noteStatus.value,
      updated: editFlag ? true : false,
      // assignedTo: assignedTo.map((i) => {
      //   return { fullname: i.label };
      // }),
    };
    if (editFlag) {
      var assignedToUsers = [];
      assignedToOpt.forEach((item) => {
        task.assignedTo.forEach((el) => {
          if (el.fullname == item.label) {
            assignedToUsers = [
              ...assignedToUsers,
              { fullname: item.label, email: item.email },
            ];
          }
        });
      });
      editNoteTaskData(dataObj, currentItem.id, assignedToUsers);
      dataEntryRefresh();
    } else {
      var assignedToUsers = [];
      assignedToOpt.forEach((item) => {
        task.assignedTo.forEach((el) => {
          if (el.fullname == item.label) {
            assignedToUsers = [
              ...assignedToUsers,
              { fullname: item.label, email: item.email },
            ];
          }
        });
      });
      handleForm(dataObj, assignedToUsers);
      dataEntryRefresh();
    }
  };
  const dataEntryRefresh = () => {
    setNoteCategory("");
    setDueDate("");
    setDescription("");
    setNoteStatus("");
    // setAssignedTo([]);
  };
  return (
    <form
      className="flex flex-row flex-wrap gap-4 pt-2 pb-2"
      onSubmit={handleFormInner}
    >
      <div className="flex flex-col gap-2 w-1/5">
        <label className="font-semibold">Current Date</label>
        <DatePicker
          className="p-2 cus-tool-form"
          disabled
          selected={currentDate}
        />
      </div>
      <div className="flex flex-col gap-2 w-1/5">
        <label className="font-semibold">User</label>
        <input
          type="text"
          className="p-2 cus-tool-form"
          value={user}
          disabled
        />
      </div>
      <div className="flex flex-col gap-2 w-1/5">
        <label className="font-semibold">Note Category</label>
        <Select
          className={`${poppins.className} select-cus employee-names`}
          options={noteCategoryOpt}
          value={noteCategory}
          onChange={(value) => setNoteCategory(value)}
        />
      </div>
      <div className="flex flex-col gap-2 w-1/5">
        <label className="font-semibold">Due Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              onClick={() => console.log("clicked")}
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !dueDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dueDate ? (
                moment(dueDate).format("MM-DD-YYYY")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 cus-calendar">
            <Calendar
              mode="single"
              selected={dueDate}
              onSelect={(date) => setDueDate(date)}
            />
          </PopoverContent>
        </Popover>
        {dueDate !== "" ? (
          <p onClick={() => setDueDate("")} className="clear-value">
            Clear
          </p>
        ) : null}
      </div>
      <div className="flex flex-col gap-2 w-1/5">
        <label className="font-semibold">Description</label>
        <input
          type="text"
          className="p-2 cus-tool-form"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 w-1/5">
        <label className="font-semibold">Note Status</label>
        <Select
          className={`${poppins.className} select-cus employee-names`}
          options={noteStatusOpt}
          value={noteStatus}
          onChange={(value) => setNoteStatus(value)}
        />
      </div>
      {/* <div className="flex flex-col gap-2 w-1/5">
        <label className="font-semibold">Assigned To</label>
        <Select
          isMulti
          value={assignedTo}
          className={poppins.className}
          options={assignedToOpt}
          onChange={(v) => setAssignedTo(v)}
        />
      </div> */}
      <div className="flex flex-col justify-end w-1/5">
        <input
          className={`${poppins.className} self-start p-2 bg-orange-400 text-white font-semibold rounded-xl`}
          type="submit"
          value={editFlag ? "Edit Note" : "Add Note"}
        />
      </div>
    </form>
  );
}

export default NoteTaskForm;
