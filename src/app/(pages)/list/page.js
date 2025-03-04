"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "./style.scss";
import Tools from "@/components/tools";
import { pusherClient } from "@/utils/pusher";
import React, { useState, useEffect } from "react";
import useStore from "@/utils/store/store";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ToolTrackComp from "@/components/tools/toolTrack";
import NeedTagComp from "@/components/tools/needTag";
import ToolDamagedComp from "@/components/tools/toolDamage";
import Devices from "@/components/devices";
import Vehicles from "@/components/vehicles";
import Inspection from "@/components/vehicles/inspection";
import Clients from "@/components/clients";
import Schedule from "@/components/schedule";
import Tagout from "@/components/tagout";
import GeneralContract from "@/components/generalContractors";

function List() {
  const user = useStore((state) => state.user);
  const router = useRouter();
  const [activeInnerTab, setActiveInnerTab] = useState("Tools");
  useEffect(() => {
    console.log("user", user);
    if (user == null) {
      router.push("/login");
    }
    if (user !== undefined && user !== null && user.id !== undefined) {
      pusherClient.subscribe(user.id);
      const handleUpdatedChat = (updatedChat) => {
        console.log("updatedChat list", updatedChat);
        // setAllChats((allChats) =>
        //   allChats.map((chat) => {
        //     if (chat._id === updatedChat.id) {
        //       return { ...chat, messages: updatedChat.messages };
        //     } else {
        //       return chat;
        //     }
        //   })
        // );
      };
      pusherClient.bind("update-chat", handleUpdatedChat);
      return () => {
        if (user !== undefined && user !== null && user.id !== undefined) {
          pusherClient.unsubscribe(user.id);
          pusherClient.unbind("update-chat", handleUpdatedChat);
        }
      };
    }
  }, [user, activeInnerTab]);
  console.log("this is inner active", activeInnerTab);
  return (
    <div>
      <Tabs defaultValue="Tools" className="w-full">
        <TabsList className="cus-tab-wrap">
          <TabsTrigger value="Tools">
            <span onClick={() => setActiveInnerTab("Tools")}>Tools</span>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <KeyboardArrowDownIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="cus-zindex">
                <DropdownMenuItem
                  onClick={() => setActiveInnerTab("Tool Track")}
                >
                  Tool Track
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveInnerTab("Need Tag")}>
                  Need Tag
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setActiveInnerTab("Tool Damage")}
                >
                  Tool Damage
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TabsTrigger>
          <TabsTrigger value="Devices">Devices</TabsTrigger>
          <TabsTrigger value="Vehicles">
            <span onClick={() => setActiveInnerTab("Vehicles")}>Vehicles</span>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <KeyboardArrowDownIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="cus-zindex">
                <DropdownMenuItem
                  onClick={() => setActiveInnerTab("Inspection")}
                >
                  Inspection
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TabsTrigger>
          <TabsTrigger value="client">Clients</TabsTrigger>
          <TabsTrigger value="schedule">Schedules</TabsTrigger>
          <TabsTrigger value="tagout">Lockout/Tagout</TabsTrigger>
          <TabsTrigger value="generalContractors">
            General Contractors
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Tools">
          {activeInnerTab == "Tools" ? <Tools /> : null}
          {activeInnerTab == "Tool Track" ? <ToolTrackComp /> : null}
          {activeInnerTab == "Need Tag" ? <NeedTagComp /> : null}
          {activeInnerTab == "Tool Damage" ? <ToolDamagedComp /> : null}
        </TabsContent>
        <TabsContent value="Devices">
          <Devices />
        </TabsContent>
        <TabsContent value="Vehicles">
          {activeInnerTab == "Vehicles" ? <Vehicles /> : null}
          {activeInnerTab == "Inspection" ? <Inspection /> : null}
        </TabsContent>
        <TabsContent value="client">
          <Clients />
        </TabsContent>
        <TabsContent value="schedule">
          <Schedule />
        </TabsContent>
        <TabsContent value="tagout">
          <Tagout />
        </TabsContent>
        <TabsContent value="generalContractors">
          <GeneralContract />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default List;
