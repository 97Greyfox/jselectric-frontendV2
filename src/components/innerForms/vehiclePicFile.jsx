import React, { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
// import PicInfo from "./picInfo";
// import VehicleInfoTable from "./vehicleInfoTable";
import moment from "moment";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import Select from "react-select";
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
import VehiclePicTable from "../innerTables/vehiclePicTable";
import useStore from "@/utils/store/store";
import { Skeleton } from "@/components/ui/skeleton";

function VehiclePicFile({ vehicleId, attachments }) {
  const [fileUpload, setFileUpload] = useState([]);
  const [note, setNote] = useState("");
  const [data, setData] = useState("");
  const [allAttachments, setAllAttachments] = useState(attachments);
  const [editFlag, setEditFlag] = useState(false);
  const [attachmentId, setAttachmentId] = useState("");
  const [newFileFlag, setNewFileFlag] = useState(false);
  const user = useStore((state) => state.user);
  const [oldFiles, setOldFiles] = useState("");
  const [loading, setLoading] = useState(false);
  const [attachmentCategories, setAttachmentCategories] = useState("");

  useEffect(() => {
    setEditFlag(false);
    loadUser();
  }, []);
  const loadUser = async () => {
    setLoading(true);
    const allVehicles = await axios
      .get(`${apiPath.prodPath}/api/vehicles/`)
      .then((res) => {
        setLoading(false);
        return res.data.vehicles;
      });
    setAllAttachments(allVehicles.find((i) => i.id == vehicleId).attachments);
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
      formData.append("user", user && user.fullname);
      formData.append("newFileFlag", newFileFlag);
      formData.append("attachmentCategories", attachmentCategories.value);
      formData.append("oldFiles", JSON.stringify(oldFiles));
      for (let i = 0; i < fileUpload.length; i++) {
        formData.append("files", fileUpload[i]);
      }
      axios({
        method: "patch",
        url: `${apiPath.prodPath}/api/vehicles/editFiles/${vehicleId}`,
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
      formData.append("user", user && user.fullname);
      formData.append("newFileFlag", newFileFlag);
      formData.append("editFlag", editFlag);
      formData.append("attachmentCategories", attachmentCategories.value);
      formData.append("oldFiles", JSON.stringify(oldFiles));
      formData.append("id", attachmentId);
      axios({
        method: "patch",
        url: `${apiPath.prodPath}/api/vehicles/editFiles/${vehicleId}`,
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
      formData.append("attachmentCategories", attachmentCategories.value);
      formData.append("user", user && user.fullname);
      // formData.append("files", fileUpload);
      for (let i = 0; i < fileUpload.length; i++) {
        formData.append("files", fileUpload[i]);
      }
      axios({
        method: "patch",
        url: `${apiPath.prodPath}/api/vehicles/addFiles/${vehicleId}`,
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
    setAttachmentCategories(
      data.attachmentCategories == undefined
        ? ""
        : { label: data.attachmentCategories, value: data.attachmentCategories }
    );
  };
  const deletePic = (data) => {
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
        setLoading(true);
        const dataObj = {
          oldFiles: data.files,
        };
        axios({
          method: "patch",
          url: `${apiPath.prodPath}/api/vehicles/delFiles/${vehicleId}&&${data.id}`,
          data: dataObj,
          withCredentials: false,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((res) => {
            setLoading(false);
            loadUser();
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
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
    <section className="flex flex-col pt-5">
      <form
        className="flex flex-row gap-3"
        onSubmit={handleFilesData}
        encType="multipart/form-data"
      >
        <div className="flex flex-col w-1/4 gap-2">
          <label className="font-semibold">Files</label>
          <input
            type="file"
            className={`${poppins.className} p-2 cus-tool-form`}
            onChange={fileHandler}
            multiple
            name="files"
            required={editFlag ? false : true}
          />

          {oldFiles.length && editFlag
            ? oldFiles.map((i, ind) => (
                <p key={`${i.filename}${i.ind}`} style={{ fontSize: "14px" }}>
                  {i.filename}
                </p>
              ))
            : null}
        </div>
        <div className="flex flex-col w-1/4 gap-2">
          <label className="font-semibold">Attachment Category</label>
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
        <div className="flex flex-col w-1/4 gap-2">
          <label className="font-semibold">Notes</label>
          <input
            type="text"
            value={note}
            className={`${poppins.className} p-2 cus-tool-form`}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-1/4 justify-end">
          <input
            className="p-3 bg-orange-400 text-white font-semibold rounded-xl self-center"
            type="submit"
            value={editFlag ? "Edit" : "Add"}
          />
        </div>
      </form>
      {allAttachments.length == 0 ? (
        <p className={poppins.className} style={{ marginTop: 30 }}>
          There are no Pictures / Files not found
        </p>
      ) : (
        // <PicInfo attachments={attachments} />
        <VehiclePicTable
          openEdit={(data) => editData(data)}
          attachments={allAttachments}
          deleteTool={(data) => deletePic(data)}
        />
      )}
    </section>
  );
}

export default VehiclePicFile;
