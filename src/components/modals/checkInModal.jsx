import { apiPath } from "@/utils/routes";
import moment from "moment";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { TimePicker } from "react-rainbow-components";
import { Modal } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "../ui/button";
function CheckInModal({ open, onClose, handleCheckInForm }) {
  const [checkIn, setCheckIn] = useState("");
  const handleForm = (e) => {
    e.preventDefault();
    handleCheckInForm(checkIn);
    onClose();
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex flex-row justify-center self-center w-full"
    >
      <div className="bg-white w-1/3 h-350 p-10 border-none">
        <div className="mb-10">
          <Button
            onClick={() => onClose()}
            className="bg-transparent flex flex-row text-black hover:bg-transparent text-3xl p-0"
          >
            <ArrowBackIosIcon className="text-4xl text-gray-500" />
            <h1 className="text-3xl font-semibold">Set CheckIn</h1>
          </Button>
        </div>
        <form onSubmit={handleForm} className="flex flex-row flex-wrap">
          <div className="w-1/2">
            <TimePicker
              value={checkIn}
              abel="CheckIn Time"
              onChange={(time) => setCheckIn(time)}
              className="rainbow-m-vertical_small rainbow-p-horizontal_medium rainbow-m_auto"
            />
          </div>
          <input
            type="submit"
            value={"Add"}
            className="bg-orange-400 text-white rounded-xl p-2 font-semibold text-lg self-center"
          />
        </form>
      </div>
    </Modal>
  );
}

export default CheckInModal;
