import React, { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import Select from "react-select";
import Swal from "sweetalert2";
import moment from "moment";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FileUploader } from "react-drag-drop-files";
const poppins = Poppins({
  weight: ["300", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
});
const fileTypes = ["JPG", "PNG", "GIF", "PDF"];
function InvoiceForm({ addParts, editFlag, part }) {
  const [invoiceDate, setInvoiceDate] = useState("");
  const [jobId, setJobId] = useState("");
  const [invoice, setInvoice] = useState("");
  const [originalAmount, setOriginalAmount] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [retentionAmount, setRetentionAmount] = useState("");
  const [retentionStartDate, setRetentionStartDate] = useState("");
  const [nonRetentionAmount, setNonRetentionAmount] = useState("");
  const [zeroDaysAmount, setZeroDaysAmount] = useState("");
  const [thirtyDaysAmount, setThirtyDaysAmount] = useState("");
  const [sixtyDaysAmount, setSixtyDaysAmount] = useState("");
  const [ninetyDaysAmount, setNinetyDaysAmount] = useState("");
  const [auditDate, setAuditDate] = useState("");
  const [lastStatementDate, setLastStatementDate] = useState("");
  const [oldFiles, setOldFiles] = useState("");
  const [fileName, setFileNames] = useState([]);
  const [newFileFlag, setNewFileFlag] = useState(false);
  const [fileUpload, setFileUpload] = useState(null);
  const [notes, setNotes] = useState("");
  const [paid, setPaid] = useState("");
  useEffect(() => {
    if (editFlag) {
      setInvoiceDate(part.invoiceDate == "" ? "" : new Date(part.invoiceDate));
      setJobId(part.jobId);
      setInvoice(part.invoice);
      setOriginalAmount(part.originalAmount);
      setTotalAmount(part.totalAmount);
      setRetentionAmount(part.retentionAmount);
      setRetentionStartDate(
        part.retentionStartDate == "" ? "" : new Date(part.retentionStartDate)
      );
      setOldFiles(part.attachments == undefined ? [] : part.attachments.files);
      setFileUpload(
        part.attachments == undefined ? [] : part.attachments.files
      );
      setFileNames(
        part.attachments == undefined
          ? []
          : part.attachments.files.map((i) => {
              return i.filename;
            })
      );
      setNonRetentionAmount(part.nonRetentionAmount);
      setZeroDaysAmount(part.zeroDaysAmount);
      setThirtyDaysAmount(part.thirtyDaysAmount);
      setSixtyDaysAmount(part.sixtyDaysAmount);
      setNinetyDaysAmount(part.ninetyDaysAmount);
      setAuditDate(part.auditDate == "" ? "" : new Date(part.auditDate));
      setLastStatementDate(
        part.lastStatementDate == "" ? "" : new Date(part.lastStatementDate)
      );
      setNotes(part.notes);
      setPaid({ label: part.paid, value: part.paid });
    }
  }, [editFlag, part]);
  const handleParts = (e) => {
    e.preventDefault();
    if (paid == "" || paid.value == undefined) {
      Swal.fire({
        icon: "error",
        text: "Please select the paid status",
      });
    } else {
      if (editFlag && newFileFlag && fileUpload !== null) {
        const formData = new FormData();
        formData.append(
          "invoiceDate",
          invoiceDate == ""
            ? ""
            : moment(invoiceDate).format("MM/DD/YYYY HH:MM A")
        );
        formData.append("jobId", jobId);
        formData.append("invoice", invoice);
        formData.append("originalAmount", Number(originalAmount));
        formData.append("totalAmount", Number(totalAmount));
        formData.append("retentionAmount", Number(retentionAmount));
        formData.append(
          "retentionStartDate",
          retentionStartDate == ""
            ? ""
            : moment(retentionStartDate).format("MM/DD/YYYY HH:MM A")
        );
        formData.append("nonRetentionAmount", Number(nonRetentionAmount));
        formData.append("zeroDaysAmount", Number(zeroDaysAmount));
        formData.append("thirtyDaysAmount", Number(thirtyDaysAmount));
        formData.append("sixtyDaysAmount", Number(sixtyDaysAmount));
        formData.append("ninetyDaysAmount", Number(ninetyDaysAmount));
        formData.append(
          "auditDate",
          auditDate == "" ? "" : moment(auditDate).format("MM/DD/YYYY HH:MM A")
        );
        formData.append(
          "lastStatementDate",
          lastStatementDate == ""
            ? ""
            : moment(lastStatementDate).format("MM/DD/YYYY HH:MM A")
        );
        formData.append("notes", notes);
        formData.append("paid", paid.value);
        formData.append("newFileFlag", newFileFlag);
        formData.append("oldFiles", JSON.stringify(oldFiles));
        for (let i = 0; i < fileUpload.length; i++) {
          formData.append("files", fileUpload[i]);
        }
        addParts(formData, editFlag);
        clearValues();
      } else if (editFlag && newFileFlag == false && fileUpload !== null) {
        const formData = new FormData();
        formData.append(
          "invoiceDate",
          invoiceDate == ""
            ? ""
            : moment(invoiceDate).format("MM/DD/YYYY HH:MM A")
        );
        formData.append("jobId", jobId);
        formData.append("invoice", invoice);
        formData.append("originalAmount", Number(originalAmount));
        formData.append("totalAmount", Number(totalAmount));
        formData.append("retentionAmount", Number(retentionAmount));
        formData.append(
          "retentionStartDate",
          retentionStartDate == ""
            ? ""
            : moment(retentionStartDate).format("MM/DD/YYYY HH:MM A")
        );
        formData.append("nonRetentionAmount", Number(nonRetentionAmount));
        formData.append("zeroDaysAmount", Number(zeroDaysAmount));
        formData.append("thirtyDaysAmount", Number(thirtyDaysAmount));
        formData.append("sixtyDaysAmount", Number(sixtyDaysAmount));
        formData.append("ninetyDaysAmount", Number(ninetyDaysAmount));
        formData.append(
          "auditDate",
          auditDate == "" ? "" : moment(auditDate).format("MM/DD/YYYY HH:MM A")
        );
        formData.append(
          "lastStatementDate",
          lastStatementDate == ""
            ? ""
            : moment(lastStatementDate).format("MM/DD/YYYY HH:MM A")
        );
        formData.append("notes", notes);
        formData.append("paid", paid.value);
        formData.append("newFileFlag", newFileFlag);
        formData.append("editFlag", editFlag);
        formData.append("oldFiles", JSON.stringify(oldFiles));
        addParts(formData, editFlag);
        clearValues();
      } else if (editFlag == false && fileUpload !== null) {
        const formData = new FormData();
        formData.append(
          "invoiceDate",
          invoiceDate == ""
            ? ""
            : moment(invoiceDate).format("MM/DD/YYYY HH:MM A")
        );
        formData.append("jobId", jobId);
        formData.append("invoice", invoice);
        formData.append("originalAmount", Number(originalAmount));
        formData.append("totalAmount", Number(totalAmount));
        formData.append("retentionAmount", Number(retentionAmount));
        formData.append(
          "retentionStartDate",
          retentionStartDate == ""
            ? ""
            : moment(retentionStartDate).format("MM/DD/YYYY HH:MM A")
        );
        formData.append("nonRetentionAmount", Number(nonRetentionAmount));
        formData.append("zeroDaysAmount", Number(zeroDaysAmount));
        formData.append("thirtyDaysAmount", Number(thirtyDaysAmount));
        formData.append("sixtyDaysAmount", Number(sixtyDaysAmount));
        formData.append("ninetyDaysAmount", Number(ninetyDaysAmount));
        formData.append(
          "auditDate",
          auditDate == "" ? "" : moment(auditDate).format("MM/DD/YYYY HH:MM A")
        );
        formData.append(
          "lastStatementDate",
          lastStatementDate == ""
            ? ""
            : moment(lastStatementDate).format("MM/DD/YYYY HH:MM A")
        );
        formData.append("notes", notes);
        formData.append("paid", paid.value);
        for (let i = 0; i < fileUpload.length; i++) {
          formData.append("files", fileUpload[i]);
        }
        addParts(formData, editFlag);
        clearValues();
      } else {
        const formData = new FormData();
        formData.append(
          "invoiceDate",
          invoiceDate == ""
            ? ""
            : moment(invoiceDate).format("MM/DD/YYYY HH:MM A")
        );
        formData.append("jobId", jobId);
        formData.append("invoice", invoice);
        formData.append("originalAmount", Number(originalAmount));
        formData.append("totalAmount", Number(totalAmount));
        formData.append("retentionAmount", Number(retentionAmount));
        formData.append(
          "retentionStartDate",
          retentionStartDate == ""
            ? ""
            : moment(retentionStartDate).format("MM/DD/YYYY HH:MM A")
        );
        formData.append("nonRetentionAmount", Number(nonRetentionAmount));
        formData.append("zeroDaysAmount", Number(zeroDaysAmount));
        formData.append("thirtyDaysAmount", Number(thirtyDaysAmount));
        formData.append("sixtyDaysAmount", Number(sixtyDaysAmount));
        formData.append("ninetyDaysAmount", Number(ninetyDaysAmount));
        formData.append(
          "auditDate",
          auditDate == "" ? "" : moment(auditDate).format("MM/DD/YYYY HH:MM A")
        );
        formData.append(
          "lastStatementDate",
          lastStatementDate == ""
            ? ""
            : moment(lastStatementDate).format("MM/DD/YYYY HH:MM A")
        );
        formData.append("notes", notes);
        formData.append("paid", paid.value);
        addParts(formData, editFlag);
        clearValues();
      }
    }
  };
  const clearValues = () => {
    setInvoiceDate("");
    setJobId("");
    setInvoice("");
    setOriginalAmount("");
    setTotalAmount("");
    setRetentionAmount("");
    setRetentionStartDate("");
    setNonRetentionAmount("");
    setZeroDaysAmount("");
    setThirtyDaysAmount("");
    setSixtyDaysAmount("");
    setNinetyDaysAmount("");
    setAuditDate("");
    setLastStatementDate("");
    setNotes("");
    setPaid("");
    setOldFiles([]);
    setFileUpload([]);
    setFileNames([]);
  };
  const fileHandler = (newfiles) => {
    setFileNames([]);
    setFileUpload([]);
    setNewFileFlag(true);
    setFileUpload(newfiles);
    var arr = [];
    console.log(newfiles);
    Object.values(newfiles).forEach((val) => {
      console.log("this is val", val.name);
      arr = [val.name, ...arr];
    });
    setFileNames(arr);
  };

  return (
    <section>
      <form className="flex flex-row gap-3" onSubmit={handleParts}>
        <div className="flex flex-col w-1/4 gap-2">
          <label className="font-semibold">Invoice Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                onClick={() => console.log("clicked")}
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !invoiceDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {invoiceDate ? (
                  moment(invoiceDate).format("MM-DD-YYYY")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 cus-calendar">
              <Calendar
                mode="single"
                selected={invoiceDate}
                onSelect={(date) => setInvoiceDate(date)}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col w-1/4 gap-2">
          <label className="font-semibold">Job Id</label>
          <input
            className={`${poppins.className} p-2 cus-tool-form`}
            onChange={(e) => setJobId(e.target.value)}
            value={jobId}
          />
        </div>
        <div className="flex flex-col w-1/4 gap-2">
          <label className="font-semibold">Invoice</label>
          <input
            className={`${poppins.className} p-2 cus-tool-form`}
            onChange={(e) => setInvoice(e.target.value)}
            value={invoice}
          />
        </div>
        <div className="flex flex-col w-1/4 gap-2">
          <label className="font-semibold">Original Amount</label>
          <input
            type="number"
            className={`${poppins.className} p-2 cus-tool-form`}
            onChange={(e) => setOriginalAmount(e.target.value)}
            value={originalAmount}
          />
        </div>
        <div className="flex flex-col w-1/4 gap-2">
          <label className="font-semibold">Total Amount</label>
          <input
            type="number"
            className={`${poppins.className} p-2 cus-tool-form`}
            onChange={(e) => setTotalAmount(e.target.value)}
            value={totalAmount}
          />
        </div>
        <div className="flex flex-col w-1/4 gap-2">
          <label className="font-semibold">Retention Amount</label>
          <input
            type="number"
            className={`${poppins.className} p-2 cus-tool-form`}
            onChange={(e) => setRetentionAmount(e.target.value)}
            value={retentionAmount}
          />
        </div>
        <div className="flex flex-col w-1/4 gap-2">
          <label className="font-semibold">Retention Start Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                onClick={() => console.log("clicked")}
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !retentionStartDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {retentionStartDate ? (
                  moment(retentionStartDate).format("MM-DD-YYYY")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 cus-calendar">
              <Calendar
                mode="single"
                selected={retentionStartDate}
                onSelect={(date) => setRetentionStartDate(date)}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col w-1/4 gap-2">
          <label className="font-semibold">Non Retention Amount</label>
          <input
            type="number"
            className={`${poppins.className} p-2 cus-tool-form`}
            onChange={(e) => setNonRetentionAmount(e.target.value)}
            value={nonRetentionAmount}
          />
        </div>
        <div className="flex flex-col w-1/4 gap-2">
          <label className="font-semibold">0+</label>
          <input
            type="number"
            className={`${poppins.className} p-2 cus-tool-form`}
            onChange={(e) => setZeroDaysAmount(e.target.value)}
            value={zeroDaysAmount}
          />
        </div>
        <div className="flex flex-col w-1/4 gap-2">
          <label className="font-semibold">30+</label>
          <input
            type="number"
            className={`${poppins.className} p-2 cus-tool-form`}
            onChange={(e) => setThirtyDaysAmount(e.target.value)}
            value={thirtyDaysAmount}
          />
        </div>
        <div className="flex flex-col w-1/4 gap-2">
          <label className="font-semibold">60+</label>
          <input
            type="number"
            className={`${poppins.className} p-2 cus-tool-form`}
            onChange={(e) => setSixtyDaysAmount(e.target.value)}
            value={sixtyDaysAmount}
          />
        </div>
        <div className="flex flex-col w-1/4 gap-2">
          <label className="font-semibold">90+</label>
          <input
            type="number"
            className={`${poppins.className} p-2 cus-tool-form`}
            onChange={(e) => setNinetyDaysAmount(e.target.value)}
            value={ninetyDaysAmount}
          />
        </div>
        <div className="flex flex-col w-1/4 gap-2">
          <label className="font-semibold">Audit Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                onClick={() => console.log("clicked")}
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !auditDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {auditDate ? (
                  moment(auditDate).format("MM-DD-YYYY")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 cus-calendar">
              <Calendar
                mode="single"
                selected={auditDate}
                onSelect={(date) => setAuditDate(date)}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col w-1/4 gap-2">
          <label className="font-semibold">Last Statement Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                onClick={() => console.log("clicked")}
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !lastStatementDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {lastStatementDate ? (
                  moment(lastStatementDate).format("MM-DD-YYYY")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 cus-calendar">
              <Calendar
                mode="single"
                selected={lastStatementDate}
                onSelect={(date) => setLastStatementDate(date)}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col w-1/4 gap-2">
          <label className="font-semibold">Notes</label>
          <input
            className={`${poppins.className} p-2 cus-tool-form`}
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
          />
        </div>
        <div className="flex flex-col w-200 gap-2">
          <label className="font-semibold">Paid</label>
          <Select
            options={[
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ]}
            onChange={(v) => setPaid(v)}
            value={paid}
            className="employee-names"
          />
        </div>
        <div className="single-inp">
          <label className="font-semibold">Files</label>
          {/* <input
            type="file"
            className={`${poppins.className} single-inp`}
            onChange={fileHandler}
            multiple
            name="files"
            required={true}
          /> */}
          <FileUploader
            multiple={true}
            handleChange={fileHandler}
            name="files"
            types={fileTypes}
            fileOrFiles={fileUpload}
          />
          {oldFiles.length && editFlag && newFileFlag == false
            ? oldFiles.map((i, ind) => (
                <p key={`${i.filename}${ind}`} style={{ fontSize: "14px" }}>
                  {i.filename}
                </p>
              ))
            : fileName.length && newFileFlag
            ? fileName.map((i, ind) => <p key={`${i}${ind}`}>{i}</p>)
            : null}
        </div>
        <div className="flex flex-row justify-start w-full">
          <input
            className="p-3 bg-orange-400 text-white self-center font-semibold rounded-xl"
            type="submit"
            value={editFlag ? "Edit" : "Add"}
          />
        </div>
      </form>
    </section>
  );
}

export default InvoiceForm;
