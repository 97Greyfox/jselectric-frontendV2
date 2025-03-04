const { Resend } = require("resend");
import moment from "moment";
import { NextResponse } from "next/server";
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
export async function POST(request) {
  try {
    let dataObj = await request.json();

    const { data, error } = await resend.emails.send({
      from: "JsElectric <jselectric@jselectricmobile.com>",
      to: dataObj.email.map((i) => `${i}`),
      subject: "Sub Task Completed",
      html: `<div>
      <p>The Sub Task that was assigned by you has been marked as completed. Please login to the app and see the details of the sub task</p>
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
