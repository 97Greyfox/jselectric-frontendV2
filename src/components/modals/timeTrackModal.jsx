import Modal from "@mui/material/Modal";
import { Poppins } from "next/font/google";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "../ui/button";
const poppins = Poppins({
  weight: ["300", "500"],
  style: ["normal"],
  subsets: ["latin"],
});
function ReimbursalModal({ openFlag, handleClose, data }) {
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
            <h1 className="text-3xl font-semibold">Reimbursal</h1>
          </Button>
        </div>
        {data.map((i) => (
          <div
            key={i._id}
            className={`${poppins.className} flex flex-row gap-4`}
          >
            <div className="flex flex-col gap-4 w-1/3">
              <label className="text-orange-400 text-lg font-semibold">
                Reimbursal Type
              </label>
              <p>{i.reimbursalType == undefined ? "N/A" : i.reimbursalType}</p>
            </div>
            <div className="w-1/3">
              <label className="text-orange-400 text-lg font-semibold">
                Amount
              </label>
              <p>{i.amount == "" ? "N/A" : i.amount}</p>
            </div>
            <div className="w-1/3">
              <label className="text-orange-400 text-lg font-semibold">
                Note
              </label>
              <p>{i.note == "" ? "N/A" : i.note}</p>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default ReimbursalModal;
