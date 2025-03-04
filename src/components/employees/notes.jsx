import moment from "moment";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios, { all } from "axios";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
import NoteTableComp from "./notesTable";
import useStore from "@/utils/store/store";
import { Skeleton } from "../ui/skeleton";

const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
});
function Notes({ userId }) {
  const [note, setNote] = useState("");
  const [allNotes, setAllNotes] = useState([]);
  const [editFlag, setEditFlag] = useState(false);
  const [noteId, setNoteId] = useState("");
  const currentUser = useStore((state) => state.user);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    setLoader(true);
    const allUsers = await axios
      .get(`${apiPath.prodPath}/api/users/`)
      .then((res) => {
        return res.data.allUsers;
      });
    setLoader(false);
    setAllNotes(allUsers.find((i) => i.id == userId).notes);
  };
  const handleForm = (e) => {
    e.preventDefault();
    let dataObj = {
      date: moment(new Date()).format("mm-dd-yy"),
      time: moment(new Date()).format("hh:mm A"),
      user: currentUser.fullname,
      note,
    };
    let url;
    if (editFlag) {
      url = `${apiPath.prodPath}/api/users/editNotes/${userId}`;
      dataObj.id = noteId;
    } else {
      url = `${apiPath.prodPath}/api/users/addNotes/${userId}`;
    }
    axios.patch(url, dataObj).then((res) => {
      Swal.fire({
        title: editFlag ? "Save" : "Added",
        icon: "success",
        text: "Notes added successfully",
      });
      loadUser();
      setNote("");
    });
  };
  const editNotes = (note, id) => {
    setNote(note);
    setNoteId(id);
    setEditFlag(true);
  };
  const delNote = (id) => {
    Swal.fire({
      title: "Delete",
      text: "Are you sure you want to delete the notes?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiPath.prodPath}/api/users/delNotes/${userId}&&${id}`)
          .then((res) => {
            loadUser();
          })
          .catch((err) => console.log(err));
      }
    });
  };
  return (
    <section className="notes-module">
      <form
        className={`${poppins.className} pt-4 pb-4 w-full flex flex-row flex-wrap`}
        onSubmit={handleForm}
      >
        <div className="flex flex-col gap-4 w-1/3">
          <label className={poppins.className}>Notes</label>
          <textarea
            className={`${poppins.className} p-2 border-2 border-gray-200 rounded-xl`}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            cols={10}
            rows={5}
          />
        </div>
        <div className="flex flex-col gap-4 w-1/3 justify-end">
          <input
            className={`${poppins.className} self-center p-2 bg-orange-400 text-white font-semibold rounded-xl`}
            type="submit"
            value={editFlag ? "Save" : "Add"}
          />
        </div>
      </form>
      {loader ? (
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[300px] w-[500px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ) : (
        <section className="content-wrap-notes">
          {allNotes.length == 0 ? (
            <p className={poppins.className}>No Notes Found</p>
          ) : (
            <NoteTableComp
              allNotes={allNotes}
              editHandler={(note, id) => editNotes(note, id)}
              deleteHandler={(id) => delNote(id)}
            />
          )}
        </section>
      )}
    </section>
  );
}

export default Notes;
