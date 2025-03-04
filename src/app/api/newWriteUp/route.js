const { Resend } = require("resend");
import moment from "moment";
import { NextResponse } from "next/server";
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
export async function POST(request) {
  try {
    let dataObj = await request.json();
    console.log("$$$$", dataObj);
    const { data, error } = await resend.emails.send({
      from: "JsElectric <jselectric@jselectricmobile.com>",
      to: [
        "jwences@jselectric.com",
        "rmacias@jselectric.com",
        "lgonzales@jselectric.com",
        "kbaumhover@jselectric.com",
      ],
      subject: "New Write Up Notification From App",
      html: `<div>
      <p><strong>${dataObj.dataWriteUp.createdBy}</strong> has created a write up for <strong>${dataObj.dataWriteUp.employeeName}</strong></p>
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
//["jwences@jselectric.com","rmacias@jselectric.com","lgonzales@jselectric.com","kbaumhover@jselectric.com",]
