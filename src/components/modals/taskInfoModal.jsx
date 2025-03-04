import { Modal } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "../ui/button";
import { apiPath } from "@/utils/routes";
import TaskTopInfo from "../topInfo/taskTopInfo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "./style.scss";
import SubTask from "../task/subTaskComp";
import NotesTask from "../task/notesTab";
import TaskAttachment from "../task/taskAttachments";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function TaskInfo({ open, onClose, item }) {
  const [activeTab, setActiveTab] = useState("Sub-Tasks");
  const [subTask, setSubTask] = useState([]);
  const [noteTask, setNoteTask] = useState([]);
  const [taskAttachments, setTaskAttachments] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    console.log("in useEffect", activeTab);
    if (activeTab == "Sub-Tasks") {
      setLoader(true);
      axios
        .get(`${apiPath.prodPath}/api/task`)
        .then((res) => {
          const allSubTasks = res.data.allTasks.find((i) => i.id == item.id);
          setSubTask(allSubTasks && allSubTasks.subTasks);
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (activeTab == "Notes") {
      setLoader(true);
      axios
        .get(`${apiPath.prodPath}/api/task`)
        .then((res) => {
          const allNoteTasks = res.data.allTasks.find((i) => i.id == item.id);
          setNoteTask(allNoteTasks && allNoteTasks.notes);
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (activeTab == "Attachments") {
      console.log("here");
      setLoader(true);
      axios
        .get(`${apiPath.prodPath}/api/task`)
        .then((res) => {
          const allTaskAttachments = res.data.allTasks.find(
            (i) => i.id == item.id
          );
          setTaskAttachments(
            allTaskAttachments && allTaskAttachments.attachments
          );
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [activeTab]);
  const controlRefreshData = () => {
    setRefreshFlag(!refreshFlag);
  };
  const refreshData = (tab) => {
    console.log("activeTab", activeTab);
    if (activeTab == "Sub-Tasks" || tab == "Sub-Tasks") {
      setLoader(true);
      axios
        .get(`${apiPath.prodPath}/api/task`)
        .then((res) => {
          const allSubTasks = res.data.allTasks.find((i) => i.id == item.id);
          setSubTask(allSubTasks && allSubTasks.subTasks);
          controlRefreshData();
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (activeTab == "Notes" || tab == "Notes") {
      setLoader(true);
      axios
        .get(`${apiPath.prodPath}/api/task`)
        .then((res) => {
          const allNoteTasks = res.data.allTasks.find((i) => i.id == item.id);
          setNoteTask(allNoteTasks && allNoteTasks.notes);
          controlRefreshData();
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (activeTab == "Attachments" || tab == "Attachments") {
      setLoader(true);
      axios
        .get(`${apiPath.prodPath}/api/task`)
        .then((res) => {
          const allTaskAttachments = res.data.allTasks.find(
            (i) => i.id == item.id
          );
          setTaskAttachments(
            allTaskAttachments && allTaskAttachments.attachments
          );
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const tabHandler = (e) => {
    setActiveTab(e.target.innerText);
  };
  console.log("taskAttachments", taskAttachments);
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex flex-row justify-center align-middle w-full h-full"
    >
      <div
        className={`${poppins.className} bg-white w-5/6 h-dvh p-10 border-none overflow-y-scroll`}
      >
        <div className="mb-10">
          <Button
            onClick={() => {
              onClose();
              refreshData();
            }}
            className="bg-transparent flex flex-row text-black hover:bg-transparent text-3xl p-0"
          >
            <ArrowBackIosIcon className="text-4xl text-gray-500" />
            <h1 className="text-3xl font-semibold">Open</h1>
          </Button>
        </div>
        <TaskTopInfo item={item} />
        <Tabs
          defaultValue="subTasks"
          onClick={(e) => setActiveTab(e.target.innerText)}
          className="w-full"
        >
          <TabsList className="cus-tab-wrap">
            <TabsTrigger value="subTasks">Sub-Tasks</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="attachments">Attachments</TabsTrigger>
          </TabsList>
          <TabsContent value="subTasks">
            <SubTask
              refreshData={refreshData}
              taskId={item.id}
              subTasks={subTask}
              refreshFlag={refreshFlag}
              task={item}
            />
          </TabsContent>
          <TabsContent value="notes">
            <NotesTask
              refreshData={refreshData}
              taskId={item.id}
              noteTasks={noteTask}
              refreshFlag={refreshFlag}
              task={item}
            />
          </TabsContent>
          <TabsContent value="attachments">
            <TaskAttachment
              refreshData={refreshData}
              taskId={item.id}
              taskAttachments={taskAttachments}
              refreshFlag={refreshFlag}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Modal>
  );
}

export default TaskInfo;
