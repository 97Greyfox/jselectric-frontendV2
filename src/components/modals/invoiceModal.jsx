import Modal from "@mui/material/Modal";
import { Poppins } from "next/font/google";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import Select from "react-select";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "../ui/button";
const poppins = Poppins({
  weight: ["300", "500"],
  style: ["normal"],
  subsets: ["latin"],
});
import { useState, useEffect } from "react";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import { Skeleton } from "@/components/ui/skeleton";
import PaymentModal from "./paymentModalInvoice";
import AttachmentModal from "./attachmentModal";

function InvoicesTableModal({
  openFlag,
  handleClose,
  clientId,
  componentName,
}) {
  const [filteredData, setFilteredData] = useState();
  const [filter, setFilter] = useState([]);
  const [jobId, setJobId] = useState("");
  const [invoice, setInvoice] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentFlag, setPaymentFlag] = useState(false);
  const [itemObj, setItemObj] = useState("");
  const [innerLoading, setInnerLoading] = useState(false);
  const [invoiceId, setInvoiceId] = useState("");
  const [modalFlag, setModalFlag] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/clients/`)
      .then((res) => {
        const filteredClient = res.data.clients.find((i) => i.id == clientId);
        const filteredClientInvoices =
          filteredClient == undefined ? [] : filteredClient.invoices;
        setFilteredData(filteredClientInvoices);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [openFlag, innerLoading]);
  const filterOpt = [
    { label: "job id", value: "job id" },
    { label: "invoice", value: "invoice" },
    { label: "amount", value: "amount" },
  ];
  const handlePaymentModal = (item) => {
    setPaymentFlag(!paymentFlag);
    setItemObj(item);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (filter.value == "job id") {
      console.log("####", jobId);
      const filterArr = data.filter((i) => i.jobId == `${jobId}`);
      console.log("here", filterArr);
      setFilteredData(filterArr);
    }
    if (filter.value == "invoice") {
      const filterArr = data.filter((i) => i.invoice == `${invoice}`);
      console.log("here invoice", filterArr);
      setFilteredData(filterArr);
    }
    if (filter.value == "amount") {
      const filterArr = data.filter((i) => i.totalAmount == `${amount}`);
      console.log("here amount", filterArr);
      setFilteredData(filterArr);
    }
  };
  const clearHandler = () => {
    axios.get(`${apiPath.prodPath}/api/clients/`).then((res) => {
      const filteredClient = res.data.clients.find((i) => i.id == clientId);
      const filteredClientInvoices =
        filteredClient == undefined ? [] : filteredClient.invoices;
      setFilteredData(filteredClientInvoices);
    });
    setJobId("");
    setInvoice("");
    setAmount("");
  };
  const refreshData = () => {
    setInnerLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/clients/`)
      .then((res) => {
        const filteredClient = res.data.clients.find((i) => i.id == clientId);
        const filteredClientInvoices =
          filteredClient.invoices == undefined ? [] : filteredClient.invoices;
        console.log(
          "these are the invoice in parent module",
          filteredClientInvoices
        );
        setFilteredData(filteredClientInvoices);
        setInnerLoading(false);
        // setPaymentFlag(false);
      })
      .catch((err) => {
        console.log(err);
        setInnerLoading(false);
      });
  };
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const handleViewModal = (id) => {
    setInvoiceId(id);
    setModalFlag(!modalFlag);
  };
  return (
    <Modal
      open={openFlag}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex flex-row justify-center align-middle w-full h-full"
    >
      <div className="bg-white w-5/6 h-dvh p-10 border-none overflow-y-scroll">
        <div className="mb-10">
          <Button
            onClick={() => handleClose()}
            className="bg-transparent flex flex-row text-black hover:bg-transparent text-3xl p-0"
          >
            <ArrowBackIosIcon className="text-4xl text-gray-500" />
            <h1 className="text-3xl font-semibold">All Invoices</h1>
          </Button>
        </div>
        <div className="mb-2 w-1/3">
          <Select
            options={filterOpt}
            value={filter}
            onChange={(value) => {
              setFilter(value);
              setJobId("");
              setInvoice("");
              setAmount("");
            }}
            id="invoice-table-select"
          />
        </div>
        <form
          onSubmit={handleSearch}
          className="flex flex-row w-full flex-wrap gap-2 pb-2"
        >
          {filter.value == "job id" ? (
            <input
              className={`${poppins.className} w-1/2 p-2 border-2 border-gray-300 rounded-xl`}
              type="text"
              value={jobId}
              onChange={(e) => setJobId(e.target.value)}
              placeholder="Job ID"
            />
          ) : filter.value == "invoice" ? (
            <input
              className={`${poppins.className} w-1/2 p-2 border-2 border-gray-300 rounded-xl`}
              type="text"
              value={invoice}
              onChange={(e) => setInvoice(e.target.value)}
              placeholder="Invoice"
            />
          ) : filter.value == "amount" ? (
            <input
              type="number"
              className={`${poppins.className} w-1/2 p-2 border-2 border-gray-300 rounded-xl`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
            />
          ) : null}
          {jobId == "" && invoice == "" && amount == "" ? null : (
            <input
              type="submit"
              className={`${poppins.className} bg-orange-400 p-2 text-white rounded-xl`}
              value={"Search"}
            />
          )}
          {jobId == "" && invoice == "" && amount == "" ? null : (
            <p
              onClick={clearHandler}
              className="bg-orange-400 p-2 text-white rounded-xl hover:cursor-pointer"
            >
              Clear
            </p>
          )}
        </form>
        {loading ? (
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[300px] w-[500px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : (
          <Paper
            className={poppins.className}
            sx={{ width: "100%", overflow: "hidden", bgcolor: "transparent" }}
          >
            <TableContainer sx={{ height: 750 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ minWidth: "100px" }}>
                      Payments
                    </TableCell>
                    <TableCell style={{ minWidth: "100px" }}>
                      Attachments
                    </TableCell>
                    <TableCell style={{ minWidth: "130px" }}>
                      Invoice Date
                    </TableCell>
                    <TableCell style={{ minWidth: "100px" }}>Job Id</TableCell>
                    <TableCell style={{ minWidth: "100px" }}>Invoice</TableCell>
                    <TableCell style={{ minWidth: "130px" }}>
                      Original Amount
                    </TableCell>
                    <TableCell style={{ minWidth: "100px" }}>
                      Total Amount
                    </TableCell>
                    <TableCell style={{ minWidth: "130px" }}>
                      Retention Amount
                    </TableCell>
                    <TableCell style={{ minWidth: "150px" }}>
                      Retention Start Date
                    </TableCell>
                    <TableCell style={{ minWidth: "150px" }}>
                      Non Retention Amount
                    </TableCell>

                    <TableCell style={{ minWidth: "80px" }}>0+</TableCell>
                    <TableCell style={{ minWidth: "80px" }}>30+</TableCell>
                    <TableCell style={{ minWidth: "80px" }}>60+</TableCell>
                    <TableCell style={{ minWidth: "80px" }}>90+</TableCell>
                    <TableCell style={{ minWidth: "100px" }}>
                      Audit Date
                    </TableCell>
                    <TableCell style={{ minWidth: "150px" }}>
                      Last Statement Date
                    </TableCell>
                    <TableCell style={{ minWidth: "100px" }}>Notes</TableCell>
                    <TableCell style={{ minWidth: "100px" }}>Paid</TableCell>
                    <TableCell style={{ minWidth: "150px" }}>
                      Remaining Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData &&
                    filteredData.length &&
                    filteredData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((i) => {
                        return (
                          <TableRow key={i.id}>
                            <TableCell>
                              <button
                                className={`${poppins.className} bg-orange-400 text-white p-2 rounded-xl`}
                                onClick={() => {
                                  setInvoiceId(i.id);
                                  handlePaymentModal(i);
                                }}
                              >
                                View
                              </button>
                            </TableCell>
                            <TableCell>
                              {i.attachments &&
                              i.attachments.files &&
                              i.attachments.files.length ? (
                                <button
                                  className={`${poppins.className} bg-orange-400 text-white p-2 rounded-xl`}
                                  onClick={() => handleViewModal(i.id)}
                                >
                                  View
                                </button>
                              ) : (
                                "N/A"
                              )}
                            </TableCell>
                            <TableCell>
                              {i.invoiceDate == "" || i.invoiceDate == undefined
                                ? "none"
                                : i.invoiceDate}
                            </TableCell>
                            <TableCell>{i.jobId}</TableCell>
                            <TableCell>{i.invoice}</TableCell>
                            <TableCell>
                              {i.originalAmount == null
                                ? "none"
                                : `$${numberWithCommas(i.originalAmount)}`}
                            </TableCell>
                            <TableCell>
                              {i.totalAmount == null
                                ? "none"
                                : `$${numberWithCommas(i.totalAmount)}`}
                            </TableCell>
                            <TableCell>
                              {i.retentionAmount == null
                                ? "none"
                                : `$${numberWithCommas(i.retentionAmount)}`}
                            </TableCell>
                            <TableCell>
                              {i.retentionStartDate == "" ||
                              i.retentionStartDate == undefined
                                ? "none"
                                : i.retentionStartDate}
                            </TableCell>
                            <TableCell>
                              {i.nonRetentionAmount == null
                                ? "none"
                                : `$${numberWithCommas(i.nonRetentionAmount)}`}
                            </TableCell>
                            <TableCell>
                              {i.zeroDaysAmount == null
                                ? "none"
                                : `$${numberWithCommas(i.zeroDaysAmount)}`}
                            </TableCell>
                            <TableCell>
                              {i.thirtyDaysAmount == null
                                ? "none"
                                : `$${numberWithCommas(i.thirtyDaysAmount)}`}
                            </TableCell>
                            <TableCell>
                              {i.sixtyDaysAmount == null
                                ? "none"
                                : `$${numberWithCommas(i.sixtyDaysAmount)}`}
                            </TableCell>
                            <TableCell>
                              {i.ninetyDaysAmount == null
                                ? "none"
                                : `$${numberWithCommas(i.ninetyDaysAmount)}`}
                            </TableCell>
                            <TableCell>
                              {i.auditDate == "" || i.auditDate == undefined
                                ? "none"
                                : i.auditDate}
                            </TableCell>
                            <TableCell>
                              {i.lastStatementDate == "" ||
                              i.lastStatementDate == undefined
                                ? "none"
                                : i.lastStatementDate}
                            </TableCell>
                            <TableCell>{i.notes}</TableCell>
                            <TableCell>{i.paid}</TableCell>
                            <TableCell style={{ minWidth: "150px" }}>
                              {i.remainingAmount == null
                                ? "none"
                                : `$${numberWithCommas(i.remainingAmount)}`}
                            </TableCell>
                            {paymentFlag && i.id == invoiceId ? (
                              <PaymentModal
                                open={paymentFlag}
                                onClose={() => setPaymentFlag(false)}
                                payments={
                                  i.payments == undefined ||
                                  i.payments.length == 0
                                    ? []
                                    : i.payments
                                }
                                totalAmount={i.totalAmount}
                                remainingAmountValue={
                                  i.remainingAmount == undefined
                                    ? null
                                    : i.remainingAmount
                                }
                                clientId={clientId}
                                invoiceId={i.id}
                                refreshData={refreshData}
                                innerLoading={innerLoading}
                                paid={i.paid}
                              />
                            ) : null}
                            {modalFlag && invoiceId == i.id ? (
                              <AttachmentModal
                                files={i.attachments.files}
                                openFlag={modalFlag}
                                closeModal={handleViewModal}
                              />
                            ) : null}
                          </TableRow>
                        );
                      })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[20, 30, 40, 50]}
              component="div"
              count={filteredData ? filteredData.length : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        )}
      </div>
    </Modal>
  );
}

export default InvoicesTableModal;
