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
function VideoModal({ open, onClose, modalData }) {
  function YouTubeGetID(url) {
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
  }
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
            <h1 className="text-3xl font-semibold">Video Slides</h1>
          </Button>
        </div>
        <Carousel useKeyboardArrows={true}>
          {modalData.videos && modalData.videos.length ? (
            modalData.videos.map((inner) => {
              return (
                <div className="parent-cus-slide" key={inner.id}>
                  <iframe
                    height={500}
                    className="video"
                    title="Youtube player"
                    sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
                    src={`https://youtube.com/embed/${YouTubeGetID(
                      inner.url
                    )}?autoplay=0`}
                  ></iframe>
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

export default VideoModal;
