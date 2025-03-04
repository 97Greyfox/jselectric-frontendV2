"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "./style.scss";
import { pusherClient } from "@/utils/pusher";
import React, { useState, useEffect } from "react";
import useStore from "@/utils/store/store";
import { useRouter } from "next/navigation";
import InvoiceComp from "@/components/invoice";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { apiPath } from "@/utils/routes";
import TrainingComp from "@/components/training";
import WriteUpComp from "@/components/writeUp";
import ManpowerComp from "@/components/labor";
import TimeOutComp from "@/components/timeout";

function HR() {
  const user = useStore((state) => state.user);
  const router = useRouter();
  const [activeInnerTab, setActiveInnerTab] = useState("purchasingOrder");
  const [clients, setClients] = useState("");
  const [loading, setLoading] = useState(false);
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
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/clients/`)
      .then((res) => {
        setLoading(false);
        setClients(res.data.clients);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Tabs defaultValue="training" className="w-full">
        <TabsList className="cus-tab-wrap">
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="writeUp">Write Up</TabsTrigger>
          <TabsTrigger value="timeOff">Time Off Requests</TabsTrigger>
          <TabsTrigger value="labor">Labor</TabsTrigger>
        </TabsList>
        <TabsContent value="training">
          <TrainingComp user={user} />
        </TabsContent>
        <TabsContent value="writeUp">
          <WriteUpComp user={user} />
        </TabsContent>
        <TabsContent value="timeOff">
          <TimeOutComp user={user} />
        </TabsContent>
        <TabsContent value="labor">
          <ManpowerComp user={user} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default HR;
