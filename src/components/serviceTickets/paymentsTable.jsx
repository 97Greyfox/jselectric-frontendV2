import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// import EmployeeDrawer from "../drawers/employeeDrawer";
import Swal from "sweetalert2";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
export default function PaymentTable({ payments, handleEdit, handleDelete }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  useEffect(() => {
    console.log("inner", payments);
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  function numberWithCommas(x) {
    const formatCus = (Math.round(x * 100) / 100).toFixed(2);
    return formatCus.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <Paper
      className={poppins.className}
      sx={{ width: "100%", overflow: "hidden", bgcolor: "transparent" }}
    >
      <TableContainer sx={{ height: 300 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: 150 }}>Actions</TableCell>
              <TableCell style={{ minWidth: 150 }}>Date</TableCell>
              <TableCell style={{ minWidth: 150 }}>Payment Type</TableCell>
              <TableCell style={{ minWidth: 150 }}>Check#</TableCell>
              <TableCell style={{ minWidth: 150 }}>Notes</TableCell>
              <TableCell style={{ minWidth: 150 }}>Payment</TableCell>
              {/* <TableCell style={{ minWidth: 150 }}>Remaining Amount</TableCell> */}
              {/* <TableCell style={{ minWidth: 150 }}>Total Amount</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.length == 0 ? (
              <TableRow>
                <p className={poppins.className}>No Data Found</p>
              </TableRow>
            ) : (
              payments
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((i) => {
                  return (
                    <TableRow key={i.id}>
                      <TableCell>
                        <div className="flex flex-row gap-2">
                          <EditIcon
                            className="text-blue-400"
                            onClick={() => handleEdit(i)}
                          />
                          <DeleteIcon
                            className="text-red-500"
                            onClick={() => handleDelete(i)}
                          />
                        </div>
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.date == "" || i.date == undefined
                          ? ""
                          : moment(i.date).format("MM-DD-YYYY")}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.paymentType == undefined || i.paymentType == ""
                          ? "None"
                          : i.paymentType}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.checkNo}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.note == undefined || i.note == "" ? "None" : i.note}
                      </TableCell>
                      <TableCell style={{ minWidth: 150 }}>
                        {i.payment == null
                          ? "none"
                          : `$${numberWithCommas(i.payment)}`}
                      </TableCell>
                      {/* <TableCell style={{ minWidth: 150 }}>
                      {i.remainingAmount == null
                        ? "none"
                        : `$${numberWithCommas(i.remainingAmount)}`}
                    </TableCell> */}
                      {/* <TableCell style={{ minWidth: 150 }}>
                      {i.amount == null
                        ? "none"
                        : `$${numberWithCommas(i.amount)}`}
                    </TableCell> */}
                    </TableRow>
                  );
                })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3]}
        component="div"
        count={payments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
