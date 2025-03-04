import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import { v4 as uuidv4 } from "uuid";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
import Select from "react-select";
import moment from "moment";
import Image from "next/image";
function PurchaseOrdersDrawer({
  allPurchasing,
  open,
  onClose,
  addPurchaseOrders,
  edit,
  editData,
  id,
  refreshData,
}) {
  const [POId, setPOId] = useState("");
  const [jobNumber, setJobNumber] = useState("");
  const [jobNumberOpt, setJobNumberOpt] = useState([]);
  const [jobName, setJobName] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [projectManagerOpt, setProjectManagerOpt] = useState([]);
  const [purchaseOrder, setPurpurchaseOrder] = useState([]);
  const [supplier, setSupplier] = useState("");
  const [supplierOpt, setSupplierOpt] = useState("");
  const [salesRep, setSalesRep] = useState("");
  const [salesRepOpt, setSalesRepOpt] = useState([]);
  const [salesContact, setSalesContact] = useState("");
  const [salesItems, setSalesItems] = useState([]);

  useEffect(() => {
    if (allPurchasing && allPurchasing.length > 0) {
      const lastPurchasePO = allPurchasing[allPurchasing.length - 1].POId;
      const numberSectionOfPO = lastPurchasePO.substring(
        lastPurchasePO.indexOf("-") + 1
      );
      const newNo = Number(numberSectionOfPO) + 1;
      const newPOValue = `PO${moment().format("YYYY")}-${newNo}`;
      setPOId(newPOValue);
    } else {
      const newPOValue = `PO${moment().format("YYYY")}-1`;
      setPOId(newPOValue);
    }
    axios.get(`${apiPath.prodPath}/api/vendor`).then((res) => {
      const data = res.data.vendors.map((i) => {
        return { label: i.companyName, value: i.companyName };
      });
      setSupplierOpt(data);
    });
    axios.get(`${apiPath.prodPath}/api/jobNumber`).then((res) => {
      const data = res.data.jobNumbers.map((i) => {
        return { label: i.jobNumber, value: i.jobNumber };
      });
      setJobNumberOpt(data);
    });
    axios.get(`${apiPath.prodPath}/api/users`).then((res) => {
      const data = res.data.allUsers.map((i) => {
        return { label: i.fullname, value: i.fullname };
      });
      setProjectManagerOpt(data);
      setSalesRepOpt(data);
    });
    if (edit) {
      setPOId(editData.POId);
      setJobNumber({ label: editData.jobNumber, value: editData.jobNumber });
      setJobName(editData.jobName);
      setProjectManager({
        label: editData.projectManager,
        value: editData.projectManager,
      });
      setPurpurchaseOrder(editData.purchaseOrder);
      setSupplier({ label: editData.supplier, value: editData.supplier });
      setSalesRep({ label: editData.salesRep, value: editData.salesRep });
      setSalesContact(editData.salesContact);
      setSalesItems(
        editData.items == undefined
          ? []
          : editData.items.map((i) => {
              i.id = i._id;
              return i;
            })
      );
    }
  }, [open]);
  console.log("sales", salesItems);
  const handleSalesArr = () => {
    const obj = {
      id: uuidv4(),
      number: 0,
      dateOrdered: "",
      quantityOrdered: 0,
      partNo: "",
      vendor: "",
      description: "",
      notes: "",
    };
    setSalesItems((prev) => {
      return [obj, ...prev];
    });
  };
  const handleAdd = (e) => {
    e.preventDefault();
    const formData = {
      POId,
      jobNumber: jobNumber.value,
      jobName,
      projectManager: projectManager.value,
      purchaseOrder,
      supplier: supplier.value,
      salesRep: salesRep.value,
      salesContact,
      items: salesItems,
    };
    console.log("formData", formData);
    if (edit) {
      axios
        .patch(`${apiPath.prodPath}/api/purchaseOrder/${id}`, formData)
        .then((res) => {
          refreshData();
          dataEntryRefresh();
        })
        .catch((error) => console.log(error));
    } else {
      addPurchaseOrders(formData);
      dataEntryRefresh();
    }
  };
  const dataEntryRefresh = () => {
    setPOId("");
    setJobNumber("");
    setJobName("");
    setProjectManager("");
    setPurpurchaseOrder("");
    setSupplier("");
    setSalesRep("");
    setSalesContact("");
    setSalesItems([]);
  };
  const handleSalesNum = (e, id) => {
    const result = salesItems.map((el) => {
      if (el.id == id) {
        el.number = Number(e.target.value);
      }
      return el;
    });
    setSalesItems(result);
  };
  const handleSalesQuan = (e, id) => {
    const result = salesItems.map((el) => {
      if (el.id == id) {
        el.quantityOrdered = Number(e.target.value);
      }
      return el;
    });
    setSalesItems(result);
  };
  const handleDateOrdered = (date, id) => {
    const result = salesItems.map((el) => {
      if (el.id == id) {
        el.dateOrdered = date;
      }
      return el;
    });
    setSalesItems(result);
  };
  const handleSalesPartNo = (e, id) => {
    const result = salesItems.map((el) => {
      if (el.id == id) {
        el.partNo = e.target.value;
      }
      return el;
    });
    setSalesItems(result);
  };
  const handleLaborDescInp = (e, id) => {
    const result = salesItems.map((el) => {
      if (el.id == id) {
        el.description = e.target.value;
      }
      return el;
    });
    setSalesItems(result);
  };
  const handleNotesInp = (e, id) => {
    const result = salesItems.map((el) => {
      if (el.id == id) {
        el.notes = e.target.value;
      }
      return el;
    });
    setSalesItems(result);
  };
  const handleVendors = (v, id) => {
    const result = salesItems.map((el) => {
      if (el.id == id) {
        el.vendor = v.value;
      }
      return el;
    });
    setSalesItems(result);
  };
  const handleRemoveEl = (i) => {
    const filteredArr = salesItems.filter((el) => el.id !== i.id);
    setSalesItems(filteredArr);
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
          {edit ? "Edit Purchase Order" : "Add Purchase Order"}
        </h1>
        <form
          onSubmit={handleAdd}
          className="flex flex-row gap-5 flex-wrap w-full mt-9"
        >
          {/* <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">JS PO</label>
            <input
              type="text"
              value={PO}
              onChange={(e) => setPO(e.target.value)}
              disabled={true}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Vendor</label>
            <Select
              options={vendorOpt}
              onChange={(v) => setVendor(v)}
              value={vendor}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Vendor Sales</label>
            <input
              type="text"
              value={vendorSales}
              onChange={(e) => setVendorSales(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Purchase Type</label>
            <input
              type="text"
              value={purchaseType}
              onChange={(e) => setPurchaseType(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">PO Status</label>
            <Select
              options={POStatusOpt}
              onChange={(v) => setPurchaseStatus(v)}
              value={purchaseStatus}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Notes</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div className="sub-btn-wrap">
            <input
              className={`${poppins.className} addEmp`}
              type="submit"
              value={edit ? "Edit Purchasing Order" : "Add Purchasing Order"}
            />
          </div> */}
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">POId</label>
            <input
              type="text"
              value={POId}
              onChange={(e) => setPOId(e.target.value)}
              disabled={true}
              className="p-2 cus-tool-form"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Job Number</label>
            <Select
              options={jobNumberOpt}
              onChange={(v) => setJobNumber(v)}
              value={jobNumber}
              placeholder="Select Job Number"
              id="purchase-1"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Job Name</label>
            <input
              type="text"
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
              placeholder="Job Name"
              className="p-2 cus-tool-form"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Project Manager</label>
            <Select
              options={projectManagerOpt}
              onChange={(v) => setProjectManager(v)}
              value={projectManager}
              placeholder="Select Project Manager"
              id="purchase-2"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Purchase Order</label>
            <input
              type="text"
              value={purchaseOrder}
              onChange={(e) => setPurpurchaseOrder(e.target.value)}
              placeholder="Purchase Order"
              className="p-2 cus-tool-form"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Supplier</label>
            <Select
              options={supplierOpt}
              onChange={(v) => setSupplier(v)}
              value={supplier}
              placeholder="Select Supplier"
              id="purchase-3"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Sales Rep</label>
            <Select
              options={salesRepOpt}
              onChange={(v) => setSalesRep(v)}
              value={salesRep}
              placeholder="Select Sales Rep"
              id="purchase-4"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Sales Contact</label>
            <input
              type="text"
              value={salesContact}
              onChange={(e) => setSalesContact(e.target.value)}
              placeholder="Sales Contact"
              className="p-2 cus-tool-form"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2" style={{ width: "100%" }}>
            <p className="cus-labor-btn" onClick={() => handleSalesArr()}>
              &#10011; Sales Item
            </p>
            <p style={{ marginTop: "10px", fontWeight: "600" }}>
              total labor :${" "}
              {salesItems.length == 0
                ? "0"
                : salesItems.length == 1
                ? salesItems.map((i) => i.amount)
                : salesItems.reduce((a, s) => Number(a) + Number(s.amount), 0)}
            </p>
          </div>
          {salesItems.length
            ? salesItems.map((i) => {
                return (
                  <div
                    key={i.id}
                    className="w-full flex flex-row gap-2 flex-wrap"
                  >
                    <div className="flex flex-col w-1/4 gap-2">
                      <label className="font-semibold">Number</label>
                      <input
                        type="number"
                        value={i.number}
                        onChange={(e) =>
                          handleSalesNum(e, i.id == undefined ? i._id : i.id)
                        }
                        className="p-2 cus-tool-form"
                      />
                    </div>
                    <div className="flex flex-col w-1/4 gap-2">
                      <label className="font-semibold">Date Ordered</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            onClick={() => console.log("clicked")}
                            variant={"outline"}
                            className={cn(
                              "w-[280px] justify-start text-left font-normal",
                              !i.dateOrdered && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {i.dateOrdered ? (
                              moment(i.dateOrdered).format("MM-DD-YYYY")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 cus-calendar">
                          <Calendar
                            mode="single"
                            selected={i.dateOrdered}
                            onSelect={(date) =>
                              handleDateOrdered(
                                date,
                                i.id == undefined ? i._id : i.id
                              )
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex flex-col w-1/4 gap-2">
                      <label className="font-semibold">Quantity Ordered</label>
                      <input
                        type="number"
                        value={i.quantityOrdered}
                        onChange={(e) =>
                          handleSalesQuan(e, i.id == undefined ? i._id : i.id)
                        }
                        className="p-2 cus-tool-form"
                      />
                    </div>
                    <div className="flex flex-col w-1/4 gap-2">
                      <label className="font-semibold">Part No</label>
                      <input
                        type="text"
                        value={i.partNo}
                        onChange={(e) =>
                          handleSalesPartNo(e, i.id == undefined ? i._id : i.id)
                        }
                        className="p-2 cus-tool-form"
                      />
                    </div>
                    <div className="flex flex-col w-1/4 gap-2">
                      <label className="font-semibold">Vendor</label>
                      <Select
                        options={supplierOpt}
                        onChange={(v) =>
                          handleVendors(v, i.id == undefined ? i._id : i.id)
                        }
                        value={{ label: i.vendor, value: i.vendor }}
                        placeholder="Select Vendor"
                        id="purchase-5"
                      />
                    </div>
                    <div className="flex flex-col w-1/4 gap-2">
                      <label className="font-semibold">Description</label>
                      <input
                        type="text"
                        value={i.description}
                        onChange={(e) =>
                          handleLaborDescInp(
                            e,
                            i.id == undefined ? i._id : i.id
                          )
                        }
                        className="p-2 cus-tool-form"
                      />
                    </div>
                    <div className="flex flex-col w-1/4 gap-2">
                      <label className="font-semibold">Notes</label>
                      <input
                        type="text"
                        value={i.notes}
                        onChange={(e) =>
                          handleNotesInp(e, i.id == undefined ? i._id : i.id)
                        }
                        className="p-2 cus-tool-form"
                      />
                    </div>
                    {salesItems.length > 0 ? (
                      <span
                        className="minus"
                        style={{ fontSize: "22px" }}
                        onClick={() => handleRemoveEl(i)}
                      >
                        &#9866;
                      </span>
                    ) : null}
                  </div>
                );
              })
            : null}
          <div className="flex flex-row justify-end w-full mt-10">
            <input
              className="p-3 bg-orange-400 text-white font-semibold rounded-xl"
              type="submit"
              value={edit ? "Edit Purchase Order" : "Add Purchase Order"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default PurchaseOrdersDrawer;
