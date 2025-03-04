import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import "./style.scss";
import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import Image from "next/image";

const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function ToolDamagedDrawer({
  refreshData,
  open,
  user,
  onClose,
  edit,
  editData,
}) {
  const [formData, setFormData] = useState({
    user: user == null ? "" : user.fullname,
    currentDate: moment(new Date()).format("MM/DD/YYYY"),
    category: "",
    subCategory: "",
    description: "",
    location: "",
    serial: "",
    toolNumber: "",
  });
  const [fileUpload, setFileUpload] = useState("");
  const [newFileFlag, setNewFileFlag] = useState(false);
  const [oldFile, setOldFile] = useState("");
  useEffect(() => {
    if (edit) {
      setFormData({
        user: user == null ? "" : user.fullname,
        currentDate: moment(new Date()).format("MM/DD/YYYY"),
        category: editData.category,
        subCategory: editData.subCategory,
        description: editData.description,
        location: editData.location,
        serial: editData.serial,
        toolNumber: editData.toolNumber,
      });
      setFileUpload(
        editData.picture !== undefined ? editData.picture : undefined
      );
      setOldFile(editData.picture !== undefined ? editData.picture : undefined);
    }
  }, [open]);
  const handleAddTagout = (e) => {
    e.preventDefault();
    if (edit) {
      const formDataObj = new FormData();
      formDataObj.append("user", formData.user);
      formDataObj.append("currentDate", formData.currentDate);
      formDataObj.append("category", formData.category);
      formDataObj.append("subCategory", formData.subCategory);
      formDataObj.append("description", formData.description);
      formDataObj.append("location", formData.location);
      formDataObj.append("serial", formData.serial);
      formDataObj.append("toolNumber", formData.toolNumber);
      formDataObj.append("files", fileUpload);
      formDataObj.append("editFlag", "true");
      if (newFileFlag) {
        formDataObj.append("files", fileUpload);
        formDataObj.append(
          "oldFiles",
          oldFile == undefined ? undefined : JSON.stringify(oldFile)
        );
      } else {
        formDataObj.append(
          "pictureObj",
          fileUpload == undefined ? undefined : JSON.stringify(fileUpload)
        );
      }
      formDataObj.append("newFileFlag", newFileFlag);
      axios
        .patch(
          `${apiPath.prodPath}/api/toolDamage/${editData._id}`,
          formDataObj
        )
        .then((res) => {
          if (res.data.error) {
            Swal.fire({
              icon: "error",
              text: "Uneable to edit data",
            });
          }
          if (res.data.error == false) {
            Swal.fire({
              icon: "success",
              text: "Editted Successfully",
            });
            refreshData();
          }
        })
        .catch((err) => console.log(err));
    } else {
      const formDataObj = new FormData();
      formDataObj.append("user", formData.user);
      formDataObj.append("currentDate", formData.currentDate);
      formDataObj.append("category", formData.category);
      formDataObj.append("subCategory", formData.subCategory);
      formDataObj.append("description", formData.description);
      formDataObj.append("location", formData.location);
      formDataObj.append("serial", formData.serial);
      formDataObj.append("toolNumber", formData.toolNumber);
      formDataObj.append("files", fileUpload);
      axios
        .post(`${apiPath.prodPath}/api/toolDamage/addtoolDamage`, formDataObj)
        .then((res) => {
          if (res.data.error == false) {
            Swal.fire({ icon: "success", text: "Added Successfully" });
          } else if (res.data.error === true) {
            Swal.fire({
              icon: "error",
              text: "Unanble to add Need Track data",
            });
          }
          if (res.data.error == false) {
            refreshData();
            dataEntryRefresh();
            onClose();
          }
        });
    }
  };
  const dataEntryRefresh = () => {
    setFormData({
      user: "",
      currentDate: "",
      category: "",
      subCategory: "",
      description: "",
      location: "",
      serial: "",
      toolNumber: "",
    });
  };
  const handleTextData = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleFile = (e) => {
    if (edit) {
      setNewFileFlag(true);
      setFileUpload(e.target.files[0]);
    } else {
      setFileUpload(e.target.files[0]);
    }
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
          </span>
          {edit ? "Edit" : "Add Tool Damage"}
        </h1>
        <form
          onSubmit={handleAddTagout}
          className="flex flex-row gap-5 flex-wrap w-full mt-9"
        >
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Current Date</label>
            <input
              name="currentDate"
              type="text"
              onChange={handleTextData}
              disabled={true}
              value={formData.currentDate}
              className="p-2 cus-tool-form"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">User</label>
            <input
              name="user"
              type="text"
              onChange={handleTextData}
              disabled={true}
              value={formData.user}
              className="p-2 cus-tool-form"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Category</label>
            <input
              name="category"
              type="text"
              onChange={handleTextData}
              value={formData.category}
              className="p-2 cus-tool-form"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Tool #</label>
            <input
              name="toolNumber"
              type="text"
              onChange={handleTextData}
              value={formData.toolNumber}
              className="p-2 cus-tool-form"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Sub Category</label>
            <input
              name="subCategory"
              type="text"
              onChange={handleTextData}
              value={formData.subCategory}
              className="p-2 cus-tool-form"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Location</label>
            <input
              name="location"
              type="text"
              onChange={handleTextData}
              value={formData.location}
              className="p-2 cus-tool-form"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Serial</label>
            <input
              name="serial"
              type="text"
              onChange={handleTextData}
              value={formData.serial}
              className="p-2 cus-tool-form"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Picture</label>
            <input
              accept="image/png,image/jpeg"
              name="files"
              type="file"
              onChange={handleFile}
              className="p-2 cus-tool-form"
            />
            {edit && fileUpload !== undefined ? (
              <img src={fileUpload.fileUrl} style={{ width: "30%" }} />
            ) : null}
          </div>
          <div className="flex flex-col w-1/4 gap-2" style={{ width: "100%" }}>
            <label className="font-semibold">Description</label>
            <textarea
              className={`${poppins.className} p-2 cus-tool-form`}
              name="description"
              rows={4}
              cols={4}
              value={formData.description}
              onChange={handleTextData}
            ></textarea>
          </div>
          <div className="flex flex-row justify-end w-full mt-10">
            <input
              className="p-3 bg-orange-400 text-white font-semibold rounded-xl"
              type="submit"
              value={edit ? "Edit" : "Add Tool Damage"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default ToolDamagedDrawer;
