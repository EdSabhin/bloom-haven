"use client";
import Footer from "@/src/components/sections/Footer";
import Navbar from "@/src/components/sections/Navbar";
import Homepage from "@/src/pages/Homepage";

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col justify-between items-center">
      <Navbar />
      <Homepage />
      <Footer />
    </main>
  );
}
