import { Drawer } from "@mui/material";
import React, { useState, useEffect } from "react";
// import { DatePicker } from "react-rainbow-components";
import "./style.scss";
// import { useSelector } from "react-redux";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
import Swal from "sweetalert2";
import Image from "next/image";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import moment from "moment";
import useStore from "@/utils/store/store";

function ToolsDrawer({ open, onClose, addTool, editTool, id, edit, data }) {
  const currentUser = useStore((state) => state.user);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [techAssigned, setTechAssigned] = useState({
    label: "SHOP",
    value: "SHOP",
  });
  const [location, setLocation] = useState("Shop");
  const [categoryOpt, setCategoryOpt] = useState("");
  // const [allSubCatOpt, setAllSubCatOpt] = useState("");
  const [techAssignOpt, setTechAssignOpt] = useState("");
  const [subCatOpt, setSubCatOpt] = useState("");
  const [filteredCatOpt, setFilteredCatOpt] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [employee, setEmployee] = useState("");
  const [project, setProject] = useState("Shop");
  const [lastPurchasePrice, setLastPurchasePrice] = useState("");
  const [pictureUpload, setPictureUpload] = useState("");
  const [toolNumber, setToolNumber] = useState("");
  const [serial, setSerial] = useState("");
  const [newFileFlag, setNewFileFlag] = useState(false);
  const [oldFile, setOldFile] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [warrantyExpDate, setWarrantyExpDate] = useState("");
  const [brandOpt, setBrandOpt] = useState([]);
  const [brand, setBrand] = useState([]);
  const [status, setStatus] = useState({ label: "Active", value: "Active" });
  useEffect(() => {
    axios
      .get(`${apiPath.prodPath}/api/toolCategory/`)
      .then((res) => {
        const mapped = res.data.toolCategory.map((i) => ({
          label: i.name,
          value: i.name,
        }));
        const filteredMap = mapped.filter((i) => i.label !== "");
        setCategoryOpt(
          filteredMap.sort((a, b) => a.label.localeCompare(b.label))
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/brand/`)
      .then((res) => {
        const mapped = res.data.brands.map((i) => ({
          label: i.name,
          value: i.name,
        }));
        const filteredMap = mapped.filter((i) => i.label !== "");
        setBrandOpt(filteredMap.sort((a, b) => a.label.localeCompare(b.label)));
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/subtoolCategory/`)
      .then((res) => {
        if (edit) {
          const dataObj =
            res.data &&
            res.data.subtoolCategorys &&
            res.data.subtoolCategorys
              .map((i) => ({
                label: i.name,
                value: i.name,
                parentCategory: i.parentCategory,
              }))
              .sort((a, b) => a.label.localeCompare(b.label))
              .filter((i) => i.parentCategory == data.category);
          setFilteredCatOpt(dataObj);
        } else {
          const data =
            res.data &&
            res.data.subtoolCategorys &&
            res.data.subtoolCategorys
              .map((i) => ({
                label: i.name,
                value: i.name,
                parentCategory: i.parentCategory,
              }))
              .sort((a, b) => a.label.localeCompare(b.label));
          setSubCatOpt(data);
        }
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/users/`)
      .then((res) => {
        setTechAssignOpt(
          res.data.allUsers
            .map((i) => ({
              label: i.fullname,
              value: i.fullname,
            }))
            .sort((a, b) => a.label.localeCompare(b.label))
          // .filter((i) => i.userType == "foreman")
        );
      })
      .catch((err) => console.log(err));
    setEmployee({
      label:
        currentUser !== null &&
        currentUser.fullname !== undefined &&
        currentUser.fullname,
      value:
        currentUser !== null &&
        currentUser.fullname !== undefined &&
        currentUser.fullname,
    });
    if (edit) {
      console.log("data data", data);
      setCategory({ label: data.category, value: data.category });
      setDescription(data.description);
      setStatus({ label: data.status, value: data.status });
      setTechAssigned({ label: data.techAssigned, value: data.techAssigned });
      setLocation(data.location);
      setSubCategory({ label: data.subCategory, value: data.subCategory });
      setEmployee({ label: data.employee, value: data.employee });
      setProject(data.project);
      setPictureUpload(data.picture !== undefined ? data.picture : undefined);
      setOldFile(data.picture !== undefined ? data.picture : undefined);
      setToolNumber(data.toolNumber);
      setBrand({ label: data.brand, value: data.brand });
      setPurchaseDate(
        data.purchaseDate == undefined || data.purchaseDate == "undefined"
          ? ""
          : data.purchaseDate
      );
      setWarrantyExpDate(
        data.warrantyExpDate == undefined || data.warrantyExpDate == "undefined"
          ? ""
          : data.warrantyExpDate
      );
      setSerial(data.serial);
      setLastPurchasePrice(data.lastPurchasePrice);
    }
  }, [open]);
  const handleAddTool = (e) => {
    e.preventDefault();
    if (pictureUpload == "" || pictureUpload == undefined) {
      Swal.fire({
        icon: "warning",
        text: "Are you sure you want to save without a picture?",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        showCancelButton: true,
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          if (edit) {
            const formData = new FormData();
            formData.append("toolNumber", toolNumber);
            formData.append("category", category.value);
            formData.append("description", description);
            formData.append("techAssigned", techAssigned.value);
            formData.append("location", location);
            formData.append("subCategory", subCategory.value);
            formData.append("employee", employee.value);
            formData.append("project", project);
            formData.append("lastPurchasePrice", lastPurchasePrice);
            formData.append("purchaseDate", purchaseDate);
            formData.append("warrantyExpDate", warrantyExpDate);
            formData.append("status", status.value);
            formData.append("brand", brand.value);
            formData.append("editFlag", "true");
            if (newFileFlag) {
              formData.append("files", pictureUpload);
              formData.append(
                "oldFiles",
                oldFile == undefined ? undefined : JSON.stringify(oldFile)
              );
            } else {
              formData.append(
                "pictureObj",
                pictureUpload == undefined
                  ? undefined
                  : JSON.stringify(pictureUpload)
              );
            }
            formData.append("serial", serial);
            formData.append("newFileFlag", newFileFlag);
            editTool(formData, id);
          } else {
            const formData = new FormData();
            formData.append("toolNumber", toolNumber);
            formData.append("category", category.value);
            formData.append("description", description);
            formData.append("status", status.value);
            formData.append("techAssigned", techAssigned.value);
            formData.append("location", location);
            formData.append("subCategory", subCategory.value);
            formData.append("employee", employee.value);
            formData.append("brand", brand.value);
            formData.append("project", project);
            formData.append("lastPurchasePrice", lastPurchasePrice);
            formData.append("purchaseDate", purchaseDate);
            formData.append("warrantyExpDate", warrantyExpDate);
            formData.append("files", pictureUpload);
            formData.append("serial", serial);
            formData.append("newFileFlag", newFileFlag);
            addTool(formData, dataEntryRefresh);
          }
        }
      });
    } else {
      if (edit) {
        const formData = new FormData();
        formData.append("toolNumber", toolNumber);
        formData.append("category", category.value);
        formData.append("description", description);
        formData.append("techAssigned", techAssigned.value);
        formData.append("status", status.value);
        formData.append("location", location);
        formData.append("subCategory", subCategory.value);
        formData.append("employee", employee.value);
        formData.append("brand", brand.value);
        formData.append("project", project);
        formData.append("lastPurchasePrice", lastPurchasePrice);
        formData.append("warrantyExpDate", warrantyExpDate);
        formData.append("purchaseDate", purchaseDate);
        formData.append("editFlag", "true");
        if (newFileFlag) {
          formData.append("files", pictureUpload);
          formData.append(
            "oldFiles",
            oldFile == undefined ? undefined : JSON.stringify(oldFile)
          );
        } else {
          formData.append(
            "pictureObj",
            pictureUpload == undefined
              ? undefined
              : JSON.stringify(pictureUpload)
          );
        }
        formData.append("serial", serial);
        formData.append("newFileFlag", newFileFlag);
        editTool(formData, id);
      } else {
        const formData = new FormData();
        formData.append("toolNumber", toolNumber);
        formData.append("category", category.value);
        formData.append("description", description);
        formData.append("techAssigned", techAssigned.value);
        formData.append("location", location);
        formData.append("subCategory", subCategory.value);
        formData.append("employee", employee.value);
        formData.append("brand", brand.value);
        formData.append("project", project);
        formData.append("lastPurchasePrice", lastPurchasePrice);
        formData.append("purchaseDate", purchaseDate);
        formData.append("warrantyExpDate", warrantyExpDate);
        formData.append("files", pictureUpload);
        formData.append("serial", serial);
        formData.append("status", status.value);
        formData.append("newFileFlag", newFileFlag);
        addTool(formData, dataEntryRefresh);
      }
    }
  };
  const dataEntryRefresh = () => {
    setCategory("");
    setDescription("");
    setTechAssigned("");
    setLocation("");
    setEmployee("");
    setLastPurchasePrice("");
    setSubCategory("");
    setPictureUpload("");
    setToolNumber("");
    setProject("");
    setSerial("");
    setPurchaseDate("");
    setWarrantyExpDate("");
    setBrand("");
    setStatus("");
  };
  const categoryHandler = (e) => {
    setSubCategory("");
    setCategory(e);
    axios
      .get(`${apiPath.prodPath}/api/subtoolCategory/`)
      .then((res) => {
        const dataObj =
          res.data &&
          res.data.subtoolCategorys &&
          res.data.subtoolCategorys
            .map((i) => ({
              label: i.name,
              value: i.name,
              parentCategory: i.parentCategory,
            }))
            .sort((a, b) => a.label.localeCompare(b.label));
        let filteredSubOpt;

        filteredSubOpt = dataObj.filter((i) => i.parentCategory == e.value);
        setFilteredCatOpt(filteredSubOpt);
        // setSubCatOpt(data);
      })
      .catch((err) => console.log(err));
  };
  const techAssignedHandler = (e) => {
    setTechAssigned(e);
  };
  const handleUpload = (e) => {
    if (edit) {
      setNewFileFlag(true);
      setPictureUpload(e.target.files[0]);
    } else {
      setPictureUpload(e.target.files[0]);
    }
  };
  const handleDigitCheck = (e) => {
    if (e.target.value.length <= 6) {
      setToolNumber(e.target.value);
    }
  };
  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={onClose}
      className="tools-drawer"
    >
      <div className="w-full flex flex-col p-10">
        <h1 className="flex flex-row gap-x-3 font-bold text-2xl">
          <span
            onClick={() => onClose()}
            className="flex flex-col justify-center align-middle"
          >
            <Image src={"/back.png"} width={12} height={21} alt="Back" />
          </span>{" "}
          {edit ? "Edit Tool" : "Add A Tool"}
        </h1>
        <form
          className="flex flex-row gap-5 flex-wrap w-full mt-9"
          onSubmit={handleAddTool}
        >
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Tool #</label>
            <input
              value={toolNumber}
              className="p-2 cus-tool-form"
              type="number"
              onChange={handleDigitCheck}
              required={true}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Category</label>
            <Select
              options={categoryOpt}
              onChange={categoryHandler}
              id="tool-select-1"
              value={category}
              required={true}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Tools</label>
            <Select
              id="tool-select-2"
              options={filteredCatOpt}
              onChange={(e) => setSubCategory(e)}
              value={subCategory}
              required={true}
              isDisabled={category.value == undefined ? true : false}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Brand</label>
            <Select
              id="tool-select-2"
              options={brandOpt}
              onChange={(e) => setBrand(e)}
              value={brand}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Description</label>
            <input
              value={description}
              className="p-2 cus-tool-form"
              type="text"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Tech Assigned</label>
            <Select
              options={techAssignOpt}
              onChange={techAssignedHandler}
              id="tool-select-3"
              value={techAssigned}
              required={true}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Location</label>
            <input
              value={location}
              className="p-2 cus-tool-form"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Employee</label>
            <Select
              options={techAssignOpt}
              onChange={(e) => setEmployee(e)}
              value={employee}
              isDisabled={true}
              id="tool-select-4"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Status</label>
            <Select
              options={[
                { label: "Active", value: "Active" },
                { label: "Inactive-Broken", value: "Inactive-Broken" },
              ]}
              onChange={(e) => setStatus(e)}
              value={status}
              id="tool-select-5"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Projects</label>
            <input
              className="p-2 cus-tool-form"
              type="text"
              onChange={(e) => setProject(e.target.value)}
              value={project}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Serial #</label>
            <input
              className="p-2 cus-tool-form"
              type="text"
              onChange={(e) => setSerial(e.target.value)}
              value={serial}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Purchase Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  onClick={() => console.log("clicked")}
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !purchaseDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {purchaseDate ? (
                    moment(purchaseDate).format("MM-DD-YYYY")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 cus-calendar">
                <Calendar
                  mode="single"
                  selected={purchaseDate}
                  onSelect={(date) => setPurchaseDate(date)}
                />
              </PopoverContent>
            </Popover>
            {purchaseDate !== "" ? (
              <p onClick={() => setPurchaseDate("")} className="clear-value">
                Clear
              </p>
            ) : null}
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Last Purchase Price</label>
            <input
              className="p-2 cus-tool-form"
              type="number"
              onChange={(e) => setLastPurchasePrice(e.target.value)}
              value={lastPurchasePrice}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Warranty Exp Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  onClick={() => console.log("clicked")}
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !warrantyExpDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {warrantyExpDate ? (
                    moment(warrantyExpDate).format("MM-DD-YYYY")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 cus-calendar">
                <Calendar
                  mode="single"
                  selected={warrantyExpDate}
                  onSelect={(date) => setWarrantyExpDate(date)}
                />
              </PopoverContent>
            </Popover>
            {warrantyExpDate !== "" ? (
              <p onClick={() => setWarrantyExpDate("")} className="clear-value">
                Clear
              </p>
            ) : null}
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Picture</label>
            <input
              name="files"
              className="p-2 cus-tool-form"
              type="file"
              onChange={handleUpload}
              accept="image/png,image/jpeg"
            />
            {edit && pictureUpload !== undefined ? (
              <img
                src={pictureUpload.fileUrl}
                style={{ width: "30%" }}
                alt="loading..."
              />
            ) : null}
          </div>
          <div className="flex flex-row justify-end w-full mt-10">
            <input
              className="p-3 bg-orange-400 text-white font-semibold rounded-xl"
              type="submit"
              value={edit ? "Edit Tools" : "Add Tools"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default ToolsDrawer;
