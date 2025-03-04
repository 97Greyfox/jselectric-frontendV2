import Modal from "@mui/material/Modal";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "../ui/button";
import moment from "moment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ToolTopInfo from "../topInfo/toolTopInfo";
import ToolsPart from "../innerComponents/toolPart";
import ToolsPic from "../innerComponents/toolPic";
import ToolsHistory from "../innerComponents/toolHistory";

function ToolInfoModal({ open, item, handleClose, refreshData }) {
  console.log("this is item", item);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex flex-row justify-center align-middle w-full h-full"
    >
      <div
        className="bg-white w-5/6 h-dvh p-10 border-none overflow-y-scroll"
        style={{ alignSelf: "center" }}
      >
        <div className="mb-10">
          <Button
            onClick={() => handleClose()}
            className="bg-transparent flex flex-row text-black hover:bg-transparent text-3xl p-0"
          >
            <ArrowBackIosIcon className="text-4xl text-gray-500" />
            <h1 className="text-3xl font-semibold">Open</h1>
          </Button>
        </div>
        <ToolTopInfo item={item} />
        <Tabs defaultValue="parts" className="w-full">
          <TabsList className="cus-tab-wrap">
            <TabsTrigger value="parts">Parts/Item</TabsTrigger>
            <TabsTrigger value="pics">Pics/Files</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="parts">
            <ToolsPart
              parts={item.parts}
              refreshData={refreshData}
              toolId={item.id}
            />
          </TabsContent>
          <TabsContent value="pics">
            <ToolsPic toolsId={item.id} attachments={item.attachments} />
          </TabsContent>
          <TabsContent value="history">
            <ToolsHistory toolsInfo={item} />
          </TabsContent>
        </Tabs>
      </div>
    </Modal>
  );
}

export default ToolInfoModal;
