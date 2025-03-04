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

function Finance() {
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
      <Tabs defaultValue="invoice" className="w-full">
        <TabsList className="cus-tab-wrap">
          <TabsTrigger value="invoice">Invoice</TabsTrigger>
          <TabsTrigger value="statements">Statements</TabsTrigger>
        </TabsList>
        <TabsContent value="invoice">
          {loading ? (
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[300px] w-[500px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ) : (
            <InvoiceComp allClients={clients} />
          )}
        </TabsContent>
        <TabsContent value="statements">
          <>This is statement</>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Finance;
