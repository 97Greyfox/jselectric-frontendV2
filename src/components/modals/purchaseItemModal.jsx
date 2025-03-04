import { Modal } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import moment from "moment/moment";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "../ui/button";
function PurchaseItemModal({ open, onClose, item, refreshData }) {
  const [activeTab, setActiveTab] = useState("Pics / Files");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const tabHandler = (e) => {
    setActiveTab(e.target.innerText);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex flex-row justify-center align-middle w-full h-full"
    >
      <div
        className="bg-white w-5/6 h-dvh p-10 border-none overflow-y-scroll"
        style={{ alignSelf: "center" }}
      >
        <div className="mb-10">
          <Button
            onClick={() => onClose()}
            className="bg-transparent flex flex-row text-black hover:bg-transparent text-3xl p-0"
          >
            <ArrowBackIosIcon className="text-4xl text-gray-500" />
            <h1 className="text-3xl font-semibold">Inventory Items</h1>
          </Button>
        </div>
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 120 }}>Number</TableCell>
                <TableCell style={{ minWidth: 120 }}>Date of Order</TableCell>
                <TableCell style={{ minWidth: 120 }}>
                  Quantity Ordered
                </TableCell>
                <TableCell style={{ minWidth: 200 }}>Part No</TableCell>
                <TableCell style={{ minWidth: 200 }}>Vendor</TableCell>
                <TableCell style={{ minWidth: 120 }}>Description</TableCell>
                <TableCell style={{ minWidth: 200 }}>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {item &&
                item
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell style={{ minWidth: 120 }}>
                          {row.number}
                        </TableCell>
                        <TableCell style={{ minWidth: 120 }}>
                          {moment(row.dateOrdered).format("MM-DD-YYYY")}
                        </TableCell>
                        <TableCell style={{ minWidth: 120 }}>
                          {row.quantityOrdered}
                        </TableCell>
                        <TableCell style={{ minWidth: 200 }}>
                          {row.partNo}
                        </TableCell>
                        <TableCell style={{ minWidth: 200 }}>
                          {row.vendor}
                        </TableCell>
                        <TableCell style={{ minWidth: 120 }}>
                          {row.description}
                        </TableCell>
                        <TableCell style={{ minWidth: 200 }}>
                          {row.notes}
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={item.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
    </Modal>
  );
}

export default PurchaseItemModal;
