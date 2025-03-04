const { Resend } = require("resend");
import moment from "moment";
import { NextResponse } from "next/server";
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
export async function POST(request) {
  try {
    let dataObj = await request.json();

    const { data, error } = await resend.emails.send({
      from: "JsElectric <jselectric@jselectricmobile.com>",
      to: dataObj.email.map((i) => {
        return `${i.email}`;
      }),
      subject: "Task Complete Notification",
      html: `<div>
      <p>The Task that was assigned to you has been marked as completed. Please login to the app and see the details of the task</p>
      <p><strong>Task Category</strong></p>
      <p>${dataObj.taskData.taskCategory}</p>
      <p><strong>Task Status</strong></p>
      <p>${dataObj.taskData.taskStatus}</p>
      <p><strong>Task Priority</strong></p>
      <p>${dataObj.taskData.taskPriority}</p>
      <p><strong>Due Date</strong></p>
      <p>${moment(dataObj.taskData.dueDate).format("MM/DD/YYYY")}</p>
      <p><strong>Task Description</strong></p>
      <p>${dataObj.taskData.description}</p>
      <p><strong>Selected Module</strong></p>
      <p>${dataObj.taskData.selectedModule.map((i) => i)}</p>
      <p><strong>Assigned By</strong></p>
      <p>${dataObj.taskData.user}</p>
      <p><strong>Assigned To</strong></p>
      <p>${dataObj.taskData.assignedTo.map((i) => i.fullname)}</p>
      </div>`,
    });
    if (error) {
      return NextResponse.json({ error });
    }
    return NextResponse.json({ dataEmail });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
