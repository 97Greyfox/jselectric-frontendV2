import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
import moment from "moment";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
import "react-datepicker/dist/react-datepicker.css";
import useStore from "@/utils/store/store";
function SubTaskForm({
  handleForm,
  editFlag,
  currentItem,
  editSubTaskData,
  task,
}) {
  const currentUser = useStore((state) => state.user);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dueDate, setDueDate] = useState("");
  const [taskCategoryOpt, setTaskCategoryOpt] = useState([]);
  const [taskCategory, setTaskCategory] = useState("");
  const [taskStatusOpt, setTaskStatusOpt] = useState([]);
  const [taskStatus, setTaskStatus] = useState("");
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
      .get(`${apiPath.prodPath}/api/taskCategory`)
      .then((res) => {
        const resdata = res.data.taskCategory.map((i) => {
          return { label: i.name, value: i.name };
        });
        const sortedTasks = resdata.sort((a, b) =>
          a.label.localeCompare(b.label)
        );
        setTaskCategoryOpt(sortedTasks);
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/taskStatus`)
      .then((res) => {
        const resdata = res.data.taskStatus.map((i) => {
          return { label: i.name, value: i.name };
        });
        const sortedTasks = resdata.sort((a, b) =>
          a.label.localeCompare(b.label)
        );
        setTaskStatusOpt(sortedTasks);
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/users`)
      .then((res) => {
        const resdata = res.data.allUsers.map((i) => {
          return { label: i.fullname, value: i.fullname, email: i.email };
        });
        const sortedTasks = resdata.sort((a, b) =>
          a.label.localeCompare(b.label)
        );
        setAssignedToOpt(sortedTasks);
      })
      .catch((err) => console.log(err));
    if (editFlag) {
      setCurrentDate(new Date(currentItem.currentDate));
      setDueDate(new Date(currentItem.dueDate));
      setUser(currentItem.user);
      setDescription(currentItem.description);
      setTaskCategory({
        label: currentItem.taskCategory,
        value: currentItem.taskCategory,
      });
      setTaskStatus({
        label: currentItem.taskStatus,
        value: currentItem.taskStatus,
      });
      setAssignedTo(
        currentItem.assignedTo.map((i) => {
          return { label: i.fullname, value: i.fullname };
        })
      );
    }
  }, [editFlag]);
  const handleFormInner = (e) => {
    e.preventDefault();
    const dataObj = {
      currentDate,
      user,
      taskCategory: taskCategory.value,
      dueDate,
      description,
      taskStatus: taskStatus.value,
      assignedTo: assignedTo.map((i) => {
        return { fullname: i.label };
      }),
      updated: editFlag
        ? taskStatus.value == "Completed"
          ? false
          : true
        : false,
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
      editSubTaskData(dataObj, currentItem.id, assignedToUsers);
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
    setTaskCategory("");
    setDueDate("");
    setDescription("");
    setTaskStatus("");
    setAssignedTo([]);
  };
  return (
    <form
      className="flex flex-row flex-wrap gap-4 pt-2 pb-2"
      onSubmit={handleFormInner}
    >
      <div className="flex flex-col gap-2 w-1/5">
        <label className="font-semibold">Current Date</label>
        <DatePicker
          disabled
          selected={currentDate}
          className="p-2 cus-tool-form"
        />
      </div>
      <div className="flex flex-col gap-2 w-1/5">
        <label className="font-semibold">User</label>
        <input
          className="p-2 cus-tool-form"
          type="text"
          value={user}
          disabled
        />
      </div>
      <div className="flex flex-col gap-2 w-1/5">
        <label className="font-semibold">Task Category</label>
        <Select
          className={`${poppins.className} select-cus1 employee-names`}
          options={taskCategoryOpt}
          value={taskCategory}
          onChange={(value) => setTaskCategory(value)}
          isDisabled={
            editFlag
              ? currentItem.taskStatus == "Completed"
                ? true
                : false
              : false
          }
        />
      </div>
      <div className="flex flex-col gap-2 w-1/5">
        <label className="font-semibold">Due Date</label>
        <DatePicker
          id="date-cus"
          selected={dueDate}
          className="p-2 cus-tool-form"
          onChange={(value) => setDueDate(value)}
          disabled={
            editFlag
              ? currentItem.taskStatus == "Completed"
                ? true
                : false
              : false
          }
        />

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
          disabled={
            editFlag
              ? currentItem.taskStatus == "Completed"
                ? true
                : false
              : false
          }
        />
      </div>
      <div className="flex flex-col gap-2 w-1/5">
        <label className="font-semibold">Task Status</label>
        <Select
          className={`${poppins.className} select-cus employee-names`}
          options={taskStatusOpt}
          value={taskStatus}
          onChange={(value) => setTaskStatus(value)}
          isDisabled={
            editFlag
              ? currentItem.taskStatus == "Completed"
                ? true
                : false
              : false
          }
        />
      </div>
      <div className="flex flex-col gap-2 w-1/5">
        <label className="font-semibold">Assigned To</label>
        <Select
          isMulti
          value={assignedTo}
          className={`${poppins.className} select-cus employee-names`}
          options={assignedToOpt}
          onChange={(v) => setAssignedTo(v)}
          isDisabled={
            editFlag
              ? currentItem.taskStatus == "Completed"
                ? true
                : false
              : false
          }
        />
      </div>
      <div className="flex flex-col justify-end w-1/5">
        <input
          className={`${poppins.className} self-center p-2 bg-orange-400 text-white font-semibold rounded-xl`}
          type="submit"
          value={editFlag ? "Edit Task" : "Add Task"}
          disabled={
            editFlag
              ? currentItem.taskStatus == "Completed"
                ? true
                : false
              : false
          }
        />
      </div>
    </form>
  );
}

export default SubTaskForm;
