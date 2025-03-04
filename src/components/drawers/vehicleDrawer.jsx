import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
// import { DatePicker } from "react-rainbow-components";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
import Image from "next/image";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function VehicleDrawer({
  open,
  onClose,
  addVehicle,
  editVehicle,
  id,
  edit,
  data,
}) {
  const [vehicleNo, setVehicleNo] = useState("");
  const [inspectionId, setInspectionId] = useState("");
  const [status, setStatus] = useState("");
  const [driverWEXPin, setDriverWEXPin] = useState("");
  const [vinNo, setVinNo] = useState("");
  const [tagExperation, setTagExperation] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [makeModel, setMakeModel] = useState("");
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");
  const [txTag, setTxTag] = useState("");
  const [gasCard, setGasCard] = useState("");
  const [gasCardLast, setGasCardLast] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [trackingInstalled, setTrackingInstalled] = useState("");
  const [geoTab, setGeoTab] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // axios
    //   .get(`${apiPath.prodPath}/api/users/`)
    //   .then((res) => {
    //     setTechAssignOpt(
    //       res.data.allUsers
    //         .filter((i) => i.userType == "foreman")
    //         .map((i) => ({
    //           label: i.fullname,
    //           value: i.fullname,
    //         }))
    //     );
    //   })
    //   .catch((err) => console.log(err));
    if (edit) {
      setEmail(data.email == undefined ? "" : data.email);
      setVehicleNo(data.vehicleNo);
      setInspectionId(data.inspectionId);
      setStatus({ label: data.status, value: data.status });
      setDriverWEXPin(data.driverWEXPin);
      setVinNo(data.vinNo);
      setTagExperation(data.tagExperation);
      setLicensePlate(data.licensePlate);
      setMakeModel(data.makeModel);
      setColor(data.color);
      setYear(data.year);
      setTxTag({ label: data.txTag, value: data.txTag });
      setGasCard({ label: data.gasCard, value: data.gasCard });
      setGasCardLast(data.gasCardLast);
      setCardNo(data.cardNo);
      setTrackingInstalled({
        label: data.trackingInstalled,
        value: data.trackingInstalled,
      });
      setGeoTab(data.geoTab);
    }
  }, []);
  function validatePhoneNumber(input_str) {
    const re = /^[0-9-]+$/;
    return re.test(input_str);
  }

  const handleAddVehicle = (e) => {
    e.preventDefault();
    const dataObj = {
      vehicleNo,
      driverWEXPin,
      vinNo,
      inspectionId,
      status: status.value,
      tagExperation,
      licensePlate,
      makeModel,
      color,
      year,
      txTag: txTag.value,
      gasCard: gasCard.value,
      gasCardLast,
      cardNo,
      trackingInstalled: trackingInstalled.value,
      geoTab,
      email,
    };
    if (edit) {
      editVehicle(dataObj, id);
    } else {
      addVehicle(dataObj);
      dataEntryRefresh();
    }
  };
  const dataEntryRefresh = () => {
    setVehicleNo("");
    setDriverWEXPin("");
    setVinNo("");
    setTagExperation("");
    setLicensePlate("");
    setMakeModel("");
    setColor("");
    setYear("");
    setInspectionId("");
    setStatus("");
    setTxTag("");
    setGasCard("");
    setGasCardLast("");
    setCardNo("");
    setTrackingInstalled("");
    setGeoTab("");
    setEmail("");
  };
  const categoryHandler = (e) => {
    setCategory(e);
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
          {edit ? "Edit Vehicle" : "Add Vehicle"}
        </h1>
        <form
          onSubmit={handleAddVehicle}
          className="flex flex-row gap-5 flex-wrap w-full mt-9"
        >
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Vehicle No</label>
            <input
              value={vehicleNo}
              className="p-2 cus-tool-form"
              type="text"
              onChange={(e) => setVehicleNo(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Driver / WEXPin</label>
            <input
              value={driverWEXPin}
              className="p-2 cus-tool-form"
              type="text"
              onChange={(e) => setDriverWEXPin(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Email (required)</label>
            <input
              value={email}
              className="p-2 cus-tool-form"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">inspection ID</label>
            <input
              type="text"
              value={inspectionId}
              className="p-2 cus-tool-form"
              onChange={(e) => setInspectionId(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Vin No</label>
            <input
              type="text"
              value={vinNo}
              className="p-2 cus-tool-form"
              onChange={(e) => setVinNo(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Status</label>
            <Select
              options={[
                { label: "Active", value: "Active" },
                { label: "Inactive", value: "Inactive" },
              ]}
              onChange={(e) => setStatus(e)}
              value={status}
              className="employee-names"
            />
          </div>
          {/* <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Employee</label>
            <Select
              options={techAssignOpt}
              onChange={(e) => setEmployee(e)}
              value={employee}
            />
          </div> */}
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Tag Experation</label>
            <input
              className="p-2 cus-tool-form"
              type="text"
              onChange={(e) => setTagExperation(e.target.value)}
              value={tagExperation}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">License Plate</label>
            <input
              className="p-2 cus-tool-form"
              type="text"
              onChange={(e) => setLicensePlate(e.target.value)}
              value={licensePlate}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Make / Model</label>
            <input
              className="p-2 cus-tool-form"
              type="text"
              onChange={(e) => setMakeModel(e.target.value)}
              value={makeModel}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Color</label>
            <input
              className="p-2 cus-tool-form"
              type="text"
              onChange={(e) => setColor(e.target.value)}
              value={color}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Year</label>
            <input
              className="p-2 cus-tool-form"
              type="text"
              onChange={(e) => setYear(e.target.value)}
              value={year}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">TX Tag</label>
            <Select
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
              type="text"
              onChange={(value) => setTxTag(value)}
              value={txTag}
              className="employee-names"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Gas Card</label>
            <Select
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
              type="text"
              onChange={(value) => setGasCard(value)}
              value={gasCard}
              className="employee-names"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Gas Card Last</label>
            <input
              className="p-2 cus-tool-form"
              type="text"
              onChange={(e) => setGasCardLast(e.target.value)}
              value={gasCardLast}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Card No</label>
            <input
              className="p-2 cus-tool-form"
              type="text"
              onChange={(e) => setCardNo(e.target.value)}
              value={cardNo}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Tracking Installed</label>
            <Select
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
              type="text"
              onChange={(value) => setTrackingInstalled(value)}
              value={trackingInstalled}
              className="employee-names"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Geo Tab</label>
            <input
              className="p-2 cus-tool-form"
              type="text"
              onChange={(e) => setGeoTab(e.target.value)}
              value={geoTab}
            />
          </div>
          <div className="flex flex-row justify-end w-full mt-10">
            <input
              className="p-3 bg-orange-400 text-white font-semibold rounded-xl"
              type="submit"
              value={edit ? "Edit Tools Track" : "Add Tools Track"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default VehicleDrawer;
