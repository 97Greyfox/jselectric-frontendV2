import { apiPath } from "@/utils/routes";
import { Poppins } from "next/font/google";
import Select from "react-select";
import moment from "moment";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { TimePicker } from "react-rainbow-components";
import { Modal } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "../ui/button";
import { v4 as uuidv4 } from "uuid";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
function LaborReimbursalModal({ open, onClose, handleReimbursalForm }) {
  const [reimbursalOpt, setReimbursalOpt] = useState("");

  const [reimbursalArr, setReimbursalArr] = useState([
    {
      id: uuidv4(),
      reimbursalType: "",
      note: "",
      amount: "",
    },
  ]);
  useEffect(() => {
    axios
      .get(`${apiPath.prodPath}/api/reimbursalType/`)
      .then((res) => {
        setReimbursalOpt(
          res.data.reimbursalTypes
            .map((i) => {
              return { label: i.name, value: i.name };
            })
            .sort((a, b) => a.label.localeCompare(b.label))
        );
      })
      .catch((err) => console.log(err));
  }, [open]);
  const handleForm = (e) => {
    e.preventDefault();
    reimbursalArr.forEach((el) => {
      el.reimbursalType = el.reimbursalType.label;
    });
    handleReimbursalForm(reimbursalArr);
    onClose();
  };
  const addNewForm = () => {
    const newForm = {
      id: uuidv4(),
      reimbursalType: "",
      amount: "",
      note: "",
    };
    setReimbursalArr((arr) => {
      return [...arr, newForm];
    });
  };
  const handleReimbursalType = (e, i) => {
    const result = reimbursalArr.map((el) => {
      if (el.id == i.id) {
        el.reimbursalType = e;
      }
      return el;
    });

    setReimbursalArr(result);
  };
  const handleReimbursalAmount = (e, i) => {
    const result = reimbursalArr.map((el) => {
      if (el.id == i.id) {
        el.amount = e.target.value;
      }
      return el;
    });
    setReimbursalArr(result);
  };
  const handleReimbursalNote = (e, i) => {
    const result = reimbursalArr.map((el) => {
      if (el.id == i.id) {
        el.note = e.target.value;
      }
      return el;
    });

    setReimbursalArr(result);
  };
  const handleRemoveEl = (i) => {
    const filteredArr = reimbursalArr.filter((el) => el.id !== i.id);
    setReimbursalArr(filteredArr);
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex flex-row justify-center self-center w-full"
    >
      <div className="bg-white w-2/3 h-350 p-10 border-none">
        <div className="mb-10">
          <Button
            onClick={() => onClose()}
            className="bg-transparent flex flex-row text-black hover:bg-transparent text-3xl p-0"
          >
            <ArrowBackIosIcon className="text-4xl text-gray-500" />
            <h1 className="text-3xl font-semibold">Set Reimbursal</h1>
          </Button>
        </div>
        <div className="w-full flex flex-row justify-end">
          <span
            className={`${poppins.className} p-2 bg-orange-400 text-white font-semibold hover:cursor-pointer`}
            onClick={addNewForm}
          >
            Add Another Reimbursal
          </span>
        </div>
        <form onSubmit={handleForm} className="flex flex-row flex-wrap">
          <div className="flex flex-row flex-wrap gap-4 w-full">
            {reimbursalArr.map((i) => {
              return (
                <div key={i.id} className="w-full flex flex-row gap-4">
                  <div className="flex flex-col w-1/4 gap-2">
                    <label className="font-semibold">Reimbursal Type</label>
                    <Select
                      name={`reimbursalType${i.id}`}
                      options={reimbursalOpt}
                      value={i.reimbursalType}
                      onChange={(e) => {
                        handleReimbursalType(e, i);
                      }}
                      className={`${poppins.className} employee-names`}
                      required={true}
                    />
                  </div>
                  <div className="flex flex-col w-1/4 gap-2">
                    <label className="font-semibold">Amount</label>
                    <input
                      name={`amount${i.id}`}
                      placeholder="Enter Amount"
                      value={i.amount}
                      onChange={(e) => {
                        handleReimbursalAmount(e, i);
                      }}
                      className="p-2 cus-tool-form"
                      required={true}
                    />
                  </div>
                  <div className="flex flex-col w-1/4 gap-2">
                    <label className="font-semibold">Note</label>
                    <textarea
                      name={`note${i.id}`}
                      placeholder="Enter Note"
                      value={i.note}
                      onChange={(e) => {
                        handleReimbursalNote(e, i);
                      }}
                      className="p-2 cus-tool-form"
                    />
                  </div>
                  {reimbursalArr.length > 1 ? (
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
            })}
            <div className="w-full flex flex-row justify-end">
              <input
                type="submit"
                value={"Add"}
                className="bg-orange-400 text-white rounded-xl w-1/5 p-2 font-semibold text-lg self-center"
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default LaborReimbursalModal;
