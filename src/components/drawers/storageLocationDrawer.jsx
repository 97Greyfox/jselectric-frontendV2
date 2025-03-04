import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
import "./style.scss";
import Select from "react-select";
import Image from "next/image";

function StorageLocationDrawer({
  open,
  onClose,
  addStorageLocation,
  edit,
  editData,
  editStorageLocation,
  id,
  refreshData,
}) {
  const [building, setBuilding] = useState("");
  const [buildingOpt, setBuildingOpt] = useState("");
  const [storageId, setStorageId] = useState("");
  const [storageIdOpt, setStorageIdOpt] = useState("");
  const [notes, setNotes] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    axios.get(`${apiPath.prodPath}/api/building`).then((res) => {
      const data = res.data.buildings.map((i) => {
        return { label: i.name, value: i.name };
      });
      setBuildingOpt(data);
    });
    if (edit) {
      console.log("##$$$", editData);
      setBuilding({ label: editData.building, value: editData.building });
      axios.get(`${apiPath.prodPath}/api/storageId`).then((res) => {
        const filteredData = res.data.storageIds.filter(
          (i) => i.parentCategory == editData.building
        );
        setStorageIdOpt(
          filteredData.length
            ? filteredData.map((i) => {
                return { label: i.name, value: i.name };
              })
            : []
        );
      });
      setStorageId({ label: editData.storageId, value: editData.storageId });
      setNotes(editData.notes);
      setDescription(editData.description);
    }
  }, [open]);
  const handleBuilding = (v) => {
    setBuilding(v);
    axios.get(`${apiPath.prodPath}/api/storageId`).then((res) => {
      const filteredData = res.data.storageIds.filter(
        (i) => i.parentCategory == v.value
      );
      setStorageIdOpt(
        filteredData.length
          ? filteredData.map((i) => {
              return { label: i.name, value: i.name };
            })
          : []
      );
    });
  };
  const handleAdd = (e) => {
    e.preventDefault();
    const formData = {
      building: building.value,
      storageId: storageId.value,
      notes,
      description,
    };
    if (edit) {
      axios
        .patch(`${apiPath.prodPath}/api/storageLocation/${id}`, formData)
        .then((res) => {
          refreshData();
          dataEntryRefresh();
        })
        .catch((error) => console.log(error));
    } else {
      addStorageLocation(formData);
      dataEntryRefresh();
    }
  };
  const dataEntryRefresh = () => {
    setBuilding("");
    setStorageId("");
    setNotes("");
    setDescription("");
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
          {edit ? "Edit Storage Location" : "Add Storage Location"}
        </h1>
        <form
          onSubmit={handleAdd}
          className="flex flex-row gap-5 flex-wrap w-full mt-9"
        >
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Building</label>
            <Select
              options={buildingOpt}
              onChange={handleBuilding}
              value={building}
              className="employee-names"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Building</label>
            <Select
              options={storageIdOpt}
              onChange={(v) => setStorageId(v)}
              value={storageId}
              className="employee-names"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Notes</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="p-2 cus-tool-form"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Description</label>
            <textarea
              className="p-2 cus-tool-form"
              cols={5}
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-row justify-end w-full mt-10">
            <input
              className="p-3 bg-orange-400 text-white font-semibold rounded-xl"
              type="submit"
              value={edit ? "Edit Storage Location" : "Add Storage Location"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default StorageLocationDrawer;
