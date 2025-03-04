import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpcomingShifts from "../labor/upcomingShifts";
import HistoryShifts from "../labor/historyShift";
import CheckInModal from "./checkInModal";
import CheckOutModal from "./checkoutModal";
import LunchTimeModal from "./lunchModal";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import NotesModal from "./laborNotesModal";
import LaborReimbursalModal from "./laborReimbursalModal";
import ReimbursalModal from "./timeTrackModal";
import useStore from "@/utils/store/store";

const poppins = Poppins({
  weight: ["300", "600", "700"],
  subsets: ["latin"],
});
function TimeEntryModal({
  files,
  openFlag,
  closeModal,
  timeEntries,
  empName,
  job,
  userId,
  jobId,
  manpowerId,
  loadUserLaborData,
  assignedEmp,
  types,
}) {
  const [currentDay, setCurrentDay] = useState("");
  const [loading, setLoading] = useState(false);
  const [upcomingShifts, setUpcomingShifts] = useState([]);
  const [historyShifts, setHistoryShifts] = useState([]);
  const [checkInModal, setCheckInModal] = useState(false);
  const [checkOutModal, setCheckOutModal] = useState(false);
  const [lunchTimeModal, setLunchTimeModal] = useState(false);
  const [notesModal, setNotesModal] = useState(false);
  const [reimbursalModal, setReimbursalModal] = useState(false);
  const [reimbursalViewModal, setReimbursalViewModal] = useState(false);
  const laborFlag = useStore((state) => state.laborRefresh);
  const laborRefreshHandle = useStore((state) => state.laborRefreshHandle);
  useEffect(() => {
    setLoading(true);
    const currentDate = new Date();
    const currentDayShift = timeEntries.find(
      (i) =>
        moment(i.date).format("MM-DD-YYYY") ==
        moment(currentDate).format("MM-DD-YYYY")
    );
    console.log("currentDayShift", currentDayShift);
    setCurrentDay(currentDayShift);
    const upcomingShiftsArr = timeEntries.filter(
      (i) =>
        moment(i.date).format("MM-DD-YYYY") >
        moment(currentDate).format("MM-DD-YYYY")
    );
    const historyArr = timeEntries.filter(
      (i) =>
        moment(i.date).format("MM-DD-YYYY") <
        moment(currentDate).format("MM-DD-YYYY")
    );
    setUpcomingShifts(upcomingShiftsArr);
    setHistoryShifts(historyArr);
    setLoading(false);
  }, [openFlag, laborFlag]);
  const handleCheckInModal = (curShift) => {
    setCheckInModal(true);
  };
  const handleCheckOutModal = (curShift) => {
    setCheckOutModal(true);
  };
  const handleLunchTimeModal = (curShift) => {
    setLunchTimeModal(true);
  };
  const handleNotesModal = (curShift) => {
    setNotesModal(true);
  };
  const handleReimbursalModal = (curShift) => {
    setReimbursalModal(true);
  };
  const handleCheckIn = (checkInTime) => {
    const dataObj = {
      checkInTime: checkInTime,
      jobNo: job,
      userId: userId,
      date: currentDay.date,
    };
    axios
      .post(
        `${apiPath.prodPath}/api/manpowerUsers/setCheckIn/${manpowerId}`,
        dataObj
      )
      .then((res) => {
        loadUserLaborData();
        laborRefreshHandle(laborFlag);
      })
      .catch((err) => console.log(err));
  };
  const handleCheckOut = (checkOutTime) => {
    const dataObj = {
      checkOutTime: checkOutTime,
      jobNo: job,
      userId: userId,
      date: currentDay.date,
    };
    axios
      .post(
        `${apiPath.prodPath}/api/manpowerUsers/setCheckOut/${manpowerId}`,
        dataObj
      )
      .then((res) => {
        loadUserLaborData();
        laborRefreshHandle(laborFlag);
      })
      .catch((err) => console.log(err));
  };
  const handleLunchTime = (lunchStartTime, lunchEndTime) => {
    const dataObj = {
      lunchTimeStart: lunchStartTime,
      lunchTimeEnd: lunchEndTime,
      jobNo: job,
      userId: userId,
      date: currentDay.date,
    };
    axios
      .post(
        `${apiPath.prodPath}/api/manpowerUsers/setLunchTime/${manpowerId}`,
        dataObj
      )
      .then((res) => {
        loadUserLaborData();
        laborRefreshHandle(laborFlag);
      })
      .catch((err) => console.log(err));
  };
  const handleNotes = (notes) => {
    const dataObj = {
      notes: notes,
      jobNo: job,
      userId: userId,
      date: currentDay.date,
    };
    axios
      .post(
        `${apiPath.prodPath}/api/manpowerUsers/setLaborNotes/${manpowerId}`,
        dataObj
      )
      .then((res) => {
        loadUserLaborData();
        laborRefreshHandle(laborFlag);
      })
      .catch((err) => console.log(err));
  };
  const handleReimbursal = (data) => {
    const dataObj = {
      reimbursal: data,
      jobNo: job,
      userId: userId,
      date: currentDay.date,
    };
    axios
      .post(
        `${apiPath.prodPath}/api/manpowerUsers/setReimbursal/${manpowerId}`,
        dataObj
      )
      .then((res) => {
        loadUserLaborData();
        laborRefreshHandle(laborFlag);
      })
      .catch((err) => console.log(err));
  };
  const handleViewModal = () => {
    setReimbursalViewModal(true);
  };
  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }
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
          Time Entry Modal
        </h1>
        {loading ? (
          <>Loading...</>
        ) : currentDay == undefined ? (
          <p>No Shift has started yet</p>
        ) : (
          <div className="flex flex-col w-full">
            <div className="shadow-md p-4 flex flex-row flex-wrap justify-between gap-4 w-full">
              <div className="flex flex-col w-full">
                <h1 className="text-3xl font-semibold">{empName}</h1>
                <h1 className="text-xl font-semibold">
                  {currentDay && currentDay.dayName}
                </h1>
                <h1 className="text-lg font-semibold">
                  {currentDay && moment(currentDay.date).format("MM-DD-YYYY")}
                </h1>
              </div>
              {currentDay.dayFlag ? (
                <div className="flex flex-row w-full gap-4">
                  {currentDay.checkedIn == "" ? (
                    <button
                      onClick={() => handleCheckInModal(currentDay)}
                      className="bg-orange-400 text-white p-2 rounded-xl hover:cursor-pointer self-end"
                    >
                      Set Today's CheckIn
                    </button>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <label className="text-orange-400 font-semibold">
                        Check In
                      </label>
                      <p>CheckIn was on {tConvert(currentDay.checkedIn)}</p>
                    </div>
                  )}
                  {currentDay.checkedOut == "" ? (
                    <button
                      onClick={() => handleCheckOutModal(currentDay)}
                      className="bg-orange-400 text-white p-2 rounded-xl hover:cursor-pointer self-end"
                    >
                      Set Today's CheckOut
                    </button>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <label className="text-orange-400 font-semibold">
                        Check Out
                      </label>
                      <p>CheckOut was on {tConvert(currentDay.checkedOut)}</p>
                    </div>
                  )}
                  {currentDay.lunchTimeStart == "" ? (
                    <button
                      onClick={() => handleLunchTimeModal(currentDay)}
                      className="bg-orange-400 text-white p-2 rounded-xl hover:cursor-pointer self-end"
                    >
                      Set Today's Lunch Time
                    </button>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <label className="text-orange-400 font-semibold">
                        Lunch Time
                      </label>
                      <p>
                        Lunch Break was {tConvert(currentDay.lunchTimeStart)} -{" "}
                        {tConvert(currentDay.lunchTimeEnd)}
                      </p>
                    </div>
                  )}
                  {currentDay.notes == "" ? (
                    <button
                      onClick={() => handleNotesModal(currentDay)}
                      className="bg-orange-400 text-white p-2 rounded-xl hover:cursor-pointer self-end"
                    >
                      Set Notes
                    </button>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <label className="text-orange-400 font-semibold">
                        Notes
                      </label>
                      <p>{currentDay.notes}</p>
                    </div>
                  )}
                  {currentDay.reimbursal.length == 0 ? (
                    <button
                      onClick={() => handleReimbursalModal(currentDay)}
                      className="bg-orange-400 text-white p-2 rounded-xl hover:cursor-pointer self-end"
                    >
                      Set Reimbursal
                    </button>
                  ) : (
                    <button
                      onClick={() => handleViewModal()}
                      className="bg-orange-400 text-white p-2 rounded-xl self-end"
                    >
                      View Reimbursals
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex flex-row gap-4">
                  <button
                    onClick={() => handleCheckInModal(currentDay)}
                    className="bg-orange-400 text-white p-2 rounded-xl hover:cursor-pointer self-end"
                  >
                    Set Today's CheckIn
                  </button>
                  <button
                    onClick={() => handleCheckOutModal(currentDay)}
                    className="bg-orange-400 text-white p-2 rounded-xl hover:cursor-pointer self-end"
                  >
                    Set Today's CheckOut
                  </button>
                  <button
                    onClick={() => handleLunchTimeModal(currentDay)}
                    className="bg-orange-400 text-white p-2 rounded-xl hover:cursor-pointer self-end"
                  >
                    Set Today's Lunch Time
                  </button>
                  <button
                    onClick={() => handleNotesModal(currentDay)}
                    className="bg-orange-400 text-white p-2 rounded-xl hover:cursor-pointer self-end"
                  >
                    Set Notes
                  </button>
                  <button
                    onClick={() => handleReimbursalModal(currentDay)}
                    className="bg-orange-400 text-white p-2 rounded-xl hover:cursor-pointer self-end"
                  >
                    Set Reimbursal
                  </button>
                </div>
              )}
            </div>
            <div className="w-full">
              <Tabs defaultValue="upcoming" className="w-full">
                <TabsList className="cus-tab-wrap">
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming">
                  <UpcomingShifts shifts={upcomingShifts} />
                </TabsContent>
                <TabsContent value="history">
                  <HistoryShifts shifts={historyShifts} />
                </TabsContent>
              </Tabs>
              {checkInModal ? (
                <CheckInModal
                  handleCheckInForm={handleCheckIn}
                  open={checkInModal}
                  onClose={() => setCheckInModal(false)}
                />
              ) : null}
              {checkOutModal ? (
                <CheckOutModal
                  open={checkOutModal}
                  onClose={() => setCheckOutModal(false)}
                  handleCheckOutForm={handleCheckOut}
                />
              ) : null}
              {lunchTimeModal ? (
                <LunchTimeModal
                  open={lunchTimeModal}
                  onClose={() => setLunchTimeModal(false)}
                  handleLunchForm={handleLunchTime}
                />
              ) : null}
              {notesModal ? (
                <NotesModal
                  open={notesModal}
                  onClose={() => setNotesModal(false)}
                  handleNotesForm={handleNotes}
                />
              ) : null}
              {reimbursalModal ? (
                <LaborReimbursalModal
                  open={reimbursalModal}
                  onClose={() => setReimbursalModal(false)}
                  handleReimbursalForm={handleReimbursal}
                />
              ) : null}
              <ReimbursalModal
                openFlag={reimbursalViewModal}
                handleClose={() => setReimbursalViewModal(false)}
                data={currentDay.reimbursal}
              />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default TimeEntryModal;
