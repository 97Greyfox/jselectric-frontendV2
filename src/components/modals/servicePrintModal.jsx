import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Poppins } from "next/font/google";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "../ui/button";
const poppins = Poppins({
  weight: ["100", "300", "500", "600"],
  style: ["normal"],
  subsets: ["latin"],
});
function ServicePrintModal({
  open,
  handleClose,
  item,
  handlePDF,
  salesTaxValue,
}) {
  const [filteredTo, setFilteredTo] = useState("");
  useEffect(() => {
    axios.get(`${apiPath.prodPath}/api/clients/`).then((res) => {
      const filteredClient = res.data.clients.find(
        (i) => i.customerName == item.to
      );
      setFilteredTo(filteredClient);
    });
  }, [open]);
  function numberWithCommas(x) {
    const formatCus = (Math.round(x * 100) / 100).toFixed(2);
    return formatCus.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const taxCalculation = (amountSingle, taxVal) => {
    const amountWithTax = (amountSingle * taxVal) / 100;
    const sum = amountWithTax + amountSingle;
    return sum;
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={`${poppins.className} bg-white p-4`}>
        <div className="mb-10">
          <Button
            onClick={() => handleClose()}
            className="bg-transparent flex flex-row text-black hover:bg-transparent text-3xl p-0"
          >
            <ArrowBackIosIcon className="text-4xl text-gray-500" />
            <h1 className="text-3xl font-semibold">Print Modal</h1>
          </Button>
        </div>
        <div id="service-pdf" style={{ padding: "20px 30px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                width: "48%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  justifyContent: "space-between",
                }}
              >
                <img
                  src="https://i.ibb.co/DCcP8Mj/logo-1.png"
                  alt="logo-1"
                  border="0"
                  style={{ width: "120px" }}
                />
                <div style={{ display: "flex", flexWrap: "nowrap" }}>
                  <div style={{ width: "200px" }}>
                    <h4 style={{ lineHeight: "15px", marginBottom: "0px" }}>
                      From:
                    </h4>
                    <p style={{ lineHeight: "15px", marginBottom: "0px" }}>
                      4702 FM 1327
                    </p>
                    <p style={{ lineHeight: "15px", marginBottom: "0px" }}>
                      Buda, TX 78610
                    </p>
                    <p style={{ lineHeight: "15px", marginBottom: "0px" }}>
                      (512) 243-2700
                    </p>
                    <p style={{ lineHeight: "15px", marginBottom: "0px" }}>
                      jselectric@jselectric.com
                    </p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <div style={{ width: "200px" }}>
                  <h4 style={{ lineHeight: "15px", marginBottom: "0px" }}>
                    To:
                  </h4>
                  <p style={{ lineHeight: "15px", marginBottom: "0px" }}>
                    {item.to}
                  </p>
                  {filteredTo !== "" ? (
                    <p style={{ lineHeight: "15px", marginBottom: "0px" }}>
                      {filteredTo.address}
                    </p>
                  ) : null}
                  {filteredTo !== "" ? (
                    <p style={{ lineHeight: "15px", marginBottom: "0px" }}>
                      {filteredTo.city}, {filteredTo.state} {filteredTo.zipCode}
                    </p>
                  ) : null}
                  {filteredTo !== "" ? (
                    <p style={{ lineHeight: "15px", marginBottom: "0px" }}>
                      {filteredTo.phone}
                    </p>
                  ) : null}
                  {filteredTo !== "" ? (
                    <p style={{ lineHeight: "15px", marginBottom: "0px" }}>
                      {filteredTo.email}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              style={{
                width: "48%",
                borderRadius: "20px",
                border: "1px solid #a2a2a2",
                padding: "15px",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <div style={{ width: "45%" }}>
                <h4
                  style={{
                    marginBottom: "0px",
                    paddingBottom: "0px",
                    lineHeight: "15px",
                  }}
                >
                  Date Of Order:
                </h4>
                <p
                  style={{
                    borderBottom: "1px solid #a2a2a2",
                    lineHeight: "15px",
                    marginBottom: "0px",
                  }}
                >
                  {item.dateOfOrder}
                </p>
                <h4
                  style={{
                    marginBottom: "0px",
                    paddingBottom: "0px",
                    lineHeight: "15px",
                  }}
                >
                  Created By:
                </h4>
                <p
                  style={{
                    borderBottom: "1px solid #a2a2a2",
                    lineHeight: "15px",
                    marginBottom: "0px",
                  }}
                >
                  {item.createdBy}
                </p>
                <h4
                  style={{
                    marginBottom: "0px",
                    paddingBottom: "0px",
                    lineHeight: "15px",
                  }}
                >
                  Start Date:
                </h4>
                <p
                  style={{
                    borderBottom: "1px solid #a2a2a2",
                    lineHeight: "15px",
                    marginBottom: "0px",
                  }}
                >
                  {item.startDate}
                </p>
              </div>
              <div style={{ width: "45%" }}>
                <h4
                  style={{
                    marginBottom: "0px",
                    paddingBottom: "0px",
                    lineHeight: "15px",
                  }}
                >
                  Job Name:
                </h4>
                <p
                  style={{
                    borderBottom: "1px solid #a2a2a2",
                    lineHeight: "15px",
                    marginBottom: "0px",
                  }}
                >
                  {item.jobName}
                </p>
                <h4
                  style={{
                    marginBottom: "0px",
                    paddingBottom: "0px",
                    lineHeight: "15px",
                  }}
                >
                  Job Location:
                </h4>
                <p
                  style={{
                    borderBottom: "1px solid #a2a2a2",
                    lineHeight: "15px",
                    marginBottom: "0px",
                  }}
                >
                  {item.jobLocation}
                </p>
                <h4
                  style={{
                    marginBottom: "0px",
                    paddingBottom: "0px",
                    lineHeight: "15px",
                  }}
                >
                  Invoice Date:
                </h4>
                <p
                  style={{
                    borderBottom: "1px solid #a2a2a2",
                    lineHeight: "15px",
                    marginBottom: "0px",
                  }}
                >
                  {item.invoiceDate}
                </p>
              </div>
              <div style={{ width: "100%" }}>
                <h4
                  style={{
                    marginBottom: "0px",
                    paddingBottom: "0px",
                    lineHeight: "15px",
                  }}
                >
                  Terms:
                </h4>
                <p
                  style={{
                    borderBottom: "1px solid #a2a2a2",
                    lineHeight: "15px",
                    marginBottom: "0px",
                  }}
                >
                  {item.terms}
                </p>
              </div>
            </div>
          </div>
          <div
            style={{
              borderRadius: "20px",
              border: "1px solid #a2a2a2",
              marginTop: "5px",
              marginBottom: "5px",
              padding: "5px",
            }}
          >
            <h4
              style={{
                marginBottom: "0px",
                paddingBottom: "0px",
                lineHeight: "15px",
              }}
            >
              Description Of Work:
            </h4>
            <p
              style={{
                borderBottom: "1px solid #a2a2a2",
                lineHeight: "13px",
                marginBottom: "0px",
              }}
            >
              {item.description}
            </p>
          </div>
          <table
            style={{
              border: "1px solid #000",
              marginTop: "15px",
              marginBottom: "15px",
              padding: "5px",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid #a2a2a2" }}>
                <td style={{ width: "380px" }}>Labor</td>
                <td style={{ width: "80px" }}>Hrs</td>
                <td style={{ width: "80px" }}>$/Hour</td>
                <td style={{ width: "80px" }}>Tax Status</td>
                <td style={{ width: "80px" }}>Subtotal</td>
              </tr>
            </thead>
            <tbody>
              {item.laborArr.map((i) => {
                return (
                  <tr
                    key={i._id}
                    style={{
                      borderBottom: "1px solid #a2a2a2",
                    }}
                  >
                    <td style={{ width: "380px" }}>{i.description}</td>
                    <td style={{ width: "80px" }}>{i.laborHours}</td>
                    <td style={{ width: "80px" }}>
                      ${numberWithCommas(i.rate)}
                    </td>
                    <td style={{ width: "80px" }}>
                      {i.taxStatus}{" "}
                      {i.taxStatus == "Yes" ? `(${salesTaxValue})%` : ""}
                    </td>
                    <td style={{ width: "80px" }}>
                      $
                      {i.taxStatus == "Yes"
                        ? numberWithCommas(
                            taxCalculation(i.amount, salesTaxValue)
                          )
                        : numberWithCommas(i.amount)}
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td style={{ width: "80px" }}>
                  Total Labor: ${numberWithCommas(item.totalLabor)}
                </td>
              </tr>
            </tbody>
          </table>
          <table
            style={{
              border: "1px solid #000",
              marginTop: "15px",
              marginBottom: "15px",
              padding: "5px",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid #a2a2a2" }}>
                <td style={{ width: "380px" }}>Material</td>
                <td style={{ width: "80px" }}>Qty</td>
                <td style={{ width: "80px" }}>$/each</td>
                <td style={{ width: "80px" }}>Tax Status</td>
                <td style={{ width: "80px" }}>Subtotal</td>
              </tr>
            </thead>
            <tbody>
              {item.materialArr.map((i) => {
                return (
                  <tr
                    key={i._id}
                    style={{
                      borderBottom: "1px solid #a2a2a2",
                    }}
                  >
                    <td style={{ width: "380px" }}>{i.description}</td>
                    <td style={{ width: "80px" }}>{i.materialQuantity}</td>
                    <td style={{ width: "80px" }}>
                      ${numberWithCommas(i.rate)}
                    </td>
                    <td style={{ width: "80px" }}>
                      {i.taxStatus}{" "}
                      {i.taxStatus == "Yes" ? `(${salesTaxValue})%` : ""}
                    </td>
                    <td style={{ width: "80px" }}>
                      $
                      {i.taxStatus == "Yes"
                        ? numberWithCommas(
                            taxCalculation(i.amount, salesTaxValue)
                          )
                        : numberWithCommas(i.amount)}
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td style={{ width: "80px" }}>
                  Total Material: ${numberWithCommas(item.totalMaterail)}
                </td>
              </tr>
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <p style={{ marginBottom: "0px", lineHeight: "15px" }}>
              <strong>Subtotal:</strong> $
              {numberWithCommas(item.totalLabor + item.totalMaterail)}
            </p>
            {/* <p style={{ marginBottom: "0px", lineHeight: "15px" }}>
              <strong>Tax if applicable:</strong>{" "}
              {item.taxStatus == "Yes" ? salesTaxValue : 0}%
            </p> */}
            <p style={{ marginBottom: "0px", lineHeight: "15px" }}>
              <strong>Total:</strong> ${numberWithCommas(item.total)}
            </p>
            <p style={{ marginBottom: "0px", lineHeight: "15px" }}>
              <strong>Paid:</strong> N/A
            </p>
            <p style={{ marginBottom: "0px", lineHeight: "15px" }}>
              <strong>Balance:</strong> N/A
            </p>
            <div style={{ width: "100%" }}>
              <h3>Signature</h3>
              {item.signature == undefined || item.signature == null ? null : (
                <img style={{ width: "100px" }} src={item.signature.fileUrl} />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-end">
          <button
            className="self-end bg-orange-400 text-white rounded-xl p-2"
            style={{ marginTop: "20px" }}
            onClick={handlePDF}
          >
            Generate PDF
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ServicePrintModal;
