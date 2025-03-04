"use client";
import React, { useState, useEffect } from "react";
import PicklistComp from "./picklistComp";

function Picklist() {
  const [activeLink, setActiveLink] = useState("User Type");

  const handleLinks = (e) => {
    setActiveLink(e.target.innerText);
  };
  return (
    <section className="p-5">
      <h1 className="text-3xl font-semibold">Picklist</h1>
      <div className="flex flex-row w-full bg-white shadow-lg p-5 gap-4 mt-5 rounded-xl">
        <div className="flex flex-col w-1/5">
          <ul onClick={handleLinks} className="flex flex-col gap-4">
            <li
              className={
                activeLink == "User Type"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              User Type
            </li>
            <li
              className={
                activeLink == "Checked Out"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              Checked Out
            </li>
            <li
              className={
                activeLink == "Position"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              Position
            </li>
            <li
              className={
                activeLink == "Building"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              Building
            </li>
            <li
              className={
                activeLink == "Storage Id"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              Storage Id
            </li>
            <li
              className={
                activeLink == "Tool Category"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              Tool Category
            </li>
            <li
              className={
                activeLink == "Tool Sub-Category"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              Tool Sub-Category
            </li>
            <li
              className={
                activeLink == "Device Category"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              Device Category
            </li>
            <li
              className={
                activeLink == "Task Category"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              Task Category
            </li>
            <li
              className={
                activeLink == "Timeout Reason"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              Timeout Reason
            </li>
            <li
              className={
                activeLink == "Task Status"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              Task Status
            </li>
            <li
              className={
                activeLink == "Task Priority"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              Task Priority
            </li>
            <li
              className={
                activeLink == "Notes Status"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              Notes Status
            </li>
            <li
              className={
                activeLink == "Notes Category"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              Notes Category
            </li>
            <li
              className={
                activeLink == "Customer Type"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              Customer Type
            </li>
            <li
              className={
                activeLink == "Customer Term"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              Customer Term
            </li>
            <li
              className={
                activeLink == "Tax Code"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              Tax Code
            </li>
            <li
              className={
                activeLink == "Material Level"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              Material Level
            </li>
            <li
              className={
                activeLink == "Labor Level"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              Labor Level
            </li>
            <li
              className={
                activeLink == "Salesperson Code"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              Salesperson Code
            </li>
            <li
              className={
                activeLink == "Job Type"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              Job Type
            </li>
            <li
              className={
                activeLink == "Job Tag"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              Job Tag
            </li>
            <li
              className={
                activeLink == "Job PM"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              Job PM
            </li>
            <li
              className={
                activeLink == "Brand"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              Brand
            </li>
            <li
              className={
                activeLink == "Job Status"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              Job Status
            </li>
            <li
              className={
                activeLink == "Job Sources"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              Job Sources
            </li>
            <li
              className={
                activeLink == "Job CTM"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              Job CTM
            </li>
            <li
              className={
                activeLink == "Training Category"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              Training Category
            </li>
            <li
              className={
                activeLink == "Overstock Categories"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              Overstock Categories
            </li>
            <li
              className={
                activeLink == "Phase"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              Phase
            </li>
            <li
              className={
                activeLink == "Service Ticket Terms"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              Service Ticket Terms
            </li>
            <li
              className={
                activeLink == "Reimbursal Type"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              Reimbursal Type
            </li>
            <li
              className={
                activeLink == "PO Status"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              PO Status
            </li>
            <li
              className={
                activeLink == "Warnings"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              Warnings
            </li>
            <li
              className={
                activeLink == "Offences"
                  ? "text-orange-400 font-semibold hover:cursor-pointer"
                  : "hover:cursor-pointer"
              }
            >
              Offences
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 w-4/5">
          {activeLink == "User Type" ? (
            <PicklistComp picklistName={"User Type"} />
          ) : null}
          {activeLink == "Brand" ? (
            <PicklistComp picklistName={"Brand"} />
          ) : null}
          {activeLink == "Position" ? (
            <PicklistComp picklistName={"Position"} />
          ) : null}
          {activeLink == "Checked Out" ? (
            <PicklistComp picklistName={"Checked Out"} />
          ) : null}
          {activeLink == "Building" ? (
            <PicklistComp picklistName={"Building"} />
          ) : null}
          {activeLink == "Storage Id" ? (
            <PicklistComp picklistName={"Storage Id"} />
          ) : null}
          {activeLink == "Tool Category" ? (
            <PicklistComp picklistName={"Tool Category"} />
          ) : null}
          {activeLink == "Tool Sub-Category" ? (
            <PicklistComp picklistName={"Tool Sub-Category"} />
          ) : null}
          {activeLink == "Device Category" ? (
            <PicklistComp picklistName={"Device Category"} />
          ) : null}
          {activeLink == "Task Category" ? (
            <PicklistComp picklistName={"Task Category"} />
          ) : null}
          {activeLink == "Timeout Reason" ? (
            <PicklistComp picklistName={"Timeout Reason"} />
          ) : null}
          {activeLink == "Task Status" ? (
            <PicklistComp picklistName={"Task Status"} />
          ) : null}
          {activeLink == "Task Priority" ? (
            <PicklistComp picklistName={"Task Priority"} />
          ) : null}
          {activeLink == "Notes Status" ? (
            <PicklistComp picklistName={"Notes Status"} />
          ) : null}
          {activeLink == "Notes Category" ? (
            <PicklistComp picklistName={"Notes Category"} />
          ) : null}
          {activeLink == "Customer Type" ? (
            <PicklistComp picklistName={"Customer Type"} />
          ) : null}
          {activeLink == "Customer Term" ? (
            <PicklistComp picklistName={"Customer Term"} />
          ) : null}
          {activeLink == "Tax Code" ? (
            <PicklistComp picklistName={"Tax Code"} />
          ) : null}
          {activeLink == "Material Level" ? (
            <PicklistComp picklistName={"Material Level"} />
          ) : null}
          {activeLink == "Labor Level" ? (
            <PicklistComp picklistName={"Labor Level"} />
          ) : null}
          {activeLink == "Salesperson Code" ? (
            <PicklistComp picklistName={"Salesperson Code"} />
          ) : null}
          {activeLink == "Job Type" ? (
            <PicklistComp picklistName={"Job Type"} />
          ) : null}
          {activeLink == "Job Tag" ? (
            <PicklistComp picklistName={"Job Tag"} />
          ) : null}
          {activeLink == "Job PM" ? (
            <PicklistComp picklistName={"Job PM"} />
          ) : null}
          {activeLink == "Job Status" ? (
            <PicklistComp picklistName={"Job Status"} />
          ) : null}
          {activeLink == "Job Sources" ? (
            <PicklistComp picklistName={"Job Sources"} />
          ) : null}
          {activeLink == "Job CTM" ? (
            <PicklistComp picklistName={"Job CTM"} />
          ) : null}
          {activeLink == "PO Status" ? (
            <PicklistComp picklistName={"PO Status"} />
          ) : null}
          {activeLink == "Training Category" ? (
            <PicklistComp picklistName={"Training Category"} />
          ) : null}
          {activeLink == "Overstock Categories" ? (
            <PicklistComp picklistName={"Overstock Categories"} />
          ) : null}
          {activeLink == "Service Ticket Terms" ? (
            <PicklistComp picklistName={"Service Ticket Terms"} />
          ) : null}
          {activeLink == "Warnings" ? (
            <PicklistComp picklistName={"Warnings"} />
          ) : null}
          {activeLink == "Offences" ? (
            <PicklistComp picklistName={"Offences"} />
          ) : null}
          {activeLink == "Phase" ? (
            <PicklistComp picklistName={"Phase"} />
          ) : null}
          {activeLink == "Reimbursal Type" ? (
            <PicklistComp picklistName={"Reimbursal Type"} />
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default Picklist;
