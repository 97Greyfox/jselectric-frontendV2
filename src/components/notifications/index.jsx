import { apiPath } from "@/utils/routes";
import useStore from "@/utils/store/store";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";

function Notifications() {
  const { user, storeUser } = useStore();
  useEffect(() => {
    console.log("user@@@", user);
  }, [user]);
  const handleTaskNotification = (flag) => {
    console.log("flags", flag);
    axios
      .patch(`${apiPath.prodPath}/api/users/setTaskNotification/${user.id}`, {
        taskNotification: flag,
      })
      .then((res) => {
        if (res.data.error == false && user !== null) {
          user.taskNotification = flag;
          console.log("user user", user);
          storeUser(user);
          // dispatch(
          //   storeUser({
          //     userInfo: { ...user.userInfo, taskNotification: flag },
          //   })
          // );
        }
      })
      .catch((err) => console.log(err));
  };
  const handleTaskEmailNotification = (flag) => {
    axios
      .patch(
        `${apiPath.prodPath}/api/users/setTaskEmailNotification/${user.id}`,
        { taskEmailNotification: flag }
      )
      .then((res) => {
        if (res.data.error == false && user !== null) {
          user.taskEmailNotification = flag;
          console.log("user user", user);
          storeUser(user);
          // dispatch(
          //   storeUser({
          //     userInfo: { ...user.userInfo, taskEmailNotification: flag },
          //   })
          // );
        }
      })
      .catch((err) => console.log(err));
  };
  console.log("user@@@", user);
  return (
    <section className="pt-5">
      <h1 className="text-3xl font-semibold">Notifications</h1>
      <div className="flex flex-col w-full mt-10">
        <h1 className="text-lg font-semibold">Enable Task Notification</h1>
        <div className="flex flex-row justify-between pt-5">
          <p className="text-gray-400">Recieve notification all of the tasks</p>
          {user !== null ? (
            user.taskNotification == false ? (
              <span
                onClick={() => handleTaskNotification(true)}
                className="bg-orange-400 text-white rounded-xl p-2 hover:cursor-pointer"
              >
                Turn Off
              </span>
            ) : (
              <span
                onClick={() => handleTaskNotification(false)}
                className="bg-orange-400 text-white rounded-xl p-2 hover:cursor-pointer"
              >
                Turn On
              </span>
            )
          ) : (
            <span
              onClick={() => handleTaskNotification(true)}
              className="notification-btn"
            >
              On
            </span>
          )}
        </div>
      </div>
      <Divider className="mt-4 mb-4" />
      <div className="flex flex-col w-full mt-10">
        <h1 className="text-lg font-semibold">
          Turn on Task Email Notifications
        </h1>
        <div className="flex flex-row justify-between pt-5">
          <p className="text-gray-400">
            Recieve notifications of all tasks through email
          </p>
          {user !== null ? (
            user.taskEmailNotification == false ? (
              <span
                onClick={() => handleTaskEmailNotification(true)}
                className="bg-orange-400 text-white rounded-xl p-2 hover:cursor-pointer"
              >
                Turn Off
              </span>
            ) : (
              <span
                onClick={() => handleTaskEmailNotification(false)}
                className="bg-orange-400 text-white rounded-xl p-2 hover:cursor-pointer"
              >
                Turn On
              </span>
            )
          ) : (
            <span
              onClick={() => handleTaskEmailNotification(true)}
              className="notification-btn"
            >
              On
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

export default Notifications;
