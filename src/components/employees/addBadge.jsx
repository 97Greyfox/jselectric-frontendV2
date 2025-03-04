import React, { useState, useEffect, use } from "react";
// import { Select, DatePicker } from "react-rainbow-components";
import Select from "react-select";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Poppins } from "next/font/google";
import moment from "moment";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});

function AddBadge({ addBadgeFunc, editFlag, dataToBeEdited }) {
  const [AISD, setAISD] = useState({ label: "", value: "" });
  const [AISDExpDate, setAISDExpDate] = useState("");
  const [COAWaterDep, setCOAWaterDep] = useState({ label: "", value: "" });
  const [COAWaterDepExpDate, setCOAWaterDepExpDate] = useState("");
  const [TFC, setTFC] = useState({ label: "", value: "" });
  const [TFCExpDate, setTFCExpDate] = useState("");
  const [ABIA, setABIA] = useState({ label: "", value: "" });
  const [ABIAExpDate, setABIAExpDate] = useState("");
  const dropdownOpt = [
    { label: "", value: "" },
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];
  useEffect(() => {
    if (editFlag) {
      setAISD({ label: dataToBeEdited.AISD, value: dataToBeEdited.AISD });
      setAISDExpDate(dataToBeEdited.AISDExpDate);
      setCOAWaterDep({
        label: dataToBeEdited.COAWaterDep,
        value: dataToBeEdited.COAWaterDep,
      });
      setCOAWaterDepExpDate(dataToBeEdited.COAWaterDepExpDate);
      setTFC({ label: dataToBeEdited.TFC, value: dataToBeEdited.TFC });
      setTFCExpDate(dataToBeEdited.TFCExpDate);
      setABIA({ label: dataToBeEdited.ABIA, value: dataToBeEdited.ABIA });
      setABIAExpDate(dataToBeEdited.ABIAExpDate);
    }
  }, []);
  const addBadge = (e) => {
    e.preventDefault();
    const data = {
      AISD: AISD.value,
      AISDExpDate: AISDExpDate == undefined ? "" : AISDExpDate,
      COAWaterDep: COAWaterDep.value,
      COAWaterDepExpDate:
        COAWaterDepExpDate == undefined ? "" : COAWaterDepExpDate,
      TFC: TFC.value,
      TFCExpDate: TFCExpDate == undefined ? "" : TFCExpDate,
      ABIA: ABIA.value,
      ABIAExpDate: ABIAExpDate == undefined ? "" : ABIAExpDate,
    };
    addBadgeFunc(data, editFlag);
    setDefaultValues();
  };
  const setDefaultValues = () => {
    setAISD("");
    setAISDExpDate("");
    setCOAWaterDep("");
    setCOAWaterDepExpDate("");
    setTFC("");
    setTFCExpDate("");
    setABIA("");
    setABIAExpDate("");
  };
  return (
    <form
      onSubmit={addBadge}
      className={`flex flex-row gap-5 flex-wrap w-full mt-9`}
    >
      <div className="flex flex-col w-1/5 gap-2">
        <label className="font-semibold">AISD</label>
        <Select
          options={dropdownOpt}
          onChange={(e) => setAISD(e)}
          id="example-select-1"
          value={AISD}
        />
      </div>
      <div className="flex flex-col w-1/5 gap-2">
        <label className="font-semibold">AISD Exp Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              onClick={() => console.log("clicked")}
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !AISDExpDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {AISDExpDate ? (
                moment(AISDExpDate).format("MM-DD-YYYY")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 cus-calendar">
            <Calendar
              mode="single"
              selected={AISDExpDate}
              onSelect={(date) => setAISDExpDate(date)}
            />
          </PopoverContent>
        </Popover>
        {AISDExpDate !== "" ? (
          <p onClick={() => setAISDExpDate("")} className="clear-value">
            Clear
          </p>
        ) : null}
      </div>
      <div className="flex flex-col w-1/5 gap-2">
        <label className="font-semibold">COA Water Dept</label>
        <Select
          options={dropdownOpt}
          onChange={(e) => setCOAWaterDep(e)}
          id="example-select-2"
          value={COAWaterDep}
        />
      </div>
      <div className="flex flex-col w-1/5 gap-2">
        <label className="font-semibold">COA Water Exp Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              onClick={() => console.log("clicked")}
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !COAWaterDepExpDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {COAWaterDepExpDate ? (
                moment(COAWaterDepExpDate).format("MM-DD-YYYY")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 cus-calendar">
            <Calendar
              mode="single"
              selected={COAWaterDepExpDate}
              onSelect={(date) => setCOAWaterDepExpDate(date)}
            />
          </PopoverContent>
        </Popover>
        {COAWaterDepExpDate !== "" ? (
          <p onClick={() => setCOAWaterDepExpDate("")} className="clear-value">
            Clear
          </p>
        ) : null}
      </div>
      <div className="flex flex-col w-1/5 gap-2">
        <label className="font-semibold">TFC</label>
        <Select
          options={dropdownOpt}
          onChange={(e) => setTFC(e)}
          id="example-select-3"
          value={TFC}
        />
      </div>
      <div className="flex flex-col w-1/5 gap-2">
        <label className="font-semibold">TFC Exp Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              onClick={() => console.log("clicked")}
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !TFCExpDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {TFCExpDate ? (
                moment(TFCExpDate).format("MM-DD-YYYY")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 cus-calendar">
            <Calendar
              mode="single"
              selected={TFCExpDate}
              onSelect={(date) => setTFCExpDate(date)}
            />
          </PopoverContent>
        </Popover>
        {TFCExpDate !== "" ? (
          <p onClick={() => setTFCExpDate("")} className="clear-value">
            Clear
          </p>
        ) : null}
      </div>
      <div className="flex flex-col w-1/5 gap-2">
        <label className="font-semibold">ABIA</label>
        <Select
          options={dropdownOpt}
          onChange={(e) => setABIA(e)}
          id="example-select-5"
          value={ABIA}
        />
      </div>
      <div className="flex flex-col w-1/5 gap-2">
        <label className="font-semibold">ABIA Exp Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              onClick={() => console.log("clicked")}
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !ABIAExpDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {ABIAExpDate ? (
                moment(ABIAExpDate).format("MM-DD-YYYY")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 cus-calendar">
            <Calendar
              mode="single"
              selected={ABIAExpDate}
              onSelect={(date) => setABIAExpDate(date)}
            />
          </PopoverContent>
        </Popover>
        {ABIAExpDate !== "" ? (
          <p onClick={() => setABIAExpDate("")} className="clear-value">
            Clear
          </p>
        ) : null}
      </div>
      <div className="flex flex-row w-full justify-end">
        <input
          type="submit"
          value={"Save"}
          className="p-2 bg-orange-400 text-white font-semibold rounded-xl hover:cursor-pointer"
        />
      </div>
    </form>
  );
}

export default AddBadge;
