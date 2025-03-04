import Modal from "@mui/material/Modal";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Poppins } from "next/font/google";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "../ui/button";
const poppins = Poppins({
  weight: ["300", "500"],
  subsets: ["latin"],
  style: ["normal"],
});
function SlideModal({ open, onClose, modalData }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex flex-row justify-center align-middle w-full h-full"
    >
      <div className="bg-white w-5/6 h-dvh p-10 border-none overflow-y-scroll">
        <div className="mb-10">
          <Button
            onClick={() => onClose()}
            className="bg-transparent flex flex-row text-black hover:bg-transparent text-3xl p-0"
          >
            <ArrowBackIosIcon className="text-4xl text-gray-500" />
            <h1 className="text-3xl font-semibold">Slides</h1>
          </Button>
        </div>
        <Carousel useKeyboardArrows={true}>
          {modalData.attachments && modalData.attachments.length ? (
            modalData.attachments.map((inner, ind) => {
              return (
                <div key={ind} className="parent-cus-slide">
                  <img src={`${inner.fileUrl}`} className="carousel-img" />
                </div>
              );
            })
          ) : (
            <p>No Slides found</p>
          )}
        </Carousel>
      </div>
    </Modal>
  );
}

export default SlideModal;
