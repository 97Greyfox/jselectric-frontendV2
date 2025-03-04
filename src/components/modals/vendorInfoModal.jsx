import { Modal } from "@mui/material";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import TopInfoVendorInfo from "../topInfo/topInfoVendor";
import Locations from "../vendors/location";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "../ui/button";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
function VendorInfoModal({ open, onClose, item, refreshData }) {
  const [activeTab, setActiveTab] = useState("Locations");
  const tabHandler = (e) => {
    setActiveTab(e.target.innerText);
  };
  return (
    <Modal
      anchor={"right"}
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex flex-row justify-center align-middle w-full h-full"
    >
      <div
        className="bg-white w-5/6 h-dvh p-10 border-none overflow-y-scroll"
        style={{ alignSelf: "center" }}
      >
        <div className={`${poppins.className} info-modal`}>
          <div className="mb-10">
            <Button
              onClick={() => onClose()}
              className="bg-transparent flex flex-row text-black hover:bg-transparent text-3xl p-0"
            >
              <ArrowBackIosIcon className="text-4xl text-gray-500" />
              <h1 className="text-3xl font-semibold">Open</h1>
            </Button>
          </div>
          <TopInfoVendorInfo item={item} />
        </div>
        <Tabs defaultValue="location" className="w-full">
          <TabsList className="cus-tab-wrap">
            <TabsTrigger value="location">Location</TabsTrigger>
          </TabsList>
          <TabsContent value="location">
            <Locations vendorId={item.id} />
          </TabsContent>
        </Tabs>
      </div>
    </Modal>
  );
}

export default VendorInfoModal;
