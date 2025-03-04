"use client";
import { useState, useEffect } from "react";
import { apiPath } from "../../../utils/routes";
import { useRouter } from "next/navigation";
import { pusherClient } from "@/utils/pusher";

import "./style.scss";
import Image from "next/image";
import axios from "axios";
import Swal from "sweetalert2";
import useStore from "@/utils/store/store";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const user = useStore((state) => state.user);
  const storeUser = useStore((state) => state.storeUser);
  console.log("this is zustand user", user);
  useEffect(() => {
    if (user !== null && user !== undefined && user.id !== undefined) {
      pusherClient.subscribe(user.id);
      const handleUpdatedChat = (updatedChat) => {
        console.log("updatedChat login", updatedChat);
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
        if (
          user !== undefined &&
          user !== null &&
          user !== undefined &&
          user.id !== undefined
        ) {
          pusherClient.unsubscribe(user.id);
          pusherClient.unbind("update-chat", handleUpdatedChat);
        }
      };
    }
  }, [user]);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoader(true);
    const objData = {
      username,
      password,
    };
    axios
      .post(`${apiPath.prodPath}/api/users/login`, objData)
      .then((res) => {
        if (res.data.error) {
          Swal.fire({
            icon: "error",
            text: "Wrong Credentials",
          });
          setLoader(false);
        } else {
          storeUser(res.data.userInfo);
          setLoader(false);
          router.push("/");
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          text: "Wrong Credentials",
        });
        setLoader(false);
        console.log(err);
      });
  };
  return (
    <main className="flex flex-row">
      <div className="w-1/2 pr-20 pl-20 flex flex-col justify-center h-dvh main-wrap-login">
        <div className="flex flex-row justify-center">
          <Image src={"/logo.png"} width={150} height={100} alt="JS Electric" />
        </div>
        <h1 className="mb-5">Log in</h1>
        <p>Welcome back! Please enter your details.</p>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="flex flex-col mb-5 mt-5">
            <label className="mb-3">Username</label>
            <input
              className="p-2 rounded-lg inp-login-form"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 mb-5 mt-5">
            <label className="mb-3">Password</label>
            <input
              className="p-2 rounded-lg inp-login-form"
              type="password"
              placeholder="Enter your password"
              password={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-5 mt-5">
            <input
              type="submit"
              className="p-2 rounded-lg login-btn"
              value={loader ? "Loading..." : "Sign In"}
            />
          </div>
        </form>
      </div>
      <div className="w-1/2 flex flex-col flex-grow justify-center h-dvh">
        <img src={"/login-wall.png"} alt="Image of JS Electric Software" />
      </div>
    </main>
  );
}
export default LoginPage;
