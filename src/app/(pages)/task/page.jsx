"use client";
import Task from "@/components/task";
import useStore from "@/utils/store/store";
import React, { useState, useEffect } from "react";

function Tasks() {
  const { user } = useStore();
  return (
    <section>
      <Task user={user} />
    </section>
  );
}

export default Tasks;
