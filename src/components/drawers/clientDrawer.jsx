import { Drawer } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect, useMemo } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import moment from "moment";
import "./style.scss";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import Select from "react-select";
import Image from "next/image";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function ClientDrawer({
  open,
  onClose,
  addClient,
  editClient,
  id,
  edit,
  data,
}) {
  const [customerCode, setCustomerCode] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [alphaCode, setAlphaCode] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setCusState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  const [fax, setFax] = useState("");
  const [primaryContact, setPrimaryContact] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [balance, setBalance] = useState("");
  const [taxable, setTaxable] = useState("");
  const [status, setStatus] = useState("");
  const [customerTerm, setCustomerTerm] = useState("");
  const [primaryEmail, setPrimaryEmail] = useState("");
  const [secondaryEmail, setSecondaryEmail] = useState("");
  const [taxCode, setTaxCode] = useState("");
  const [retailCertificate, setRetailCertificate] = useState("");
  const [resaleExpDate, setResaleExpDate] = useState("");
  const [salesPersonCode, setSalesPersonCode] = useState("");
  const [receiveStatements, setReceiveStatements] = useState("");
  const [financeCharge, setFinanceCharge] = useState("");
  const [retention, setRetention] = useState("");
  const [lastDateBilled, setLastDateBilled] = useState("");
  const [lastDatePaid, setLastDatePaid] = useState("");
  const [dateEstablished, setDateEstablished] = useState("");
  const [creditLimit, setCreditLimit] = useState("");
  const [materialLevel, setMaterialLevel] = useState("");
  const [laborLevel, setLaborLevel] = useState("");
  const [customerTypeOpt, setCustomerTypeOpt] = useState("");
  const [customerTermOpt, setCustomerTermOpt] = useState("");
  const [taxCodeOpt, setTaxCodeOpt] = useState("");
  const [salesPersonCodeOpt, setSalesPersonCodeOpt] = useState("");
  const [materialLevelOpt, setMaterialLevelOpt] = useState("");
  const [laborLevelOpt, setLaborLevelOpt] = useState("");
  const dataObj = useMemo(() => {
    return data;
  }, []);
  useEffect(() => {
    axios
      .get(`${apiPath.prodPath}/api/customerType`)
      .then((res) => {
        setCustomerTypeOpt(
          res.data.customerTypes.map((i) => ({
            label: i.customerType,
            value: i.customerType,
          }))
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/customerTerm`)
      .then((res) => {
        setCustomerTermOpt(
          res.data.customerTerms.map((i) => ({ label: i.days, value: i.days }))
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/taxCode`)
      .then((res) => {
        setTaxCodeOpt(
          res.data.taxCodes.map((i) => ({ label: i.name, value: i.name }))
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/salesPersonCode`)
      .then((res) => {
        setSalesPersonCodeOpt(
          res.data.salesPersonCodes.map((i) => ({
            label: i.salesPersonCode,
            value: i.salesPersonCode,
          }))
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/materialLevel`)
      .then((res) => {
        setMaterialLevelOpt(
          res.data.materialLevels.map((i) => ({
            label: i.materialLevel,
            value: i.materialLevel,
          }))
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiPath.prodPath}/api/laborLevel`)
      .then((res) => {
        setLaborLevelOpt(
          res.data.laborLevels.map((i) => ({
            label: i.laborLevel,
            value: i.laborLevel,
          }))
        );
      })
      .catch((err) => console.log(err));
    if (edit) {
      setCustomerCode(dataObj.customerCode);
      setCustomerName(dataObj.customerName);
      setAlphaCode(dataObj.alphaCode);
      setAddress(dataObj.address);
      setCity(dataObj.city);
      setCusState(dataObj.state);
      setZipCode(dataObj.zipCode);
      setPhone(dataObj.phone);
      setFax(dataObj.fax);
      setPrimaryContact(dataObj.primaryContact);
      setCustomerType({
        label: dataObj.customerType,
        value: dataObj.customerType,
      });
      setBalance(dataObj.balance);
      setTaxable({ label: dataObj.taxable, value: dataObj.taxable });
      setStatus({ label: dataObj.status, value: dataObj.status });
      setCustomerTerm({
        label: dataObj.customerTerm,
        value: dataObj.customerTerm,
      });
      setTaxCode({ label: dataObj.taxCode, value: dataObj.taxCode });
      setRetailCertificate(dataObj.retailCertificate);
      setResaleExpDate(dataObj.resaleExpDate);
      setSalesPersonCode({
        label: dataObj.salesPersonCode,
        value: dataObj.salesPersonCode,
      });
      setReceiveStatements({
        label: dataObj.receiveStatements,
        value: dataObj.receiveStatements,
      });
      setFinanceCharge(dataObj.financeCharge);
      setRetention(dataObj.retention);
      setLastDateBilled(dataObj.lastDateBilled);
      setLastDatePaid(dataObj.lastDatePaid);
      setDateEstablished(dataObj.dateEstablished);
      setPrimaryEmail(dataObj.primaryEmail);
      setSecondaryEmail(dataObj.secondaryEmail);
      setCreditLimit(dataObj.creditLimit);
      setMaterialLevel({
        label: dataObj.materialLevel,
        value: dataObj.materialLevel,
      });
      setLaborLevel({ label: dataObj.laborLevel, value: dataObj.laborLevel });
    }
  }, []);
  function validatePhoneNumber(input_str) {
    const re = /^[0-9-]+$/;
    return re.test(input_str);
  }
  const validatePhone = (phone) => {
    const flagPhone = validatePhoneNumber(phone);
    if (flagPhone) {
      setPhone(phone);
    }
  };
  const validateFax = (phone) => {
    const flagPhone = validatePhoneNumber(phone);
    if (flagPhone) {
      setFax(phone);
    }
  };
  const handleAddDevice = (e) => {
    e.preventDefault();
    const dataObj = {
      customerCode,
      customerName,
      alphaCode,
      address,
      city,
      state,
      zipCode,
      phone,
      fax,
      primaryContact,
      customerType: customerType.value,
      balance,
      taxable: taxable.value,
      status: status.value,
      customerTerm: customerTerm.value,
      taxCode: taxCode.value,
      retailCertificate,
      resaleExpDate: resaleExpDate == "undefined" ? "" : resaleExpDate,
      salesPersonCode: salesPersonCode.value,
      receiveStatements: receiveStatements.value,
      financeCharge,
      retention,
      lastDateBilled: lastDateBilled == "undefined" ? "" : lastDateBilled,
      lastDatePaid: lastDatePaid == "undefined" ? "" : lastDatePaid,
      dateEstablished: dateEstablished == "undefined" ? "" : dateEstablished,
      creditLimit,
      materialLevel: materialLevel.value,
      primaryEmail,
      secondaryEmail,
      laborLevel: laborLevel.value,
    };
    if (edit) {
      editClient(dataObj, id);
      dataEntryRefresh();
    } else {
      addClient(dataObj);
      dataEntryRefresh();
    }
  };
  const dataEntryRefresh = () => {
    setCustomerCode("");
    setCustomerName("");
    setAlphaCode("");
    setAddress("");
    setCity("");
    setCusState("");
    setZipCode("");
    setPhone("");
    setFax("");
    setPrimaryContact("");
    setCustomerType("");
    setBalance("");
    setTaxable("");
    setStatus("");
    setCustomerTerm("");
    setTaxCode("");
    setRetailCertificate("");
    setResaleExpDate("");
    setSalesPersonCode("");
    setReceiveStatements("");
    setFinanceCharge("");
    setRetention("");
    setLastDateBilled("");
    setLastDatePaid("");
    setDateEstablished("");
    setPrimaryEmail("");
    setSecondaryEmail("");
    setCreditLimit("");
    setMaterialLevel("");
    setLaborLevel("");
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
          {edit ? "Edit Tool" : "Add A Tool"}
        </h1>
        <form
          onSubmit={handleAddDevice}
          className="flex flex-row gap-5 flex-wrap w-full mt-9"
        >
          {/* <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Category</label>
            <Select
              options={categoryOpt}
              onChange={categoryHandler}
              id="example-select-1"
              value={category}
            />
          </div> */}
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Customer Code</label>
            <input
              value={customerCode}
              className={`${poppins.className} p-2 cus-tool-form`}
              type="text"
              onChange={(e) => setCustomerCode(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Customer Name</label>
            <input
              value={customerName}
              className={`${poppins.className} p-2 cus-tool-form`}
              type="text"
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Alpha Code</label>
            <input
              value={alphaCode}
              className={`${poppins.className} p-2 cus-tool-form`}
              type="text"
              onChange={(e) => setAlphaCode(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Address</label>
            <input
              value={address}
              className={`${poppins.className} p-2 cus-tool-form`}
              type="text"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">City</label>
            <input
              value={city}
              className={`${poppins.className} p-2 cus-tool-form`}
              type="text"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">State</label>
            <input
              value={state}
              className={`${poppins.className} p-2 cus-tool-form`}
              type="text"
              onChange={(e) => setCusState(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Zip Code</label>
            <input
              value={zipCode}
              className={`${poppins.className} p-2 cus-tool-form`}
              type="text"
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Phone No</label>
            <input
              type="text"
              value={phone}
              className={`${poppins.className} p-2 cus-tool-form`}
              onChange={(e) => validatePhone(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Primary Email</label>
            <input
              type="text"
              value={primaryEmail}
              className={`${poppins.className} p-2 cus-tool-form`}
              onChange={(e) => setPrimaryEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Secondary Email</label>
            <input
              type="text"
              value={secondaryEmail}
              className={`${poppins.className} p-2 cus-tool-form`}
              onChange={(e) => setSecondaryEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Fax#</label>
            <input
              type="text"
              value={fax}
              className={`${poppins.className} p-2 cus-tool-form`}
              onChange={(e) => validateFax(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Primary Contact</label>
            <input
              value={primaryContact}
              className={`${poppins.className} p-2 cus-tool-form`}
              type="text"
              onChange={(e) => setPrimaryContact(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Customer Type</label>
            <Select
              options={customerTypeOpt}
              onChange={(e) => setCustomerType(e)}
              value={customerType}
              className="employee-names"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Balance</label>
            <input
              value={balance}
              className={`${poppins.className} p-2 cus-tool-form`}
              type="number"
              onChange={(e) => setBalance(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Taxable</label>
            <Select
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
              onChange={(e) => setTaxable(e)}
              value={taxable}
              className="employee-names"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Status</label>
            <Select
              options={[
                { label: "Active", value: "Active" },
                { label: "Inactive", value: "Inactive" },
              ]}
              onChange={(e) => setStatus(e)}
              value={status}
              className="employee-names"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Customer Term</label>
            <Select
              options={customerTermOpt}
              onChange={(e) => setCustomerTerm(e)}
              value={customerTerm}
              className="employee-names"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Tax Code</label>
            <Select
              options={taxCodeOpt}
              onChange={(e) => setTaxCode(e)}
              value={taxCode}
              className="employee-names"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Retail Certificate</label>
            <input
              value={retailCertificate}
              className={`${poppins.className} p-2 cus-tool-form`}
              type="text"
              onChange={(e) => setRetailCertificate(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Resale Exp Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  onClick={() => console.log("clicked")}
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !resaleExpDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {resaleExpDate ? (
                    moment(resaleExpDate).format("MM-DD-YYYY")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 cus-calendar">
                <Calendar
                  mode="single"
                  selected={resaleExpDate}
                  onSelect={(date) => setResaleExpDate(date)}
                />
              </PopoverContent>
            </Popover>
            {resaleExpDate !== "" ? (
              <p onClick={() => setResaleExpDate("")} className="clear-value">
                Clear
              </p>
            ) : null}
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Salesperson Code</label>
            <Select
              options={salesPersonCodeOpt}
              onChange={(e) => setSalesPersonCode(e)}
              value={salesPersonCode}
              className="employee-names"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Receive Statements</label>
            <Select
              options={[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ]}
              onChange={(e) => setReceiveStatements(e)}
              value={receiveStatements}
              className="employee-names"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Finance Charge</label>
            <input
              value={financeCharge}
              className={`${poppins.className} p-2 cus-tool-form`}
              type="number"
              onChange={(e) => setFinanceCharge(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Retention</label>
            <input
              value={retention}
              className={`${poppins.className} p-2 cus-tool-form`}
              type="number"
              onChange={(e) => setRetention(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Last Date Billed</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  onClick={() => console.log("clicked")}
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !lastDateBilled && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {lastDateBilled ? (
                    moment(lastDateBilled).format("MM-DD-YYYY")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 cus-calendar">
                <Calendar
                  mode="single"
                  selected={lastDateBilled}
                  onSelect={(date) => setLastDateBilled(date)}
                />
              </PopoverContent>
            </Popover>
            {lastDateBilled !== "" ? (
              <p onClick={() => setLastDateBilled("")} className="clear-value">
                Clear
              </p>
            ) : null}
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Last Date Paid</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  onClick={() => console.log("clicked")}
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !lastDatePaid && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {lastDatePaid ? (
                    moment(lastDatePaid).format("MM-DD-YYYY")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 cus-calendar">
                <Calendar
                  mode="single"
                  selected={lastDatePaid}
                  onSelect={(date) => setLastDatePaid(date)}
                />
              </PopoverContent>
            </Popover>
            {lastDatePaid !== "" ? (
              <p onClick={() => setLastDatePaid("")} className="clear-value">
                Clear
              </p>
            ) : null}
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Date Established</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  onClick={() => console.log("clicked")}
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !dateEstablished && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateEstablished ? (
                    moment(dateEstablished).format("MM-DD-YYYY")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 cus-calendar">
                <Calendar
                  mode="single"
                  selected={dateEstablished}
                  onSelect={(date) => setDateEstablished(date)}
                />
              </PopoverContent>
            </Popover>
            {dateEstablished !== "" ? (
              <p onClick={() => setDateEstablished("")} className="clear-value">
                Clear
              </p>
            ) : null}
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Credit Limit</label>
            <input
              value={creditLimit}
              className={`${poppins.className} p-2 cus-tool-form`}
              type="number"
              onChange={(e) => setCreditLimit(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Material Level</label>
            <Select
              options={materialLevelOpt}
              onChange={(e) => setMaterialLevel(e)}
              value={materialLevel}
              className="employee-names"
            />
          </div>
          <div className="flex flex-col w-1/4 gap-2">
            <label className="font-semibold">Labor Level</label>
            <Select
              options={laborLevelOpt}
              onChange={(e) => setLaborLevel(e)}
              value={laborLevel}
              className="employee-names"
            />
          </div>
          <div className="flex flex-row justify-end w-full mt-10">
            <input
              className="p-3 bg-orange-400 text-white font-semibold rounded-xl"
              type="submit"
              value={edit ? "Edit Client" : "Add Client"}
            />
          </div>
        </form>
      </div>
    </Drawer>
  );
}

export default ClientDrawer;
