import { apiPath } from "@/utils/routes";
import moment from "moment";
import { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import Image from "next/image";
import { TimePicker } from "react-rainbow-components";
import { Modal } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "../ui/button";
import { v4 as uuidv4 } from "uuid";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
function GroupedModal({
  open,
  onClose,
  handleGroupedForm,
  userLabors,
  loadUserLaborData,
}) {
  console.log("@@##$$", userLabors);
  const [reimbursalOpt, setReimbursalOpt] = useState([]);
  const [userOpt, setUserOpt] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [lunchStartTime, setLunchStartTime] = useState("");
  const [lunchEndTime, setLunchEndTime] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");
  const [employees, setEmployees] = useState("");
  const [reimbursalArr, setReimbursalArr] = useState([
    {
      id: uuidv4(),
      reimbursalType: "",
      note: "",
      amount: "",
    },
  ]);
  useEffect(() => {
    console.log("user", userLabors);
    const allDays = userLabors[0].userManpower.timeEntries;
    const currentDate = moment(new Date()).format("MM-DD-YYYY");

    const currentDayOfJob = allDays.find(
      (inner) => moment(inner.date).format("MM-DD-YYYY") == currentDate
    );
    setDate(currentDayOfJob.date);
    const mappedUser = userLabors
      .map((i) => {
        return {
          label: i.fullname,
          value: i.fullname,
          manpowerId: i.userManpower.manpowerId,
          userId: i.userId,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));
    setUserOpt(mappedUser);
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
  }, [open, userLabors]);

  const handleGrpForm = (e) => {
    e.preventDefault();
    reimbursalArr.forEach((el) => {
      el.reimbursalType = el.reimbursalType.label;
    });
    const manpowerIdArr = employees.map((i) => {
      return i.manpowerId;
    });
    const userIdArr = employees.map((i) => {
      return i.userId;
    });
    console.log(manpowerIdArr);
    const dataObj = {
      checkIn: checkIn,
      checkOut: checkOut,
      lunchTimeStart: lunchStartTime,
      lunchTimeEnd: lunchEndTime,
      employees: employees.map((i) => {
        return i.label;
      }),
      notes: notes,
      reimbursal: reimbursalArr,
      manpowerIds: manpowerIdArr,
      userIds: userIdArr,
      date: date,
    };
    console.log("dataObj", dataObj);
    handleGroupedForm(dataObj);
    onClose();
  };
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
      <div className="bg-white w-full p-10 border-none">
        <div className="mb-10">
          <Button
            onClick={() => onClose()}
            className="bg-transparent flex flex-row text-black hover:bg-transparent text-3xl p-0"
          >
            <ArrowBackIosIcon className="text-4xl text-gray-500" />
            <h1 className="text-3xl font-semibold">Set CheckIn</h1>
          </Button>
        </div>
        <form onSubmit={handleGrpForm} className="flex flex-row flex-wrap">
          <div className="w-1/3 flex flex-col gap-2">
            <label className="font-semibold">Employees</label>
            <Select
              options={userOpt}
              isMulti
              value={employees}
              placeholder="Select Employees"
              onChange={(v) => setEmployees(v)}
              className="employee-names"
            />
          </div>
          <div className="w-1/3 flex flex-col gap-2">
            <label className="font-semibold">CheckIn Time</label>
            <TimePicker
              value={checkIn}
              abel="CheckIn Time"
              onChange={(time) => setCheckIn(time)}
              className="rainbow-m-vertical_small rainbow-p-horizontal_medium rainbow-m_auto"
            />
          </div>
          <div className="w-1/3 flex flex-col gap-2">
            <label className="font-semibold">CheckOut Time</label>
            <TimePicker
              value={checkOut}
              onChange={(time) => setCheckOut(time)}
              className="rainbow-m-vertical_small rainbow-p-horizontal_medium rainbow-m_auto"
            />
          </div>
          <div className="w-1/3 flex flex-col gap-2">
            <label className="font-semibold">Lunch Start Time</label>

            <TimePicker
              value={lunchStartTime}
              onChange={(time) => setLunchStartTime(time)}
              className="rainbow-m-vertical_small rainbow-p-horizontal_medium rainbow-m_auto"
            />
          </div>
          <div className="w-1/3 flex flex-col gap-2">
            <label className="font-semibold">Lunch End Time</label>

            <TimePicker
              value={lunchEndTime}
              onChange={(time) => setLunchEndTime(time)}
              className="rainbow-m-vertical_small rainbow-p-horizontal_medium rainbow-m_auto"
            />
          </div>
          <div className="w-1/3 flex flex-col gap-2">
            <label className="font-semibold">Notes</label>

            <input
              type="text"
              value={notes}
              placeholder="Enter Notes"
              className="p-2 border-gray-200 border-2 w-4/5"
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
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
                  <div className="w-full flex flex-row justify-end">
                    <span
                      className={`${poppins.className} self-center p-2 bg-orange-400 text-white rounded-xl font-semibold hover:cursor-pointer`}
                      onClick={addNewForm}
                    >
                      Add Another Reimbursal
                    </span>
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

export default GroupedModal;
