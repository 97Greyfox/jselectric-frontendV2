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
function GeneralContractDrawer({
  refreshData,
  open,
  addGeneralContract,
  onClose,
  edit,
  editData,
  id,
}) {
  const [formData, setFormData] = useState({
    companyName: "",
    contact: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
    website: "",
  });
  useEffect(() => {
    if (edit) {
      setFormData({
        companyName: editData.companyName,
        contact: editData.contact,
        address: editData.address,
        city: editData.city,
        state: editData.state,
        zipCode: editData.zipCode,
        phone: editData.phone,
        email: editData.email,
        website: editData.website,
      });
    }
  }, [open]);
  const handleAdd = (e) => {
    e.preventDefault();
    if (edit) {
      axios
        .patch(`${apiPath.prodPath}/api/generalContract/${id}`, formData)
        .then((res) => {
          if (res.data.error) {
            Swal.fire({
              icon: "error",
              text: "Unable to edit data",
            });
          } else {
            refreshData();
            dataEntryRefresh();
            onClose();
          }
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post(
          `${apiPath.prodPath}/api/generalContract/addGeneralContract`,
          formData
        )
        .then((res) => {
          if (res.data.error) {
            Swal.fire({
              icon: "error",
              text: "Unable to add data",
            });
          } else {
            refreshData();
            dataEntryRefresh();
            onClose();
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const dataEntryRefresh = () => {
    setFormData({
      companyName: "",
      contact: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      email: "",
      website: "",
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
          {edit ? "Edit General Contractor" : "Add General Contractor"}
        </h1>
        <form
          onSubmit={handleAdd}
          className="flex flex-row gap-5 flex-wrap w-full mt-9"
        >
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Company Name</label>
            <input
              name="companyName"
              type="text"
              onChange={handleTextData}
              value={formData.companyName}
              className="p-2 cus-tool-form"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Contact</label>
            <input
              name="contact"
              type="text"
              onChange={handleTextData}
              value={formData.contact}
              className="p-2 cus-tool-form"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Address</label>
            <input
              name="address"
              type="text"
              onChange={handleTextData}
              value={formData.address}
              className="p-2 cus-tool-form"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">City</label>
            <input
              name="city"
              type="text"
              onChange={handleTextData}
              value={formData.city}
              className="p-2 cus-tool-form"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">State</label>
            <input
              name="state"
              type="text"
              onChange={handleTextData}
              value={formData.state}
              className="p-2 cus-tool-form"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">ZipCode</label>
            <input
              name="zipCode"
              type="text"
              onChange={handleTextData}
              value={formData.zipCode}
              className="p-2 cus-tool-form"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Phone</label>
            <input
              name="phone"
              type="text"
              onChange={handleTextData}
              value={formData.phone}
              className="p-2 cus-tool-form"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Email</label>
            <input
              name="email"
              type="email"
              onChange={handleTextData}
              value={formData.email}
              className="p-2 cus-tool-form"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Website</label>
            <input
              name="website"
              type="text"
              onChange={handleTextData}
              value={formData.website}
              className="p-2 cus-tool-form"
            />
          </div>
          <div className="flex flex-row justify-end w-full mt-10">
            <input
              className="p-3 bg-orange-400 text-white font-semibold rounded-xl"
              type="submit"
              value={
                edit ? "Edit General Contractor" : "Add General Contractor"
              }
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default GeneralContractDrawer;
