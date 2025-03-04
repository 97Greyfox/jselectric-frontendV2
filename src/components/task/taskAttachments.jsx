import React, { useState, useEffect } from "react";
import TaskAttachmentForm from "./taskAttachmentForm";

function TaskAttachment({ refreshData, taskId, taskAttachments, refreshFlag }) {
  const [editFlag, setEditFlag] = useState(false);
  const [currentItem, setCurrentItem] = useState("");

  return (
    <div className="sub-task-wrapper">
      <TaskAttachmentForm attachments={taskAttachments} taskId={taskId} />
    </div>
  );
}

export default TaskAttachment;
