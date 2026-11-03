"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/footer/page";
import Navbar from "@/components/navbar/page";
import Status from "@/components/Status";
import Supervisor from "@/app/user/informasi/supervisordata/page";
import Divisi from "@/app/user/informasi/divisi/page";
import TimelineMagang from "@/components/TimelineMagang";
import {
  timelineService,
  TimelineMagangData,
} from "@/service/timeline.service";

export default function Informasi() {
  const [timeline, setTimeline] =
    useState<TimelineMagangData | null>(null);

  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "1";

  useEffect(() => {
    let aktif = true;

    const fetchTimeline = async () => {
      try {
        const data = await timelineService.getTimeline(id);
        if (aktif) setTimeline(data);
      } catch (error) {
        console.error(
          "Gagal mengambil data timeline magang:",
          error
        );
      }
    };

    fetchTimeline();

    return () => {
      aktif = false;
    };
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="gap-[28px] pt-[70px] pb-[225px] flex flex-col items-center">
        <p className="text-[20px] md:text-[28px] font-semibold text-[#29334D]">
          Informasi & Status Magang
        </p>
        <Status />

        <div className="flex flex-col md:flex-row gap-[27px] w-[300px] md:w-[600px] lg:w-[900px] items-center">
          <Supervisor />
          <Divisi />
        </div>
        {timeline && <TimelineMagang {...timeline} />}
      </div>
      <Footer />
    </div>
  );
}
