import PusherServer from "pusher";
const Pusher = require("pusher-js");

// export const pusherServer = new PusherServer({
//   appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID,
//   key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
//   secret: process.env.NEXT_PUBLIC_PUSHER_APP_SECERET,
//   cluster: "ap2",
//   useTLS: true,
// });

export const pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
  cluster: "ap2",
});
