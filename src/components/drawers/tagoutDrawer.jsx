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
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
import "./style.scss";
import moment from "moment";
import Image from "next/image";
function TagoutDrawer({
  open,
  onClose,
  addTagout,
  editTagout,
  id,
  edit,
  editData,
  loggedInUser,
}) {
  const [formData, setFormData] = useState({
    currentDate: new Date(),
    user: loggedInUser.fullname,
    tagNumber: "",
    equipmentName: "",
    equipmentLocation: "",
    name: "",
    phone: "",
    dateApplied: "",
    releasedDate: "",
    releasedInitials: "",
  });
  useEffect(() => {
    if (edit) {
      setFormData({
        currentDate: editData.currentDate,
        user: editData.user,
        tagNumber: editData.tagNumber,
        equipmentName: editData.equipmentName,
        equipmentLocation: editData.equipmentLocation,
        name: editData.name,
        phone: editData.phone,
        dateApplied: editData.dateApplied,
        releasedDate: editData.releasedDate,
        releasedInitials: editData.releasedInitials,
      });
    }
  }, []);
  const handleAddTagout = (e) => {
    e.preventDefault();

    if (edit) {
      editTagout(formData, id);
    } else {
      addTagout(formData);
      dataEntryRefresh();
    }
  };
  const dataEntryRefresh = () => {
    setFormData({
      currentDate: new Date(),
      user: loggedInUser.fullname,
      tagNumber: "",
      equipmentName: "",
      equipmentLocation: "",
      name: "",
      phone: "",
      dateApplied: "",
      releasedDate: "",
      releasedInitials: "",
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
          {edit ? "Edit Tagout" : "Add Tagout"}
        </h1>
        <form
          onSubmit={handleAddTagout}
          className="flex flex-row gap-5 flex-wrap w-full mt-9"
        >
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Current Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  onClick={() => console.log("clicked")}
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !formData.currentDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.currentDate ? (
                    moment(formData.currentDate).format("MM-DD-YYYY")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 cus-calendar">
                <Calendar
                  mode="single"
                  selected={formData.currentDate}
                  disabled={true}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">User</label>
            <input
              className="p-2 cus-tool-form"
              name="user"
              value={formData.user}
              disabled={true}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Tag Number</label>
            <input
              name="tagNumber"
              value={formData.tagNumber}
              onChange={handleTextData}
              className="p-2 cus-tool-form"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Equipment Name</label>
            <input
              name="equipmentName"
              value={formData.equipmentName}
              onChange={handleTextData}
              className="p-2 cus-tool-form"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Equipment Location</label>
            <input
              name="equipmentLocation"
              value={formData.equipmentLocation}
              onChange={handleTextData}
              className="p-2 cus-tool-form"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleTextData}
              className="p-2 cus-tool-form"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleTextData}
              className="p-2 cus-tool-form"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Date Applied</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  onClick={() => console.log("clicked")}
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !formData.dateApplied && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.dateApplied ? (
                    moment(formData.dateApplied).format("MM-DD-YYYY")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 cus-calendar">
                <Calendar
                  mode="single"
                  selected={formData.dateApplied}
                  onSelect={(date) =>
                    setFormData((prev) => {
                      return {
                        ...prev,
                        dateApplied: date,
                      };
                    })
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Date Released</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  onClick={() => console.log("clicked")}
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !formData.releasedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.releasedDate ? (
                    moment(formData.releasedDate).format("MM-DD-YYYY")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 cus-calendar">
                <Calendar
                  mode="single"
                  selected={formData.releasedDate}
                  onSelect={(date) =>
                    setFormData((prev) => {
                      return {
                        ...prev,
                        releasedDate: date,
                      };
                    })
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Released Initials</label>
            <input
              name="releasedInitials"
              value={formData.releasedInitials}
              onChange={handleTextData}
              className="p-2 cus-tool-form"
            />
          </div>
          <div className="flex flex-row justify-end w-full mt-10">
            <input
              className="p-3 bg-orange-400 text-white font-semibold rounded-xl"
              type="submit"
              value={edit ? "Edit Tagout" : "Add Tagout"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default TagoutDrawer;
