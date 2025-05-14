import Footer from "@/components/footer/page";
import Navbar from "@/components/navbar/page";
import Status from "@/app/user/informasi/statuspenerimaan/page";
import Supervisor from "@/app/user/informasi/supervisordata/page";
import Divisi from "@/app/user/informasi/divisi/page";
import TimelineMagang from "@/app/user/informasi/timelinemagang/page";

export default function Informasi() {
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
        <TimelineMagang />
      </div>
      <Footer />
    </div>
  );
}
