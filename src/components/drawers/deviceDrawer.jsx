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
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
import Image from "next/image";
import moment from "moment";

const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function DeviceDrawer({
  open,
  onClose,
  addDevice,
  editDevice,
  id,
  edit,
  data,
}) {
  const [category, setCategory] = useState("");
  const [billingAccount, setBillingAccount] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [username, setUsername] = useState("");
  const [categoryOpt, setCategoryOpt] = useState("");
  const [make, setMake] = useState("");
  const [upgradeDate, setUpgradeDate] = useState("");
  const [usageLastMonth, setUsageLastMonth] = useState("");
  useEffect(() => {
    axios
      .get(`${apiPath.prodPath}/api/deviceCategory`)
      .then((res) => {
        setCategoryOpt(
          res.data.deviceCategory.map((i) => ({ label: i.name, value: i.name }))
        );
      })
      .catch((err) => console.log(err));
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
      setCategory({ label: data.category, value: data.category });
      setBillingAccount(data.billingAccount);
      setPhoneNo(data.phoneNo);
      setUsername(data.username);
      setMake(data.make);
      setUpgradeDate(data.upgradeDate);
      setUsageLastMonth(data.usageLastMonth);
    }
  }, []);
  function validatePhoneNumber(input_str) {
    const re = /^[0-9-]+$/;
    return re.test(input_str);
  }
  const validatePhone = (phone) => {
    const flagPhone = validatePhoneNumber(phone);
    if (flagPhone) {
      setPhoneNo(phone);
    }
  };
  const handleAddDevice = (e) => {
    e.preventDefault();
    const dataObj = {
      category: category.value,
      billingAccount,
      phoneNo,
      username,
      make,
      upgradeDate: upgradeDate == undefined ? "" : upgradeDate,
      usageLastMonth,
    };
    if (edit) {
      editDevice(dataObj, id);
    } else {
      addDevice(dataObj);
      dataEntryRefresh();
    }
  };
  const dataEntryRefresh = () => {
    setCategory("");
    setBillingAccount("");
    setPhoneNo("");
    setUsername("");
    setMake("");
    setUpgradeDate("");
    setUsageLastMonth("");
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
          </span>{" "}
          {edit ? "Edit Devices" : "Add Devices"}
        </h1>
        <form
          onSubmit={handleAddDevice}
          className="flex flex-row gap-5 flex-wrap w-full mt-9"
        >
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Category</label>
            <Select
              options={categoryOpt}
              onChange={categoryHandler}
              id="example-select-1"
              value={category}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Billing Account</label>
            <input
              value={billingAccount}
              className="p-2 cus-tool-form"
              type="text"
              onChange={(e) => setBillingAccount(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Phone No</label>
            <input
              type="text"
              value={phoneNo}
              className="p-2 cus-tool-form"
              onChange={(e) => validatePhone(e.target.value)}
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
            <label className="font-semibold">Username</label>
            <input
              className="p-2 cus-tool-form"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Make/Model</label>
            <input
              className="p-2 cus-tool-form"
              type="text"
              onChange={(e) => setMake(e.target.value)}
              value={make}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Upgrade Date</label>
            {/* <DatePicker
              id="datePicker-1"
              value={upgradeDate}
              onChange={(value) => setUpgradeDate(value)}
              locale={"en-US"}
            />
            {upgradeDate !== "" ? (
              <p onClick={() => setUpgradeDate("")} className="clear-value">
                Clear
              </p>
            ) : null} */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  onClick={() => console.log("clicked")}
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !upgradeDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {upgradeDate ? (
                    moment(upgradeDate).format("MM-DD-YYYY")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 cus-calendar">
                <Calendar
                  mode="single"
                  selected={upgradeDate}
                  onSelect={(date) => setUpgradeDate(date)}
                />
              </PopoverContent>
            </Popover>
            {upgradeDate !== "" ? (
              <p onClick={() => setUpgradeDate("")} className="clear-value">
                Clear
              </p>
            ) : null}
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Usage Last Month</label>
            <input
              className="p-2 cus-tool-form"
              type="text"
              onChange={(e) => setUsageLastMonth(e.target.value)}
              value={usageLastMonth}
            />
          </div>
          <div className="flex flex-row justify-end w-full mt-10">
            <input
              className="p-3 bg-orange-400 text-white font-semibold rounded-xl"
              type="submit"
              value={edit ? "Edit Device" : "Add Device"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default DeviceDrawer;
