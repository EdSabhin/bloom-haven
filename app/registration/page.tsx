"use client"
import Footer from "@/src/components/sections/Footer";
import Navbar from "@/src/components/sections/Navbar";
import Registration from "@/src/components/sections/Registration";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-between ">
      <Navbar />
      <Registration />
      <Footer />
    </div>
  );
};

export default page;
