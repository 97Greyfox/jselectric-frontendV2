import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
function AttachmentModal({ files, openFlag, closeModal }) {
  const [modifiedFile, setModifiedFile] = useState("");
  useEffect(() => {
    const customObj = files.map((i) => {
      return {
        ...i,
        mimeType:
          i.filename.split(".").pop() == "png"
            ? "image/png"
            : i.filename.split(".").pop() == "jpg"
            ? "image/jpeg"
            : i.filename.split(".").pop() == "pdf"
            ? "application/pdf"
            : "image/jpeg",
      };
    });
    setModifiedFile(customObj);
  }, [openFlag]);
  const viewPic = (file) => {
    window.open(
      file.fileUrl,
      "Image",
      "width=largeImage.stylewidth,height=largeImage.style.height,resizable=1"
    );
  };
  const viewFile = (file) => {
    window.open(
      file.fileUrl,
      "Application",
      "width=largeImage.stylewidth,height=largeImage.style.height,resizable=1"
    );
  };
  return (
    <Modal
      open={openFlag}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="picModal bg-transparent flex flex-col justify-center p-5"
    >
      <div className="outer-wrap bg-white p-5">
        <div className="flex flex-row justify-end">
          <CloseIcon onClick={closeModal} className="hover:cursor-pointer" />
        </div>
        <h1 className={`${poppins.className} font-semibold text-xl mb-5`}>
          Attachments
        </h1>
        <div className="flex flex-row justify-start gap-3">
          {modifiedFile &&
            modifiedFile.map((file, ind) => {
              return (
                <div key={ind} className="flex flex-col justify-start gap-2">
                  {file.mimeType == "image/png" ||
                  file.mimeType == "image/jpg" ||
                  file.mimeType == "image/jpeg" ? (
                    <div>
                      <img
                        src={file.fileUrl}
                        className="attach-img"
                        onClick={() => viewPic(file)}
                      />
                      <p className={`${poppins.className} text-md`}>
                        {file.filename}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-start gap-3">
                      <img
                        src={`/pdf.png`}
                        width={150}
                        height={150}
                        onClick={() => viewFile(file)}
                      />
                      <p className={`${poppins.className} text-md`}>
                        {file.filename}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </Modal>
  );
}

export default AttachmentModal;
