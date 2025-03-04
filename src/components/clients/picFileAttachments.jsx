import React, { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import { FileUploader } from "react-drag-drop-files";
import Swal from "sweetalert2";
import Select from "react-select";
import useStore from "@/utils/store/store";
import TaskAttachmentTable from "../innerTables/taskAttachmentTable";
import { Skeleton } from "../ui/skeleton";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
const fileTypes = ["JPG", "PNG", "GIF", "PDF"];
function ClientAttachmentForm({ clientId, attachments }) {
  const [fileUpload, setFileUpload] = useState(null);
  const [allAttachments, setAllAttachments] = useState(attachments);
  const [editFlag, setEditFlag] = useState(false);
  const [attachmentId, setAttachmentId] = useState("");
  const [newFileFlag, setNewFileFlag] = useState(false);
  const currentUser = useStore((state) => state.user);
  const [oldFiles, setOldFiles] = useState("");
  const [fileName, setFileNames] = useState([]);
  const [user, setUser] = useState(currentUser ? currentUser.fullname : "");
  const [note, setNote] = useState("");
  const [attachmentCategories, setAttachmentCategories] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setEditFlag(false);
    loadUser();
  }, []);
  const loadUser = async () => {
    setLoading(true);
    const clients = await axios
      .get(`${apiPath.prodPath}/api/clients/`)
      .then((res) => {
        setLoading(false);
        return res.data.clients;
      });
    setAllAttachments(clients.find((i) => i.id == clientId).attachments);
  };
  const handleFilesData = (e) => {
    if (fileUpload.length == 0) {
      return false;
    } else {
      setLoading(true);
      e.preventDefault();
      if (editFlag && newFileFlag) {
        const formData = new FormData();
        formData.append("date", moment(new Date()).format("MM-DD-YYYY"));
        formData.append("user", user);
        formData.append("note", note);
        formData.append("attachmentCategories", attachmentCategories.value);
        formData.append("newFileFlag", newFileFlag);
        formData.append("id", attachmentId);
        formData.append("oldFiles", JSON.stringify(oldFiles));
        for (let i = 0; i < fileUpload.length; i++) {
          formData.append("files", fileUpload[i]);
        }
        axios({
          method: "patch",
          url: `${apiPath.prodPath}/api/clients/editFiles/${clientId}`,
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
        formData.append("user", user);
        formData.append("note", note);
        formData.append("attachmentCategories", attachmentCategories.value);
        formData.append("newFileFlag", newFileFlag);
        formData.append("editFlag", editFlag);
        formData.append("oldFiles", JSON.stringify(oldFiles));
        formData.append("id", attachmentId);
        axios({
          method: "patch",
          url: `${apiPath.prodPath}/api/clients/editFiles/${clientId}`,
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
        formData.append("user", currentUser && currentUser.fullname);
        formData.append("note", note);
        formData.append("attachmentCategories", attachmentCategories.value);
        // formData.append("files", fileUpload);
        for (let i = 0; i < fileUpload.length; i++) {
          formData.append("files", fileUpload[i]);
        }
        axios({
          method: "patch",
          url: `${apiPath.prodPath}/api/clients/addFiles/${clientId}`,
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
    }
  };
  const clearInput = () => {
    setFileUpload([]);
    setFileNames([]);
    setNote("");
    setAttachmentCategories("");
  };
  const fileHandler = (newfiles) => {
    setNewFileFlag(true);
    setFileUpload(newfiles);
    Object.values(newfiles).forEach((val) => {
      setFileNames([val.name, ...fileName]);
    });
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
    setNote(data.note == undefined ? "" : data.note);
    setAttachmentCategories(
      data.attachmentCategories == undefined
        ? ""
        : { label: data.attachmentCategories, value: data.attachmentCategories }
    );
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
          url: `${apiPath.prodPath}/api/clients/delFiles/${clientId}&&${data.id}`,
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
        className="flex flex-row w-full gap-10"
        onSubmit={handleFilesData}
        encType="multipart/form-data"
      >
        <div className="flex flex-col gap-2 w-1/3">
          <label className="font-semibold text-xl">Files</label>
          {/* <input
            type="file"
            className={`${poppins.className} flex flex-col gap-2 w-1/3`}
            onChange={fileHandler}
            multiple
            name="files"
            required={true}
          /> */}
          <FileUploader
            multiple={true}
            handleChange={fileHandler}
            name="files"
            types={fileTypes}
            required={fileUpload == null ? false : true}
            fileOrFiles={fileUpload}
          />
          {fileName.length ? fileName.map((i) => <p key={i}>{i}</p>) : null}
          {oldFiles.length && editFlag
            ? oldFiles.map((i, ind) => (
                <p key={`${i.filename}${i.ind}`} style={{ fontSize: "14px" }}>
                  {i.filename}
                </p>
              ))
            : null}
        </div>
        <div className="flex flex-col gap-2 w-1/3" style={{ width: "100%" }}>
          <label className="font-semibold text-xl">Notes</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="p-2 border-2 border-grey rounded-xl"
          />
        </div>
        <div className="flex flex-col gap-2 w-2/3">
          <label className="font-semibold text-xl">Attachment Category</label>
          <Select
            options={[
              { label: "Pictures", value: "Pictures" },
              { label: "Blueprints", value: "Blueprints" },
              { label: "Invoices", value: "Invoices" },
              { label: "Notes", value: "Notes" },
              { label: "Ability", value: "Ability" },
            ]}
            onChange={(v) => setAttachmentCategories(v)}
            value={attachmentCategories}
            className="employee-names"
          />
        </div>
        <div className="flex flex-col justify-end gap-2 w-1/3">
          <input
            className={`${poppins.className} p-2 bg-orange-400 text-white`}
            type="submit"
            value={editFlag ? "Edit" : "Add"}
          />
        </div>
      </form>
      {allAttachments && allAttachments.length == 0 ? (
        <p className={poppins.className} style={{ marginTop: 30 }}>
          There are no Pictures / Files not found
        </p>
      ) : (
        // <PicInfo attachments={attachments} />
        <TaskAttachmentTable
          openEdit={(data) => editData(data)}
          attachments={allAttachments}
          deleteTool={(data) => deletePic(data)}
        />
      )}
    </section>
  );
}

export default ClientAttachmentForm;
