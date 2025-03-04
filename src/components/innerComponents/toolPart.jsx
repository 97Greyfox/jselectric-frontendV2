import { apiPath } from "@/utils/routes";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ToolPartForm from "../innerForms/toolPartForm";
import { Skeleton } from "@/components/ui/skeleton";
import ToolPartTable from "../innerTables/toolPartTable";
import Swal from "sweetalert2";

function ToolsPart({ toolId, parts, refreshData }) {
  const [editFlag, setEditFlag] = useState(false);
  const [allParts, setAllParts] = useState("");
  const [part, setPart] = useState("");
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState();
  const [actionFlag, setActionFlag] = useState(false);
  const [partId, setPartId] = useState("");
  useEffect(() => {
    loadTools();
  }, []);
  const loadTools = () => {
    setLoading(true);
    axios
      .get(`${apiPath.prodPath}/api/tools/`)
      .then((res) => {
        if (res.data.allTools.length) {
          const filteredParts = res.data.allTools.find((i) => i.id == toolId);
          setAllParts(filteredParts.parts);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addParts = (dataObj) => {
    let url;
    if (editFlag) {
      url = `${apiPath.prodPath}/api/tools/editPartsItems/${toolId}&&${part.id}`;
    } else {
      url = `${apiPath.prodPath}/api/tools/addPartsItems/${toolId}`;
    }
    if (editFlag) {
      axios
        .patch(url, dataObj)
        .then((res) => {
          loadTools();
          setEditFlag(false);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post(url, dataObj)
        .then((res) => {
          loadTools();
        })
        .catch((err) => console.log(err));
    }
  };
  const handleActions = (id, objData) => {
    setPartId(id);
    setItem(objData);
    setActionFlag(!actionFlag);
  };
  const editData = (obj) => {
    setPart(obj);
    setEditFlag(true);
    setActionFlag(false);
  };
  const deletePart = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Delete",
      text: "Do you really want to delete Part/Items",
      confirmButtonText: "Delete",
      showConfirmButton: true,
      cancelButtonText: "Cancel",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `${apiPath.prodPath}/api/tools/deletePartsItems/${toolId}&&${id}`
          )
          .then((res) => {
            loadTools();
            setActionFlag(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  return (
    <div>
      <ToolPartForm part={part} addParts={addParts} editFlag={editFlag} />
      {loading ? (
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[100px] w-[500px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[50px]" />
            <Skeleton className="h-4 w-[70px]" />
          </div>
        </div>
      ) : (
        <ToolPartTable
          allParts={allParts}
          editData={editData}
          deletePart={deletePart}
          loading={loading}
        />
      )}
    </div>
  );
}

export default ToolsPart;
