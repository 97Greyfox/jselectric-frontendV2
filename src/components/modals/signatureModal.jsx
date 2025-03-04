import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { Poppins } from "next/font/google";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import SignatureCanvas from "react-signature-canvas";
import Swal from "sweetalert2";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "../ui/button";
const poppins = Poppins({
  weight: ["100", "300", "500", "600"],
  style: ["normal"],
  subsets: ["latin"],
});
function SignatureModal({ moduleName, open, handleClose, item, refreshData }) {
  const [sign, setSign] = useState();
  const [url, setUrl] = useState();
  const [newSignature, setNewSignature] = useState(false);
  const handleClear = () => {
    sign.clear();
    setUrl("");
  };
  const handleGenerate = () => {
    setNewSignature(true);
    setUrl(sign.getTrimmedCanvas().toDataURL("image/png"));
    var file = dataURLtoFile(
      sign.getTrimmedCanvas().toDataURL("image/png"),
      "test.png"
    );
    const formData = new FormData();
    formData.append("files", file);
    var url = "";
    if (moduleName == "service") {
      url = `${apiPath.prodPath}/api/service/addSignature/${item.id}`;
    }
    if (moduleName == "writeUp") {
      url = `${apiPath.prodPath}/api/writeUp/addSignature/${item.id}`;
    }
    axios
      .patch(url, formData)
      .then((res) => {
        if (res.data.error) {
          Swal.fire({
            icon: "error",
            text: "Error Occured while adding signature",
          });
        } else {
          handleClose();
          refreshData();
        }
      })
      .catch((err) => console.log(err));
  };
  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  const handleDelete = () => {
    Swal.fire({
      icon: "warning",
      text: "Are you sure you want to delete the signature",
      showConfirmButton: true,
      confirmButtonText: "Yes",
      showCancelButton: true,
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        const dataObj = {
          oldFiles: JSON.stringify(item.signature),
        };
        var url = "";
        if (moduleName == "service") {
          url = `${apiPath.prodPath}/api/service/delSignature/${item.id}`;
        }
        if (moduleName == "writeUp") {
          url = `${apiPath.prodPath}/api/writeUp/deleteSignature/${item.id}`;
        }
        axios.patch(url, dataObj).then((res) => {
          console.log(res);
          refreshData();
          handleClose();
        });
      }
    });
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex flex-row justify-center align-middle w-full h-full"
    >
      <div
        className={`${poppins.className} bg-white w-5/6 h-dvh p-10 border-none overflow-y-scroll`}
      >
        <div className="mb-10">
          <Button
            onClick={() => handleClose()}
            className="bg-transparent flex flex-row text-black hover:bg-transparent text-3xl p-0"
          >
            <ArrowBackIosIcon className="text-4xl text-gray-500" />
            <h1 className="text-3xl font-semibold">Signature Modal</h1>
          </Button>
        </div>
        <div>
          {item.signature == undefined || item.signature == null ? (
            <div style={{ border: "2px solid black", width: 500, height: 200 }}>
              <SignatureCanvas
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: "sigCanvas",
                }}
                ref={(data) => setSign(data)}
              />
            </div>
          ) : null}

          <br></br>
          <div style={{ width: "100%" }}>
            {newSignature ? (
              <img src={url} />
            ) : item.signature == undefined ? null : Object.keys(item.signature)
                .length == 0 ? null : (
              <img src={item.signature.fileUrl} />
            )}
          </div>
          <div className="flex flex-row gap-4 pt-2">
            {item.signature == undefined || item.signature == null ? (
              <button
                onClick={handleClear}
                className="bg-orange-400 text-white p-2 rounded-xl"
              >
                Clear
              </button>
            ) : null}
            {item.signature == undefined || item.signature == null ? (
              <button
                onClick={handleGenerate}
                className="bg-orange-400 text-white p-2 rounded-xl"
              >
                Save
              </button>
            ) : null}

            {item.signature == undefined ? null : Object.keys(item.signature)
                .length == 0 ? null : (
              <button
                className="bg-orange-400 text-white p-2 rounded-xl"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default SignatureModal;
