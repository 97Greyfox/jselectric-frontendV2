"use client";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { Poppins } from "next/font/google";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
const poppins = Poppins({
  weight: ["300", "400", "500", "800"],
  style: ["normal"],
  subsets: ["latin"],
});
import * as XLSX from "xlsx";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import "./tools.scss";
import ToolTrackDrawer from "../drawers/toolTrackDrawer";
import { Skeleton } from "@/components/ui/skeleton";

import Select from "react-select";
var columns = [
  { field: "toolNumber", headerName: "Tool Number", width: 100 },
  { field: "techAssigned", headerName: "Tech Assigned", width: 130 },
  { field: "checkedOut", headerName: "Checked Out", width: 130 },
  {
    field: "note",
    headerName: "Notes",
    width: 130,
  },
  {
    field: "job",
    headerName: "Job",
    width: 100,
  },
  {
    field: "user",
    headerName: "Employee",
    width: 130,
  },
  {
    field: "location",
    headerName: "Location",
    width: 100,
  },
  {
    field: "date",
    headerName: "Date",
    width: 100,
  },
  {
    field: "time",
    headerName: "Time",
    width: 100,
  },
];
function ToolTrackComp({ picklistName, userInfo }) {
  const [loading, setLoading] = useState(false);
  const [toolTrack, setToolTrack] = useState([]);
  const [checkboxArr, setCheckboxArr] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const [loader, setLoader] = useState(false);
  const [editFlag, setEditFlag] = useState(false);
  const [editData, setEditData] = useState([]);
  const [searchOpt, setSearchOpt] = useState("");
  const [search, setSearch] = useState("");
  const [allUsersOpt, setAllUserOpt] = useState([]);
  const [user, setUser] = useState([]);
  const viewImage = (file) => {
    window.open(file.fileUrl);
  };
  useEffect(() => {
    getAllTools();
    getAllUsers();
  }, []);
  const getAllTools = async () => {
    setLoader(true);
    await axios
      .get(`${apiPath.prodPath}/api/toolTrack/`)
      .then((res) => {
        // const filteredToolTrack = res.data.toolTracks.filter(
        //   (i) => i.history.length > 0
        // );
        const filteredToolTrack = res.data.toolTracks
          .filter((i) => i.checkedOut !== undefined)
          .filter((i) => i.checkedOut !== "");
        const sortedFilterToolTrack = filteredToolTrack.sort((a, b) =>
          b.date.localeCompare(a.date)
        );
        setToolTrack(sortedFilterToolTrack);
        setLoader(false);
        setEditData([]);
        setEditFlag(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };
  const getAllUsers = async () => {
    await axios
      .get(`${apiPath.prodPath}/api/users/`)
      .then((res) => {
        const mappedUser = res.data.allUsers
          .map((i) => {
            return { label: i.fullname, value: i.fullname };
          })
          .sort((a, b) => a.label.localeCompare(b.label));
        setAllUserOpt(mappedUser);
      })
      .catch((err) => console.log(err));
  };
  const dateCalculator = (dateVal, checkedOut) => {
    var date = new Date(dateVal);
    date.setDate(date.getDate() + Number(checkedOut));
    var finalDate =
      date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear();
    var checkedOutDate = new Date(finalDate);
    var currentDate = new Date();
    var currentDateMS = currentDate.getTime();
    if (checkedOutDate.getTime() < currentDateMS) {
      return true;
    } else {
      return false;
    }
  };
  const refreshData = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/toolTrack/`)
      .then((res) => {
        // const filteredToolTrack = res.data.toolTracks.filter(
        //   (i) => i.history.length > 0
        // );
        const filteredToolTrack = res.data.toolTracks
          .filter((i) => i.checkedOut !== undefined)
          .filter((i) => i.checkedOut !== "");
        const sortedFilterToolTrack = filteredToolTrack.sort((a, b) =>
          b.date.localeCompare(a.date)
        );
        setToolTrack(sortedFilterToolTrack);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const paginationModel = { page: 0, pageSize: 10 };
  // const generateReport = async () => {
  //   const mappedData = history.map((inner) => {
  //     return {
  //       tool: toolsInfo.toolNumber,
  //       category: toolsInfo.category,
  //       subCategory: toolsInfo.subCategory,
  //       description: toolsInfo.description,
  //       techAssigned: toolsInfo.techAssigned,
  //       checkedOut: inner.checkedOut,
  //       assignedOnDate: inner.date,
  //       dueDate: moment(addDays(new Date(inner.date), inner.checkedOut)).format(
  //         "MM-DD-YYYY"
  //       ),
  //     };
  //   });
  //   console.log("this is mapped data", mappedData);
  //   try {
  //     setLoading(true);
  //     // Create Excel workbook and worksheet
  //     const workbook = XLSX.utils.book_new();
  //     const worksheet = XLSX.utils?.json_to_sheet(mappedData);
  //     XLSX.utils.book_append_sheet(workbook, worksheet, "tool track report");
  //     // Save the workbook as an Excel file
  //     XLSX.writeFile(workbook, `toolTrackReport.xlsx`);
  //     console.log(`Exported data to toolTrackReport.xlsx`);
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log("#==================Export Error", error.message);
  //   }
  // };
  // const addDays = (date, days) => {
  //   if (days == "" || days == undefined || days == "undefined") {
  //     return "";
  //   } else {
  //     console.log("#####", date.getDate());
  //     date.setDate(date.getDate() + days);
  //     return date;
  //   }
  // };
  // function addDays(date, days) {
  //   if (days == "" || days == undefined || days == "undefined") {
  //     return "";
  //   } else {
  //     const newDate = new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
  //     return newDate;
  //   }
  // }
  const handleCheckboxes = (value) => {
    setCheckboxArr(value);
  };
  const handleEdit = () => {
    const filteredToolTrack = toolTrack.find((i) => i.id == checkboxArr[0]);
    setEditFlag(true);
    setEditData(filteredToolTrack);
    setDrawer(true);
  };
  const handleDelete = () => {
    const id = checkboxArr[0];
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to delete the record?",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        const filteredData = toolTrack.find((i) => i.id == id);
        const oldFiles = JSON.stringify(filteredData.file);
        const dataObj = { data: oldFiles };
        axios
          .put(
            `${apiPath.prodPath}/api/toolTrack/deleteToolTrack/${id}&&${filteredData.techAssigned}`,
            dataObj
          )
          .then((res) => {
            if (res.data.error) {
              Swal.fire({
                icon: "error",
                text: "Error Occured while deleting record",
              });
            } else {
              refreshData();
              setCheckboxArr([]);
            }
          });
      }
    });
  };
  const handleCloseDrawer = () => {
    setDrawer(!drawer);
  };
  const handleReturn = () => {
    const strCheckboxArr = JSON.stringify(checkboxArr);
    const bodyData = { data: strCheckboxArr };
    axios
      .patch(`${apiPath.prodPath}/api/toolTrack/changeLocation/`, bodyData)
      .then((res) => {
        if (res.data.error) {
          Swal.fire({
            icon: "error",
            text: res.data.message,
          });
        } else {
          Swal.fire({
            icon: "success",
            text: res.data.message,
          });
          refreshData();
          setCheckboxArr([]);
        }
      })
      .catch((err) => console.log(err));
  };
  const handleAttachment = () => {
    const id = checkboxArr[0];
    const filteredData = toolTrack.find((i) => i.id == id);
    console.log(filteredData);
    if (filteredData.file == undefined) {
      Swal.fire({
        icon: "error",
        text: "There is no attachment present against this record",
      });
    }
    viewImage(filteredData.file);
  };
  const handleAddModal = () => {
    setDrawer(true);
  };
  const optionsForFilter = [
    { label: "Tool Number", value: "toolNumber" },
    { label: "Job", value: "job" },
    { label: "Location", value: "location" },
    { label: "Tech Assigned", value: "techAssigned" },
  ];
  const handleFormSearch = (e) => {
    e.preventDefault();
    console.log("searchOpt", searchOpt.value);
    console.log("user", user);
    var url;
    if (searchOpt.value == "toolNumber") {
      url = `${apiPath.prodPath}/api/toolTrack/search/?searchBy=${searchOpt.value}&&searchValue=${search}`;
    }
    if (searchOpt.value == "job") {
      url = `${apiPath.prodPath}/api/toolTrack/search/?searchBy=${searchOpt.value}&&searchValue=${search}`;
    }
    if (searchOpt.value == "location") {
      url = `${apiPath.prodPath}/api/toolTrack/search/?searchBy=${searchOpt.value}&&searchValue=${search}`;
    }
    if (searchOpt.value == "techAssigned") {
      console.log(search);
      url = `${apiPath.prodPath}/api/toolTrack/search/?searchBy=${searchOpt.value}&&searchValue=${user.value}`;
    }
    setLoader(true);
    axios
      .get(url)
      .then((res) => {
        const filteredToolTrack = res.data.toolTracks
          .filter((i) => i.checkedOut !== undefined)
          .filter((i) => i.checkedOut !== "");
        const sortedFilterToolTrack = filteredToolTrack.sort((a, b) =>
          b.date.localeCompare(a.date)
        );
        setToolTrack(sortedFilterToolTrack);
        setLoader(false);
      })
      .catch((err) => console.log(err));
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
    <section className="tool-track-wrap">
      <section className="main-wrap-toolTrack">
        <div className="upper-btn-wrap">
          <h1 className="font-semibold text-2xl pt-2 pb-2">Tool Track</h1>
        </div>
        <div className="flex pb-5 flex-row justify-between">
          <div className="w-1/2 flex flex-col gap-5">
            <div className="wrap-for-search">
              <Select
                className="employee-names"
                options={optionsForFilter}
                value={searchOpt}
                onChange={(v) => {
                  setSearchOpt(v);
                  setSearch("");
                  setUser("");
                }}
              />
            </div>
            {searchOpt == "" ? null : (
              <form
                onSubmit={handleFormSearch}
                className="pt-2 flex flex-row gap-2"
              >
                {searchOpt.value == "techAssigned" ? (
                  <Select
                    styles={{ width: "300px" }}
                    options={allUsersOpt}
                    className="employee-names"
                    value={user}
                    onChange={(v) => {
                      setUser(v);
                    }}
                  />
                ) : (
                  <input
                    className="p-2 border-2 border-grey w-1/2"
                    placeholder={
                      searchOpt.value == "toolNumber"
                        ? "Search by Tool #"
                        : searchOpt.value == "job"
                        ? "Search by Job"
                        : "Search by Location"
                    }
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                )}
                <input
                  className="p-2 font-medium bg-orange-400 rounded-xl text-white"
                  type="submit"
                  value={"Search"}
                />
                {search !== "" || user !== "" ? (
                  <p
                    style={{ color: "red" }}
                    onClick={() => {
                      setSearch("");
                      setUser("");
                      getAllTools();
                    }}
                  >
                    Clear
                  </p>
                ) : null}
              </form>
            )}
          </div>
          <div className="w-1/2 flex flex-col justify-end items-end">
            <button
              className="p-2 font-medium bg-orange-400 rounded-xl text-white"
              onClick={handleAddModal}
            >
              + Add Tool Track
            </button>
          </div>
        </div>
        {/* <div className="generate-btn-wrap">
        <button onClick={generateReport} className={poppins.className}>
          {loading ? "Processing..." : "Generate Report"}
        </button>
      </div> */}

        {checkboxArr.length == 0 ? null : (
          <div className="flex flex-row gap-5 pb-5">
            {checkboxArr.length > 1 ? null : (
              <button
                className="p-2 font-medium bg-orange-400 rounded-xl text-white"
                onClick={handleEdit}
                disabled={checkboxArr.length > 1 ? true : false}
              >
                Edit
              </button>
            )}
            {checkboxArr.length > 1 ? null : (
              <button
                className="p-2 font-medium bg-orange-400 rounded-xl text-white"
                onClick={handleDelete}
                disabled={checkboxArr.length > 1 ? true : false}
              >
                Delete
              </button>
            )}
            {checkboxArr.length > 1 ? null : (
              <button
                className="p-2 font-medium bg-orange-400 rounded-xl text-white"
                onClick={handleAttachment}
                disabled={checkboxArr.length > 1 ? true : false}
              >
                View Attachment
              </button>
            )}
            <button
              className="p-2 font-medium bg-orange-400 rounded-xl text-white"
              onClick={handleReturn}
            >
              Return To Shop
            </button>
          </div>
        )}
        {loader ? (
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[300px] w-[500px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : (
          <Paper sx={{ height: 500, width: "100%" }}>
            <DataGrid
              rows={toolTrack}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[10, 20, 30, 50]}
              checkboxSelection
              sx={{ border: 0 }}
              onRowSelectionModelChange={handleCheckboxes}
              getRowClassName={(params) => {
                if (
                  params.row.location == "shop" ||
                  params.row.location == "Shop"
                ) {
                  return "green";
                }
                if (dateCalculator(params.row.date, params.row.checkedOut)) {
                  return "red-dot";
                }
                if (!dateCalculator(params.row.date, params.row.checkedOut)) {
                  return "yellow-dot";
                }
              }}
            />
          </Paper>
        )}
      </section>
      <ToolTrackDrawer
        open={drawer}
        user={userInfo}
        onClose={handleCloseDrawer}
        refreshData={getAllTools}
        editFlag={editFlag}
        editData={editData}
      />
    </section>
  );
}

export default ToolTrackComp;
