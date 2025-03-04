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
import { FileUploader } from "react-drag-drop-files";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import moment from "moment";
import Image from "next/image";

const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
const fileTypes = ["JPG", "PNG", "GIF", "PDF"];
function TrainingDrawer({
  open,
  onClose,
  id,
  editFlag,
  data,
  refreshData,
  user,
}) {
  const [trainingCategory, setTrainingCategory] = useState("");
  const [trainingCategoryOpt, setTrainingCategoryOpt] = useState([]);
  const [trainingId, setTrainingId] = useState("");
  const [dateAdded, setDateAdded] = useState(
    moment(new Date()).format("MM-DD-YYYY")
  );
  const [addedBy, setAddedBy] = useState("");
  const [addedByOpt, setAddedByOpt] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileUpload, setFileUpload] = useState(null);
  const [oldFiles, setOldFiles] = useState("");
  const [newFileFlag, setNewFileFlag] = useState(false);
  const [fileName, setFileNames] = useState([]);
  const [videoArr, setVideoArr] = useState([]);
  const [trainingType, setTrainingType] = useState("");

  useEffect(() => {
    if (editFlag == false) {
      console.log("here in false");
      axios
        .get(`${apiPath.prodPath}/api/training/`)
        .then((res) => {
          if (res.data.trainings.length > 0) {
            const newTrainingId =
              Number(
                res.data.trainings[res.data.trainings.length - 1].trainingId
              ) + 1;
            setTrainingId(newTrainingId);
          } else {
            console.log("here in lesser");
            setTrainingId(1);
          }
        })
        .catch((error) => console.log(error));
    }
    axios
      .get(`${apiPath.prodPath}/api/trainingCategory/`)
      .then((res) => {
        const optionArr = res.data.trainingCategorys.map((i) => {
          return { label: i.name, value: i.name };
        });
        setTrainingCategoryOpt(optionArr);
      })
      .catch((error) => console.log(error));
    axios.get(`${apiPath.prodPath}/api/users/`).then((res) => {
      const users = res.data.allUsers.map((i) => {
        return { label: i.fullname, value: i.fullname };
      });
      setAddedByOpt(users);
      setAddedBy({ label: user.fullname, value: user.fullname });
    });
    if (editFlag) {
      setFileUpload(data.attachments);
      setOldFiles(data.attachments);
      setTrainingCategory({
        label: data.trainingCategory,
        value: data.trainingCategory,
      });
      setTrainingType({
        label: data.trainingType,
        value: data.trainingType,
      });
      setTrainingId(data.trainingId);
      setDateAdded(
        data.dateAdded == "" || data.dateAdded == undefined
          ? ""
          : data.dateAdded
      );
      setAddedBy({ label: data.addedBy, value: data.addedBy });
      setTitle(data.title);
      setDescription(data.description);
      setVideoArr(
        data.videos !== undefined
          ? data.videos.length
            ? data.videos.map((i) => {
                return { id: i._id, url: i.url };
              })
            : []
          : []
      );
      setNewFileFlag(false);
    }
  }, [open]);
  const handleaddJob = (e) => {
    e.preventDefault();
    console.log(newFileFlag);
    if (trainingType.value == "Picture") {
      if (fileUpload.length == 0) {
        Swal.fire({
          icon: "error",
          text: "Please upload pictures",
        });
        return false;
      } else {
        if (editFlag && newFileFlag) {
          const formData = new FormData();
          formData.append("trainingCategory", trainingCategory.value);
          formData.append("trainingType", trainingType.value);
          formData.append("trainingId", trainingId);
          formData.append("dateAdded", moment(dateAdded).format("MM-DD-YYYY"));
          formData.append("addedBy", addedBy.value);
          formData.append("title", title);
          formData.append("description", description);
          formData.append("oldFiles", JSON.stringify(oldFiles));
          formData.append("newFileFlag", newFileFlag);
          for (let i = 0; i < fileUpload.length; i++) {
            formData.append("files", fileUpload[i]);
          }
          axios({
            method: "patch",
            url: `${apiPath.prodPath}/api/training/editTraining/${id}`,
            data: formData,
            withCredentials: false,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then((res) => {
              refreshData();
              dataEntryRefresh();
              onClose();
            })
            .catch((err) => console.log(err));
        } else if (editFlag && newFileFlag == false) {
          const formData = new FormData();
          formData.append("trainingCategory", trainingCategory.value);
          formData.append("trainingType", trainingType.value);
          formData.append("trainingId", trainingId);
          formData.append("dateAdded", moment(dateAdded).format("MM-DD-YYYY"));
          formData.append("addedBy", addedBy.value);
          formData.append("title", title);
          formData.append("description", description);
          formData.append("newFileFlag", newFileFlag);
          formData.append("editFlag", editFlag);
          formData.append("oldFiles", JSON.stringify(oldFiles));

          axios({
            method: "patch",
            url: `${apiPath.prodPath}/api/training/editTraining/${id}`,
            data: formData,
            withCredentials: false,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then((res) => {
              refreshData();
              dataEntryRefresh();
              onClose();
            })
            .catch((err) => console.log(err));
        } else {
          const formData = new FormData();
          formData.append("trainingCategory", trainingCategory.value);
          formData.append("trainingType", trainingType.value);
          formData.append("trainingId", trainingId);
          formData.append("dateAdded", moment(dateAdded).format("MM-DD-YYYY"));
          formData.append("addedBy", addedBy.value);
          formData.append("title", title);
          formData.append("description", description); // formData.append("files", fileUpload);
          for (let i = 0; i < fileUpload.length; i++) {
            formData.append("files", fileUpload[i]);
          }
          axios({
            method: "post",
            url: `${apiPath.prodPath}/api/training/addTraining`,
            data: formData,
            withCredentials: false,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then((res) => {
              if (res.data.error) {
                Swal.fire({
                  icon: "error",
                  text: `${res.data.message}`,
                });
              } else {
                refreshData();
                dataEntryRefresh();
                onClose();
              }
            })
            .catch((err) => console.log(err));
        }
      }
    } else {
      if (editFlag) {
        const formData = new FormData();
        formData.append("trainingCategory", trainingCategory.value);
        formData.append("trainingType", trainingType.value);
        formData.append("trainingId", trainingId);
        formData.append("dateAdded", moment(dateAdded).format("MM-DD-YYYY"));
        formData.append("addedBy", addedBy.value);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("videoArr", JSON.stringify(videoArr));
        axios({
          method: "patch",
          url: `${apiPath.prodPath}/api/training/editTraining/${id}`,
          data: formData,
          withCredentials: false,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((res) => {
            refreshData();
            dataEntryRefresh();
            onClose();
          })
          .catch((err) => console.log(err));
      } else {
        const formData = new FormData();
        formData.append("trainingCategory", trainingCategory.value);
        formData.append("trainingType", trainingType.value);
        formData.append("trainingId", trainingId);
        formData.append("dateAdded", moment(dateAdded).format("MM-DD-YYYY"));
        formData.append("addedBy", addedBy.value);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("videoArr", JSON.stringify(videoArr));
        axios({
          method: "post",
          url: `${apiPath.prodPath}/api/training/addTraining`,
          data: formData,
          withCredentials: false,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((res) => {
            if (res.data.error) {
              Swal.fire({
                icon: "error",
                text: `${res.data.message}`,
              });
            } else {
              refreshData();
              dataEntryRefresh();
              onClose();
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };
  const dataEntryRefresh = () => {
    setTrainingCategory("");
    setTrainingType("");
    setTrainingId("");
    setDateAdded("");
    setAddedBy("");
    setTitle("");
    setDescription("");
    setFileUpload(null);
    setOldFiles("");
    setNewFileFlag(false);
    setFileNames([]);
    setVideoArr([]);
  };
  const fileHandler = (newfiles) => {
    setNewFileFlag(true);
    setFileUpload(newfiles);
    Object.values(newfiles).forEach((val) => {
      setFileNames([val.name, ...fileName]);
    });
  };
  console.log(trainingId);
  const handlevideoArr = () => {
    const obj = {
      id: uuidv4(),
      url: "",
    };
    setVideoArr((prev) => {
      return [obj, ...prev];
    });
  };
  const handleRemoveEl = (i) => {
    const filteredArr = videoArr.filter((el) => el.id !== i.id);
    setVideoArr(filteredArr);
  };
  const handleLaborInp = (e, id) => {
    const result = videoArr.map((el) => {
      if (el.id == id) {
        el.url = e.target.value;
      }
      return el;
    });
    setVideoArr(result);
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
          {editFlag ? "Edit Devices" : "Add Devices"}
        </h1>
        <form
          onSubmit={handleaddJob}
          className="flex flex-row gap-5 flex-wrap w-full mt-9"
        >
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Training Type</label>
            <Select
              options={[
                { label: "Picture", value: "Picture" },
                { label: "Video", value: "Video" },
              ]}
              value={trainingType}
              onChange={(v) => setTrainingType(v)}
              required={true}
              className="employee-names"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Training Category</label>
            <Select
              options={trainingCategoryOpt}
              value={trainingCategory}
              onChange={(v) => setTrainingCategory(v)}
              required={true}
              className="employee-names"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Training ID</label>
            <input
              type="text"
              value={trainingId}
              onChange={(e) => setTrainingId(e.target.value)}
              className="p-2 cus-tool-form"
              required={true}
              disabled={true}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Date Added</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  onClick={() => console.log("clicked")}
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !dateAdded && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateAdded ? (
                    moment(dateAdded).format("MM-DD-YYYY")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 cus-calendar">
                <Calendar
                  mode="single"
                  selected={dateAdded}
                  onSelect={(date) => setDateAdded(date)}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Added By</label>
            <Select
              options={addedByOpt}
              value={addedBy}
              onChange={(v) => setAddedBy(v)}
              isDisabled={true}
              className="employee-names"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 cus-tool-form"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 cus-tool-form"
            />
          </div>
          {trainingType.value == "Picture" ? (
            <div className="single-inp">
              <label className="font-semibold">Files</label>
              <FileUploader
                multiple={true}
                handleChange={fileHandler}
                name="files"
                types={fileTypes}
                required={fileUpload == null ? true : false}
                fileOrFiles={fileUpload}
              />
              {oldFiles.length && editFlag
                ? oldFiles.map((i, ind) => (
                    <p
                      key={`${i.filename}${i.ind}`}
                      style={{ fontSize: "14px" }}
                    >
                      {i.filename}
                    </p>
                  ))
                : null}
            </div>
          ) : null}
          {trainingType.value == "Video" ? (
            <div style={{ width: "100%", marginTop: 20 }}>
              <p className="cus-labor-btn" onClick={() => handlevideoArr()}>
                &#10011; Url
              </p>
            </div>
          ) : null}
          {trainingType.value == "Video"
            ? videoArr.length
              ? videoArr.map((i) => {
                  return (
                    <div
                      style={{ width: "100%", display: "flex" }}
                      key={i.id}
                      className="labor-arr-wrap"
                    >
                      <div className="flex flex-col w-1/4 gap-2">
                        <label className="font-semibold">Video Url</label>
                        <input
                          type="text"
                          value={i.url}
                          onChange={(e) =>
                            handleLaborInp(e, i.id == undefined ? i._id : i.id)
                          }
                        />
                      </div>
                      {videoArr.length > 0 ? (
                        <span
                          className="minus"
                          style={{ fontSize: "22px" }}
                          onClick={() => handleRemoveEl(i)}
                        >
                          &#9866;
                        </span>
                      ) : null}
                    </div>
                  );
                })
              : null
            : null}
          <div className="flex flex-row justify-end w-full mt-10">
            <input
              className="p-3 bg-orange-400 text-white font-semibold rounded-xl"
              type="submit"
              value={editFlag ? "Edit Training" : "Add Training"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default TrainingDrawer;
