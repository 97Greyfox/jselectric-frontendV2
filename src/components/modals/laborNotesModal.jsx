import { apiPath } from "@/utils/routes";
import moment from "moment";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { TimePicker } from "react-rainbow-components";
import { Modal } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "../ui/button";
function NotesModal({ open, onClose, handleNotesForm }) {
  const [notes, setNotes] = useState("");
  const handleForm = (e) => {
    e.preventDefault();
    handleNotesForm(notes);
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
            <h1 className="text-3xl font-semibold">Set Notes</h1>
          </Button>
        </div>
        <form onSubmit={handleForm} className="flex flex-row flex-wrap">
          <div className="flex flex-row gap-4 w-full">
            <input
              type="text"
              value={notes}
              placeholder="Enter Notes"
              className="p-2 border-gray-200 border-2 w-4/5"
              onChange={(e) => setNotes(e.target.value)}
            />
            <input
              type="submit"
              value={"Add"}
              className="bg-orange-400 text-white rounded-xl w-1/5 p-2 font-semibold text-lg self-center"
            />
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default NotesModal;
