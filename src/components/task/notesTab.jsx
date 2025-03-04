import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import NoteTaskForm from "./notesForm";
import NoteTaskTable from "./noteTaskTable";
function NotesTask({ refreshData, taskId, noteTasks, refreshFlag, task }) {
  const [noteTaskId, setNoteTaskId] = useState("");
  const [editFlag, setEditFlag] = useState(false);
  const [currentItem, setCurrentItem] = useState("");
  useEffect(() => {
    console.log("##$$#$$", noteTasks);
  }, [refreshFlag]);
  const handleAddNoteTask = (data, assignedToUsers) => {
    axios
      .put(`${apiPath.prodPath}/api/task/addTaskNote/${taskId}`, data)
      .then((res) => {
        if (res.data.error) {
          Swal.fire({
            icon: "error",
            text: "Error adding the notes",
          });
        } else {
          Swal.fire({
            icon: "success",
            text: "Added Successfully",
          });
          refreshData();
          sendNewNotesEmail(task, data, [...assignedToUsers]);
        }
      });
  };
  const editNoteTask = (data, id) => {
    setCurrentItem(data);
    setNoteTaskId(id);
    setEditFlag(true);
  };
  const deleteNoteTask = (id) => {
    axios
      .delete(`${apiPath.prodPath}/api/task/delTaskNote/${taskId}&&${id}`)
      .then((res) => {
        if (res.data.error) {
          Swal.fire({
            icon: "error",
            text: "Enable to delete the sub task",
          });
        } else {
          Swal.fire({
            icon: "success",
            text: "Deleted successfully",
          });
          refreshData();
        }
      });
  };
  const editNoteTaskData = (data, id, assignedToUsers) => {
    axios
      .patch(`${apiPath.prodPath}/api/task/editTaskNote/${taskId}&&${id}`, data)
      .then((res) => {
        if (res.data.error) {
          Swal.fire({
            icon: "error",
            text: "Enable to edit the Note",
          });
        } else {
          Swal.fire({
            icon: "success",
            text: "Edited Successfully",
          });
          refreshData("Notes");
          setEditFlag(false);
          sendEditNoteEmail(task, data, [...assignedToUsers]);
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          text: "Enable to edit the Note",
        });
      });
  };
  const sendNewNotesEmail = (task, data, assignedToUsers) => {
    if (window && window !== undefined) {
      fetch(`${window.location.origin}/api/newNotesEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: task,
          dataObj: data,
          email: assignedToUsers,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
  };
  const sendEditNoteEmail = (task, data, assignedToUsers) => {
    if (window && window !== undefined) {
      fetch(`${window.location.origin}/api/editNotesEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: task,
          dataObj: data,
          email: assignedToUsers,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="sub-task-wrapper">
      <NoteTaskForm
        handleForm={handleAddNoteTask}
        editFlag={editFlag}
        currentItem={currentItem}
        editNoteTaskData={editNoteTaskData}
        task={task}
      />
      {noteTasks && noteTasks.length ? (
        <NoteTaskTable
          noteTasks={noteTasks}
          editNoteTask={editNoteTask}
          deleteNoteTask={deleteNoteTask}
        />
      ) : (
        <p>No Data Found</p>
      )}
    </div>
  );
}

export default NotesTask;
