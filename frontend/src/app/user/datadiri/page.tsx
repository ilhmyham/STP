import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar/page";
import ApplicationForm from "@/components/applicationform";
import Footer from "@/components/footer/page";
import React from "react";

// Another named export for Home component
export default function Datadiri() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex-grow container mx-auto px-4 py-10 mb-56'>
        <ApplicationForm />
      </main>
      <Footer />
    </div>
  );
}
