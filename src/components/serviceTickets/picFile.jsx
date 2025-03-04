"use client";
import React, { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import moment from "moment";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import PicInfoTable from "../innerTables/toolPickInfoTable";
import useStore from "@/utils/store/store";
import { Skeleton } from "../ui/skeleton";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
function PicFileService({ serviceId, attachments }) {
  const [fileUpload, setFileUpload] = useState([]);
  const [note, setNote] = useState("");
  const [data, setData] = useState("");
  const [allAttachments, setAllAttachments] = useState(attachments);
  const [editFlag, setEditFlag] = useState(false);
  const [attachmentId, setAttachmentId] = useState("");
  const [newFileFlag, setNewFileFlag] = useState(false);
  const currentUser = useStore((state) => state.user);
  const [oldFiles, setOldFiles] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setEditFlag(false);
    loadUser();
  }, []);
  const loadUser = async () => {
    setLoading(true);
    const allUsers = await axios
      .get(`${apiPath.prodPath}/api/service/`)
      .then((res) => {
        setLoading(false);
        return res.data.services;
      });
    console.log("@@@@", allUsers);
    setAllAttachments(allUsers.find((i) => i.id == serviceId).attachments);
  };
  const handleFilesData = (e) => {
    setLoading(true);
    e.preventDefault();
    if (editFlag && newFileFlag) {
      const formData = new FormData();
      formData.append("date", moment(new Date()).format("MM-DD-YYYY"));
      formData.append("time", moment(new Date()).format("hh:mm A"));
      formData.append("note", note);
      formData.append("id", attachmentId);
      formData.append("user", currentUser && currentUser.fullname);
      formData.append("newFileFlag", newFileFlag);
      formData.append("oldFiles", JSON.stringify(oldFiles));
      for (let i = 0; i < fileUpload.length; i++) {
        formData.append("files", fileUpload[i]);
      }
      axios({
        method: "patch",
        url: `${apiPath.prodPath}/api/service/editFiles/${serviceId}`,
        data: formData,
        withCredentials: false,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          setLoading(false);
          loadUser();
          clearInput();
          setEditFlag(false);
        })
        .catch((err) => console.log(err));
    } else if (editFlag && newFileFlag == false) {
      const formData = new FormData();
      formData.append("date", moment(new Date()).format("MM-DD-YYYY"));
      formData.append("time", moment(new Date()).format("hh:mm A"));
      formData.append("note", note);
      formData.append("user", currentUser && currentUser.fullname);
      formData.append("newFileFlag", newFileFlag);
      formData.append("editFlag", editFlag);
      formData.append("oldFiles", JSON.stringify(oldFiles));
      formData.append("id", attachmentId);
      axios({
        method: "patch",
        url: `${apiPath.prodPath}/api/service/editFiles/${serviceId}`,
        data: formData,
        withCredentials: false,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          setLoading(false);
          loadUser();
          clearInput();
          setEditFlag(false);
        })
        .catch((err) => console.log(err));
    } else {
      const formData = new FormData();
      formData.append("date", moment(new Date()).format("MM-DD-YYYY"));
      formData.append("time", moment(new Date()).format("hh:mm A"));
      formData.append("note", note);
      formData.append("user", currentUser && currentUser.fullname);
      // formData.append("files", fileUpload);
      for (let i = 0; i < fileUpload.length; i++) {
        formData.append("files", fileUpload[i]);
      }
      axios({
        method: "patch",
        url: `${apiPath.prodPath}/api/service/addFiles/${serviceId}`,
        data: formData,
        withCredentials: false,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => {
          setLoading(false);
          loadUser();
          clearInput();
          setEditFlag(false);
        })
        .catch((err) => console.log(err));
    }
  };
  const clearInput = () => {
    setNote("");
    setFileUpload([]);
  };
  const fileHandler = (e) => {
    setNewFileFlag(true);
    setFileUpload(e.target.files);
  };
  // const getBase64 = (file) => {
  //   let reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = function () {
  //     const dataObj = {
  //       file: reader.result,
  //       fileType: file.type,
  //     };
  //     setFileUpload((state) => [dataObj, ...state]);
  //   };
  //   reader.onerror = function (error) {
  //     console.log("Error: ", error);
  //   };
  // };
  const editData = (data) => {
    setNote(data.note);
    setFileUpload(data.files);
    setOldFiles(data.files);
    setEditFlag(true);
    setAttachmentId(data.id);
    setNewFileFlag(false);
  };
  const deletePic = (data) => {
    setLoading(true);
    setOldFiles(data.files);
    Swal.fire({
      icon: "error",
      text: "Are you sure you want to delete the pic/file data",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      showConfirmButton: true,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const dataObj = {
          oldFiles: data.files,
        };
        axios({
          method: "patch",
          url: `${apiPath.prodPath}/api/service/delFiles/${serviceId}&&${data.id}`,
          data: dataObj,
          withCredentials: false,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((res) => {
            setLoading(false);
            loadUser();
          })
          .catch((err) => console.log(err));
      }
    });
  };
  console.log("this is attachments", attachments);
  console.log("this is attachments", allAttachments);
  return loading ? (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[300px] w-[500px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ) : (
    <section>
      <form
        className="flex flex-row gap-2 w-full"
        onSubmit={handleFilesData}
        encType="multipart/form-data"
      >
        <div className="flex flex-col w-1/3">
          <label className="font-semibold">Files</label>
          <input
            type="file"
            className={`${poppins.className} p-2 cus-tool-form`}
            onChange={fileHandler}
            multiple
            name="files"
            required={true}
          />

          {oldFiles.length && editFlag
            ? oldFiles.map((i, ind) => (
                <p key={`${i.filename}${i.ind}`} style={{ fontSize: "14px" }}>
                  {i.filename}
                </p>
              ))
            : null}
        </div>
        <div className="flex flex-col w-1/3">
          <label className="font-semibold">Notes</label>
          <input
            type="text"
            value={note}
            className={`${poppins.className} p-2 cus-tool-form`}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-1/3 btn-wrap justify-end">
          {editFlag ? (
            <input
              className={`${poppins.className} p-3 bg-orange-400 text-white font-semibold rounded-xl self-end`}
              type="submit"
              value="Edit"
            />
          ) : (
            <input
              className={`${poppins.className} p-3 bg-orange-400 text-white font-semibold rounded-xl self-end`}
              type="submit"
              value="Add"
            />
          )}
        </div>
      </form>
      {allAttachments.length == 0 ? (
        <p className={poppins.className} style={{ marginTop: 30 }}>
          There are no Pictures / Files not found
        </p>
      ) : (
        // <PicInfo attachments={attachments} />
        <PicInfoTable
          openEdit={(data) => editData(data)}
          attachments={allAttachments}
          deleteTool={(data) => deletePic(data)}
        />
      )}
    </section>
  );
}

export default PicFileService;
