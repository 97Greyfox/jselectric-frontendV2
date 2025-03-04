"use client";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { Poppins } from "next/font/google";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Skeleton } from "@/components/ui/skeleton";

const poppins = Poppins({
  weight: ["300", "400", "500", "800"],
  style: ["normal"],
  subsets: ["latin"],
});
import * as XLSX from "xlsx";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
var columns = [
  { field: "toolNumber", headerName: "Tool Number", width: 70 },
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
function HistoryTab({ history, toolsInfo }) {
  const [loading, setLoading] = useState(false);
  const [toolTrack, setToolTrack] = useState([]);
  const [checkboxArr, setCheckboxArr] = useState([]);
  const viewImage = (file) => {
    window.open(file.fileUrl);
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/toolTrack/`)
      .then((res) => {
        const filteredToolTrack = res.data.toolTracks.filter(
          (i) => i.toolNumber == toolsInfo.toolNumber
        );
        setToolTrack(filteredToolTrack);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
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
        const filteredToolTrack = res.data.toolTracks.filter(
          (i) => i.toolNumber == toolsInfo.toolNumber
        );
        setToolTrack(filteredToolTrack);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const paginationModel = { page: 0, pageSize: 3 };
  const handleCheckboxes = (value) => {
    setCheckboxArr(value);
  };
  const handleEdit = () => {
    console.log("edit", checkboxArr);
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
  return loading ? (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[300px] w-[500px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ) : (
    <section className="parts-wrap">
      {checkboxArr.length == 0 ? null : (
        <div className="flex flex-row gap-2">
          {checkboxArr.length > 1 ? null : (
            <button
              className="bg-orange-400 text-white p-2 rounded-md hover:cursor-pointer"
              onClick={handleDelete}
              disabled={checkboxArr.length > 1 ? true : false}
            >
              Delete
            </button>
          )}
          {checkboxArr.length > 1 ? null : (
            <button
              className="bg-orange-400 text-white p-2 rounded-md hover:cursor-pointer"
              onClick={handleAttachment}
              disabled={checkboxArr.length > 1 ? true : false}
            >
              View Attachment
            </button>
          )}
          <button
            className="bg-orange-400 text-white p-2 rounded-md hover:cursor-pointer"
            onClick={handleReturn}
          >
            Return To Shop
          </button>
        </div>
      )}
      <Paper sx={{ height: 250, width: "100%" }}>
        <DataGrid
          rows={toolTrack}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[3]}
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
    </section>
  );
}

export default HistoryTab;
