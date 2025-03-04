import Modal from "@mui/material/Modal";
import { Poppins } from "next/font/google";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import moment from "moment";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Select from "react-select";
import PaymentInvoiceTable from "../invoice/paymentsTable";
const poppins = Poppins({
  weight: ["300", "500"],
  style: ["normal"],
  subsets: ["latin"],
});
function PaymentModal({
  open,
  onClose,
  payments,
  totalAmount,
  remainingAmountValue,
  clientId,
  invoiceId,
  innerLoading,
  refreshData,
  paid,
}) {
  const [date, setDate] = useState("");
  const [checkNo, setCheckNo] = useState("");
  const [payment, setPayment] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [remainingAmount, setRemainingAmount] = useState("");
  const [note, setNote] = useState("");
  const [editFlag, setEditFlag] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [prevPayment, setPrevPayment] = useState("");
  const [prevRemainingAmount, setPrevRemainingAmount] = useState("");
  console.log(invoiceId);
  useEffect(() => {
    console.log("first modal", payments, remainingAmountValue);
    if (remainingAmountValue == null) {
      setRemainingAmount(totalAmount);
    } else {
      setRemainingAmount(remainingAmountValue);
    }
  }, [open, payments]);
  const addPayment = (e) => {
    e.preventDefault();
    if (editFlag) {
      var remainingEdit = remainingAmountValue + prevPayment;
      remainingEdit = remainingEdit - payment;
      console.log("here is remaining edit", remainingEdit);
      if (remainingEdit < 0) {
        Swal.fire({
          icon: "error",
          text: "Payment amount is more than the remaining amount. Please add the correct payment",
        });
      } else {
        if (remainingEdit == 0) {
          console.log("here in zero");
          axios
            .patch(
              `${apiPath.prodPath}/api/clients/setInvoiceStatus/${clientId}&&${invoiceId}`,
              { paid: "Yes" }
            )
            .then((res) => {
              setEditFlag(false);
              console.log(res);
            })
            .catch((err) => console.log(err));
        }
        const dataObj = {
          date: moment(date).format("MM/DD/YYYY"),
          checkNo,
          payment,
          remainingAmount:
            Math.round((remainingEdit + Number.EPSILON) * 100) / 100,
          amount: totalAmount,
          paymentType: paymentType.value,
          note,
        };
        axios
          .patch(
            `${apiPath.prodPath}/api/clients/editPayments/${clientId}&&${invoiceId}&&${paymentId}`,
            dataObj
          )
          .then((res) => {
            if (res.data.error) {
              Swal.fire({
                icon: "error",
                text: "Error occured while adding payments",
              });
            } else {
              setEditFlag(false);
              refreshData();
              clearValues();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      var remaining;
      if (payments.length) {
        remaining = remainingAmount - payment;
        if (remaining < 0) {
          Swal.fire({
            icon: "error",
            text: "Payment amount is more than the remaining amount. Please add the correct payment",
          });
        } else {
          if (remaining == 0) {
            console.log("here in zero");
            axios
              .patch(
                `${apiPath.prodPath}/api/clients/setInvoiceStatus/${clientId}&&${invoiceId}`,
                { paid: "Yes" }
              )
              .then((res) => console.log(res))
              .catch((err) => console.log(err));
          }
          const dataObj = {
            date: moment(date).format("MM/DD/YYYY"),
            checkNo,
            payment,
            remainingAmount:
              Math.round((remaining + Number.EPSILON) * 100) / 100,
            amount: totalAmount,
            paymentType: paymentType.value,
            note,
          };
          axios
            .patch(
              `${apiPath.prodPath}/api/clients/addPayments/${clientId}&&${invoiceId}`,
              dataObj
            )
            .then((res) => {
              if (res.data.error) {
                Swal.fire({
                  icon: "error",
                  text: "Error occured while adding payments",
                });
              } else {
                refreshData();
                clearValues();
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } else {
        remaining = totalAmount - payment;
        if (remaining < 0) {
          Swal.fire({
            icon: "error",
            text: "Payment amount is more than the remaining amount. Please add the correct payment",
          });
        } else {
          if (remaining == 0) {
            axios
              .patch(
                `${apiPath.prodPath}/api/clients/setInvoiceStatus/${clientId}&&${invoiceId}`,
                { paid: "Yes" }
              )
              .then((res) => console.log(res))
              .catch((err) => console.log(err));
          }
          const dataObj = {
            date: moment(date).format("MM/DD/YYYY"),
            checkNo,
            payment,
            remainingAmount:
              Math.round((remaining + Number.EPSILON) * 100) / 100,
            amount: totalAmount,
            paymentType: paymentType.value,
            note,
          };
          axios
            .patch(
              `${apiPath.prodPath}/api/clients/addPayments/${clientId}&&${invoiceId}`,
              dataObj
            )
            .then((res) => {
              if (res.data.error) {
                Swal.fire({
                  icon: "error",
                  text: "Error occured while adding payments",
                });
              } else {
                refreshData();
                clearValues();
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    }
  };
  const handlePayment = (e) => {
    setPayment(e.target.value);
  };
  const clearValues = () => {
    setPayment("");
    setCheckNo("");
    setDate("");
    setPaymentType("");
    setNote("");
  };
  function numberWithCommas(x) {
    const formatCus = (Math.round(x * 100) / 100).toFixed(2);
    return formatCus.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const handleEdit = (payment) => {
    setEditFlag(true);
    setPaymentId(payment._id);
    setAmount(totalAmount);
    setPayment(payment.payment);
    setPrevPayment(payment.payment);
    setCheckNo(payment.checkNo);
    setDate(
      payment.date == "" ? "" : moment(payment.date).format("MM/DD/YYYY")
    );
    setPaymentType({ label: payment.paymentType, value: payment.paymentType });
    setNote(payment.note);
    setRemainingAmount(payment.remainingAmount);
  };
  const handleDelete = (payment) => {
    var afterDelete = remainingAmountValue + payment.payment;
    const dataObj = {
      remainingAmount: afterDelete,
    };
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to delete the payment?",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showCancelButton: true,
      showCloseButton: true,
    }).then((response) => {
      if (response.isConfirmed) {
        axios
          .patch(
            `${apiPath.prodPath}/api/clients/deletePayments/${clientId}&&${invoiceId}&&${payment._id}`,
            dataObj
          )
          .then((res) => {
            if (res.data.error) {
              Swal.fire({
                icon: "error",
                text: "Error occured while adding payments",
              });
            } else {
              refreshData();
              clearValues();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title-inner"
      aria-describedby="modal-modal-description-inner"
      className="flex flex-row justify-center align-middle w-full h-full"
    >
      <div className="bg-white w-5/6 h-dvh p-10 border-none overflow-y-scroll">
        <div className="mb-10">
          <Button
            onClick={() => onClose()}
            className="bg-transparent flex flex-row text-black hover:bg-transparent text-3xl p-0"
          >
            <ArrowBackIosIcon className="text-4xl text-gray-500" />
            <h1 className="text-3xl font-semibold">Payments</h1>
          </Button>
        </div>
        <div className="flex flex-row gap-4 w-full">
          <div className="flex flex-row w-1/3 gap-4">
            <h2 className="font-semibold text-orange-400">Total Amount</h2>
            <p>
              {totalAmount == null
                ? "none"
                : `$${numberWithCommas(totalAmount)}`}
            </p>
          </div>
          <div className="flex flex-row w-1/3 gap-4">
            <h2 className="font-semibold text-orange-400">Remaining Amount</h2>
            <p>
              {remainingAmount == null
                ? "none"
                : `$${numberWithCommas(remainingAmountValue)}`}
            </p>
          </div>
        </div>
        {paid == "Yes" ? null : (
          <div className="pt-4 pb-4">
            <form
              className="flex flex-row gap-5 flex-wrap w-full mt-4"
              onSubmit={addPayment}
            >
              <div className="flex flex-col w-1/4 gap-2">
                <label className="font-semibold">Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      onClick={() => console.log("clicked")}
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        moment(date).format("MM-DD-YYYY")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 cus-calendar">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => setDate(date)}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col w-1/4 gap-2">
                <label className="font-semibold">Payment Type</label>
                <Select
                  options={[
                    { label: "Cash", value: "Cash" },
                    { label: "Card", value: "Card" },
                    { label: "Check", value: "Check" },
                    { label: "EFT", value: "EFT" },
                  ]}
                  className={`${poppins.className} employee-names`}
                  value={paymentType}
                  onChange={(v) => setPaymentType(v)}
                  id="invoice-table-select"
                />
              </div>
              {paymentType.value == "Check" ? (
                <div className="flex flex-col w-1/4 gap-2">
                  <label className="font-semibold">Check #</label>
                  <input
                    type="text"
                    className={`${poppins.className} p-2 cus-tool-form border-2 border-gray-300`}
                    value={checkNo}
                    onChange={(e) => setCheckNo(e.target.value)}
                  />
                </div>
              ) : null}

              <div className="flex flex-col w-1/4 gap-2">
                <label className="font-semibold">Payment</label>
                <input
                  type="number"
                  className={`${poppins.className} p-2 cus-tool-form border-2 border-gray-300`}
                  value={payment}
                  onChange={handlePayment}
                />
              </div>
              <div className="flex flex-col w-1/4 gap-2">
                <label className="font-semibold">Note</label>
                <textarea
                  rows={3}
                  cols={6}
                  className={`${poppins.className} p-2 cus-tool-form border-2 border-gray-300`}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
              <div className="flex flex-row justify-end w-full mt-10">
                <input
                  type="submit"
                  value={editFlag ? "Edit" : "Add"}
                  className="p-3 bg-orange-400 text-white font-semibold rounded-xl"
                />
              </div>
            </form>
          </div>
        )}
        {innerLoading ? (
          <p className={poppins.className}>Loading...</p>
        ) : payments.length ? (
          <PaymentInvoiceTable
            payments={payments}
            handleEdit={(item) => handleEdit(item)}
            handleDelete={(item) => handleDelete(item)}
          />
        ) : (
          <p style={{ marginTop: "10px" }}>No Payments Found</p>
        )}
      </div>
    </Modal>
  );
}

export default PaymentModal;
