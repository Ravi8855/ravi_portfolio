import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function WebsiteLayout({ children }) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
}
