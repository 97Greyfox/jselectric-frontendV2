import Modal from "@mui/material/Modal";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "../ui/button";
import TopInfoVehicle from "../topInfo/topVehicleInfo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VehiclePicFile from "../innerForms/vehiclePicFile";

const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function VehiclesInfo({ open, onClose, item, refreshData }) {
  const [activeTab, setActiveTab] = useState("Pics / Files");
  const tabHandler = (e) => {
    setActiveTab(e.target.innerText);
  };
  console.log("items", item);
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
            <h1 className="text-3xl font-semibold">Open</h1>
          </Button>
        </div>

        <TopInfoVehicle item={item} />
        <Tabs defaultValue="pic/files" className="w-full">
          <TabsList className="cus-tab-wrap">
            <TabsTrigger value="pic/files">Pic/Files</TabsTrigger>
          </TabsList>
          <TabsContent value="pic/files">
            <VehiclePicFile
              vehicleId={item.id}
              attachments={item.attachments}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Modal>
  );
}

export default VehiclesInfo;
