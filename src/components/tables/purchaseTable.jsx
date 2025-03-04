import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["300", "500"],
  style: ["normal"],
  subsets: ["latin"],
});
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import moment from "moment";
import Swal from "sweetalert2";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Image from "next/image";
import PurchaseOrdersDrawer from "../drawers/purchaseOrderDrawer";
import PurchaseOrderInfo from "../modals/purchaseInfoModal";
import PurchaseItemModal from "../modals/purchaseItemModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
function PurchaseOrderTable({ purchaseOrders, refreshData }) {
  const [openFlag, setOpenFlag] = useState(false);
  const [editData, setEditData] = useState("");
  const [infoModal, setInfoModal] = useState(false);
  const [actionFlag, setActionFlag] = useState(false);
  const [purchaseOrderId, setPurchaseOrderId] = useState(false);
  const [itemModal, setItemModal] = useState(false);
  const [item, setItem] = useState("");

  const openEmpModal = (data) => {
    setEditData(data);
    setOpenFlag(!openFlag);
    setActionFlag(false);
  };
  console.log(itemModal);
  const handleActions = (id, objData) => {
    setPurchaseOrderId(id);
    setItem(objData);
    setActionFlag(!actionFlag);
  };
  const deletePurchaseOrder = (idObj) => {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to delete this?",
      showCancelButton: true,
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiPath.prodPath}/api/purchaseOrder/${idObj}`)
          .then((res) => {
            if (res.data.error) {
              Swal.fire({
                icon: "error",
                text: "Unable to delete",
              });
            }
            if (res.data.error == false) {
              Swal.fire({
                icon: "success",
                text: "Deleted Successfully",
              });
              refreshData();
              setActionFlag(false);
            }
          });
      }
    });
  };
  const openInfoDrawer = (i) => {
    setPurchaseOrderId(i.id);
    setActionFlag(false);
    setInfoModal(true);
  };
  return (
    <section>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: 120 }}>Actions</TableCell>
              <TableCell style={{ minWidth: 120 }}>POId</TableCell>
              <TableCell style={{ minWidth: 120 }}>Job Number</TableCell>
              <TableCell style={{ minWidth: 200 }}>Job Name</TableCell>
              <TableCell style={{ minWidth: 200 }}>Project Manager</TableCell>
              <TableCell style={{ minWidth: 120 }}>Purchase Order</TableCell>
              <TableCell style={{ minWidth: 200 }}>Supplier</TableCell>
              <TableCell style={{ minWidth: 120 }}>Sales Rep</TableCell>
              <TableCell style={{ minWidth: 120 }}>Sales Contact</TableCell>
              <TableCell style={{ minWidth: 120 }}>Items</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purchaseOrders.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  {/* <TableCell>
                    <div className="action-wrap">
                      <span
                        onClick={() => {
                          deletePurchaseOrder(row.id);
                        }}
                      >
                        &#10005;
                      </span>
                      <span
                        onClick={() => {
                          openEmpModal(row);
                        }}
                      >
                        &#9998;
                      </span>
                    </div>
                  </TableCell> */}
                  <TableCell style={{ position: "relative" }}>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Image
                          src={"/menu.png"}
                          width={24}
                          height={25}
                          alt="menu"
                          onClick={() => setItem(i)}
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => openInfoDrawer(row)}>
                          Open
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openEmpModal(row)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => deletePurchaseOrder(row.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell style={{ minWidth: 120 }}>{row.POId}</TableCell>
                  <TableCell style={{ minWidth: 120 }}>
                    {row.jobNumber}
                  </TableCell>
                  <TableCell style={{ minWidth: 200 }}>{row.jobName}</TableCell>
                  <TableCell style={{ minWidth: 200 }}>
                    {row.projectManager}
                  </TableCell>
                  <TableCell style={{ minWidth: 120 }}>
                    {row.purchaseOrder}
                  </TableCell>
                  <TableCell style={{ minWidth: 200 }}>
                    {row.supplier}
                  </TableCell>
                  <TableCell style={{ minWidth: 120 }}>
                    {row.salesRep}
                  </TableCell>
                  <TableCell style={{ minWidth: 120 }}>
                    {row.salesContact}
                  </TableCell>
                  <TableCell style={{ minWidth: 120 }}>
                    {row.items && row.items.length ? (
                      <button
                        onClick={() => setItemModal(true)}
                        className={`${poppins.className} p-2 bg-orange-400 rounded-lg text-white font-semibold text-md`}
                      >
                        View
                      </button>
                    ) : (
                      "No items"
                    )}
                  </TableCell>
                  {infoModal && row.id == purchaseOrderId ? (
                    <PurchaseOrderInfo
                      open={infoModal}
                      onClose={() => setInfoModal(false)}
                      item={row}
                      refreshData={refreshData}
                    />
                  ) : null}
                  {itemModal ? (
                    <PurchaseItemModal
                      open={itemModal}
                      onClose={() => setItemModal(false)}
                      item={row.items}
                      refreshData={refreshData}
                    />
                  ) : null}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <PurchaseOrdersDrawer
        open={openFlag}
        onClose={() => setOpenFlag(!openFlag)}
        refreshData={refreshData}
        edit={true}
        editData={editData}
        id={editData.id}
      />
    </section>
  );
}

export default PurchaseOrderTable;
