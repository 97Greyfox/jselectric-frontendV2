import { Poppins } from "next/font/google";

export const metadata = {
  title: "Login",
  description: "JS Electric",
};
const poppins = Poppins({
  style: ["normal"],
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export default function LoginLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  );
}
