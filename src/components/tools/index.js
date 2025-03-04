"use client";
import Select from "react-select";
import React, { useState, useEffect } from "react";
import "./tools.scss";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import ToolsTable from "../tables/toolTables";
import ToolsDrawer from "../drawers/toolsAdd";
import * as XLSX from "xlsx";
import moment from "moment";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const filterOpt = [
  { label: "Serial No", value: "serialNo" },
  { label: "Tool No", value: "toolNo" },
  { label: "Description", value: "description" },
  { label: "Tech Assigned", value: "techAssigned" },
  { label: "Location", value: "location" },
];
function Tools() {
  const [search, setSearch] = useState("");
  const [searchFilter, setSearchFilter] = useState({
    label: "Serial No",
    value: "serialNo",
  });
  const [allTools, setAllTools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/tools/`)
      .then((res) => {
        setAllTools(res.data.allTools.filter((i) => i.status == "Active"));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  const handleFilters = (e) => {
    e.preventDefault();
    setLoading(true);
    if (search == "") {
      return false;
    }
    axios
      .get(`${apiPath.prodPath}/api/tools/${search}&&${searchFilter.value}`)
      .then((res) => {
        setAllTools(res.data.allTools);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const generateReport = () => {
    var mappedData = [];
    allTools.forEach((i) => {
      if (i.history.length) {
        mappedData = [
          {
            tool: i.toolNumber,
            category: i.category,
            subCategory: i.subCategory,
            description: i.description,
            techAssigned: i.techAssigned,
            checkedOut: i.history[i.history.length - 1].checkedOut,
            assignedOnDate: i.history[i.history.length - 1].date,
            dueDate: moment(
              addDays(
                new Date(i.history[i.history.length - 1].date),
                i.history[i.history.length - 1].checkedOut
              )
            ).format("MM-DD-YYYY"),
          },
          ...mappedData,
        ];
      }
    });
    console.log("this is mapped data", mappedData);
    try {
      setLoadingFile(true);
      // Create Excel workbook and worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils?.json_to_sheet(mappedData);
      XLSX.utils.book_append_sheet(workbook, worksheet, "tool track report");
      // Save the workbook as an Excel file
      XLSX.writeFile(workbook, `toolTrackReport.xlsx`);
      console.log(`Exported data to toolTrackReport.xlsx`);
      setLoadingFile(false);
    } catch (error) {
      setLoadingFile(false);
      console.log("#==================Export Error", error.message);
    }
  };
  function addDays(date, days) {
    if (days == "" || days == undefined || days == "undefined") {
      return "";
    } else {
      const newDate = new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
      return newDate;
    }
  }
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/tools/`)
      .then((res) => {
        setAllTools(res.data.allTools.filter((i) => i.status == "Active"));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleActive = (status) => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/tools/`)
      .then((res) => {
        setAllTools(res.data.allTools.filter((i) => i.status == status));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleCloseDrawer = () => {
    setDrawer(!drawer);
  };
  const addTool = (data, cb = null) => {
    axios
      .post(`${apiPath.prodPath}/api/tools/addTools`, data)
      .then((res) => {
        if (res.data && res.data.error) {
          Swal.fire({
            icon: "error",
            text: `${res.data.message}`,
          });
        } else {
          handleCloseDrawer();
          refreshData();
          cb();
        }
      })
      .catch((err) => console.log(err));
  };
  const handleClear = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/tools/`)
      .then((res) => {
        setLoading(false);
        setSearch("");
        setAllTools(res.data.allTools.filter((i) => i.status == "Active"));
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <>
      <h2 className={`font-semibold text-2xl pt-2 pb-2`}>Tools</h2>
      <form onSubmit={handleFilters} className="w-1/3 flex flex-col">
        <Select
          options={filterOpt}
          value={searchFilter}
          onChange={(e) => {
            setSearchFilter(e);
          }}
          id="tool-select-cus"
        />
        <div className="flex flex-row gap-5">
          {searchFilter == "" ? null : (
            <input
              type="text"
              className="p-2 mt-3 w-2/3 cus-filter-inp"
              placeholder={
                searchFilter.value == "serialNo"
                  ? "Serial No"
                  : searchFilter.value == "toolNo"
                  ? "By Tool No"
                  : searchFilter.value == "description"
                  ? "By Description"
                  : searchFilter.value == "techAssigned"
                  ? "By Tech Assigned"
                  : "By Location"
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          )}
          {searchFilter == "" ? null : (
            <input
              type="submit"
              className="p-2 mt-3 w-1/3 bg-orange-400 cus-search-btn"
              value={"Search"}
            />
          )}
          {searchFilter == "" ? null : (
            <Button
              onClick={() => handleClear()}
              className="p-2 mt-3 bg-orange-400 text-white"
            >
              Clear
            </Button>
          )}
        </div>
      </form>
      <div className="w-full flex flex-row justify-end gap-5">
        <button
          className="p-2 font-medium bg-orange-400 rounded-xl text-white"
          onClick={() => setDrawer(true)}
        >
          + Add Tools
        </button>
        <button
          onClick={() => generateReport()}
          className="p-2 font-medium bg-orange-400 rounded-xl text-white"
        >
          {loadingFile ? "Processing..." : "Generate Report"}
        </button>
      </div>
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="bg-transparent">
          <TabsTrigger
            onClick={() => handleActive("Active")}
            value="active"
            className="bg-transparent"
          >
            Active
          </TabsTrigger>
          <TabsTrigger
            onClick={() => handleActive("Inactive-Broken")}
            value="inactive"
            className="bg-transparent"
          >
            Inactive
          </TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          {loading ? (
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[300px] w-[500px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ) : (
            <ToolsTable
              allTools={allTools}
              active={true}
              refreshData={refreshData}
            />
          )}
        </TabsContent>
        <TabsContent value="inactive">
          {loading ? (
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[300px] w-[500px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ) : (
            <ToolsTable
              allTools={allTools}
              active={false}
              refreshData={refreshData}
            />
          )}
        </TabsContent>
      </Tabs>
      <ToolsDrawer
        addTool={addTool}
        open={drawer}
        onClose={handleCloseDrawer}
        edit={false}
      />
    </>
  );
}

export default Tools;
