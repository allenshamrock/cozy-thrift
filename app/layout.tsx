import type { Metadata } from "next";
import  {DM_Sans} from "next/font/google"

import "./globals.css";
const dmsans = DM_Sans({ subsets: ["latin"] });



export const metadata: Metadata = {
  title: "Cozy thrift",
  description: "Ecommerce store ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={dmsans.className}
      >
        {children}
      </body>
    </html>
  );
}
