import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import moment from "moment";

var columns = [
  { field: "dateFormatted", headerName: "Date", width: 130 },
  { field: "dayName", headerName: "Day", width: 100 },
];
function UpcomingShifts({ shifts }) {
  const [checkboxArr, setCheckboxArr] = useState([]);
  const paginationModel = { page: 0, pageSize: 10 };

  const handleCheckboxes = (value) => {
    setCheckboxArr(value);
  };
  const mappedData = shifts.map((i) => {
    return {
      id: i._id,
      dateFormatted: moment(i.date).format("MM-DD-YYYY"),
      ...i,
    };
  });
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={mappedData}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10]}
        checkboxSelection
        sx={{ border: 0 }}
        onRowSelectionModelChange={handleCheckboxes}
      />
    </Box>
  );
}

export default UpcomingShifts;
