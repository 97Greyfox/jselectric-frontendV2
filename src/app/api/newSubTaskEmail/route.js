const { Resend } = require("resend");
import moment from "moment";
import { NextResponse } from "next/server";
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
export async function POST(request) {
  try {
    const result = await request.json();
    const { data, error } = await resend.emails.send({
      from: "JsElectric <jselectric@jselectricmobile.com>",
      to: result.email.map((i) => {
        return `${i.email}`;
      }),
      subject: "New Sub Task Notification From App",
      html: `<div>
        <p>A new Sub task has been added. Please login to the app and see the details of the Sub task</p>
        <p><strong>Task Category</strong></p>
        <p>${result.dataObj.taskCategory}</p>
        <p><strong>Task Status</strong></p>
        <p>${result.dataObj.taskStatus}</p>
        <p><strong>Due Date</strong></p>
        <p>${moment(result.dataObj.dueDate).format("MM/DD/YYYY")}</p>
        <p><strong>Task Description</strong></p>
        <p>${result.dataObj.description}</p>
        <p><strong>Assigned By</strong></p>
        <p>${result.dataObj.user}</p>
        <p><strong>Assigned To</strong></p>
        <p>${result.dataObj.assignedTo.map((i) => i.fullname)}</p>
        <h2>Note:</h2>
        <p>This new sub task is against the Task</p>
        <p><strong>Task Category</strong></p>
      <p>${result.task.taskCategory}</p>
      <p><strong>Task Status</strong></p>
      <p>${result.task.taskStatus}</p>
      <p><strong>Task Priority</strong></p>
      <p>${result.task.taskPriority}</p>
      <p><strong>Due Date</strong></p>
      <p>${moment(result.task.dueDate).format("MM/DD/YYYY")}</p>
      <p><strong>Task Description</strong></p>
      <p>${result.task.description}</p>
      <p><strong>Selected Module</strong></p>
      <p>${result.task.selectedModule.map((i) => i)}</p>
      <p><strong>Assigned By</strong></p>
      <p>${result.task.user}</p>
      <p><strong>Assigned To</strong></p>
      <p>${result.task.assignedTo.map((i) => i.fullname)}</p>
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
