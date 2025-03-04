import React, { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});
import axios from "axios";
import { apiPath } from "@/utils/routes";
import moment from "moment";
import AddBadge from "./addBadge";
import { Skeleton } from "../ui/skeleton";

function BadgeTab({ refreshData, closeModal, item }) {
  const [editFlag, setEditFlag] = useState(false);
  const [infoData, setInfoData] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/users`)
      .then((res) => {
        const currentUser = res.data.allUsers.find(
          (i) => i.id == item.id
        ).badges;
        setInfoData(currentUser);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  const addBadgeHandler = (data, editFlag) => {
    let url;
    if (editFlag) {
      url = `${apiPath.prodPath}/api/users/editBadges/${item.id}`;
    } else {
      url = `${apiPath.prodPath}/api/users/addBadges/${item.id}`;
    }
    axios
      .patch(url, data)
      .then((res) => {
        setInfoData(res.data.userInd.badges);
      })
      .catch((error) => console.log(error));
  };
  return loading ? (
    <section>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[300px] w-[500px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </section>
  ) : (
    <div className="badges-tab">
      <AddBadge
        editFlag={infoData == undefined ? false : true}
        dataToBeEdited={infoData == undefined ? "" : infoData}
        addBadgeFunc={addBadgeHandler}
      />
      <div className="pt-5">
        {infoData == undefined || infoData == "" ? (
          <p>No data for badges found</p>
        ) : (
          <div className="flex flex-row gap-20">
            <div className="w-1/3 flex flex-col gap-5">
              <div className="w-100 flex flex-row justify-between">
                <label className="font-semibold text-orange-400">AISD</label>
                <p className="text-end">{infoData.AISD}</p>
              </div>
              <div className="w-100 flex flex-row justify-between">
                <label className="font-semibold text-orange-400">
                  AISD Exp Date
                </label>
                <p className="text-end">
                  {moment(infoData.AISDExpDate).format("MM-DD-YY") ==
                  "Invalid date"
                    ? ""
                    : moment(infoData.AISDExpDate).format("MM-DD-YY")}
                </p>
              </div>
              <div className="w-100 flex flex-row justify-between">
                <label className="font-semibold text-orange-400">
                  COA Water Dep
                </label>
                <p className="text-end">{infoData.COAWaterDep}</p>
              </div>
            </div>
            <div className="w-1/3 flex flex-col gap-5">
              <div className="w-100 flex flex-row justify-between">
                <label className="font-semibold text-orange-400">
                  COA Water Dept Exp Date
                </label>
                <p className="text-end">
                  {moment(infoData.COAWaterDepExpDate).format("MM-DD-YY") ==
                  "Invalid date"
                    ? ""
                    : moment(infoData.COAWaterDepExpDate).format("MM-DD-YY")}
                </p>
              </div>
              <div className="w-100 flex flex-row justify-between">
                <label className="font-semibold text-orange-400">TFC</label>
                <p className="text-end">{infoData.TFC}</p>
              </div>
              <div className="w-100 flex flex-row justify-between">
                <label className="font-semibold text-orange-400">
                  TFC Exp Date
                </label>
                <p className="text-end">
                  {moment(infoData.TFCExpDate).format("MM-DD-YY") ==
                  "Invalid date"
                    ? ""
                    : moment(infoData.TFCExpDate).format("MM-DD-YY")}
                </p>
              </div>
            </div>
            <div className="w-1/3 flex flex-col gap-5">
              <div className="w-100 flex flex-row justify-between">
                <label className="font-semibold text-orange-400">ABIA</label>
                <p className="text-end">{infoData.ABIA}</p>
              </div>
              <div className="w-100 flex flex-row justify-between">
                <label className="font-semibold text-orange-400">
                  ABIA Exp Date
                </label>
                <p className="text-end">
                  {moment(infoData.ABIAExpDate).format("MM-DD-YY") ==
                  "Invalid date"
                    ? ""
                    : moment(infoData.ABIAExpDate).format("MM-DD-YY")}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BadgeTab;
