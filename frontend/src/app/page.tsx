"use client";

import FAQAccordion from "@/components/faq";
import Footer from "@/components/footer/page";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-[120px] md:gap-[150px] lg:gap-[140px] xl:gap-[120px] overflow-x-hidden">
      <div className="w-full h-[800px] sm:h-[1000px] md:h-[1160px] lg:h-[712px] xl:h-[812px] bg-[linear-gradient(to_bottom,white_0%,white_50%,#ADCEFC_100%)] flex flex-col gap-[60px] lg:gap-[80px]">
        <div className="flex flex-row justify-between items-center px-7 pt-6 sm:pt-6 sm:px-17">
          <Image
            src="/icons/stp.svg"
            alt="Logo Solo Technopark"
            width={100}
            height={46}
            className="sm:w-[152px] sm:h-[84px] max-w-full"
          />

          <Link
            href="user/auth"
            className="w-[72px] h-[32px] sm:w-[100px] sm:h-[42px] px-6 sm:px-8 py-2 sm:py-3 rounded-xl outline-2 outline-offset-[-2px] outline-blue-400 inline-flex justify-center items-center gap-2.5 text-blue-400 text-sm sm:text-base font-semibold"
          >
            Login
          </Link>
        </div>

        <div className="flex justify-center items-center">
          <div className="flex flex-col lg:flex-row items-center gap-[16px] md:gap-[12px] lg:gap-[38px] xl:gap-[98px]">
            <Image
              src="/images/artwork.png"
              alt="artwork"
              width={283}
              height={224}
              className="sm:w-[523px] sm:h-[400px] lg:w-[453px] lg:h-[330px] xl:w-[523px] xl:h-[400px] max-w-full"
            />

            <div className="flex flex-col gap-[18px] md:gap-[28px] lg:gap-[18px] xl:gap-[18px] px-12 sm:px-0">
              <div className="flex flex-col items-center md:text-center lg:text-left">
                <p className="sm:self-stretch h-[28px] sm:h-[49px] justify-start text-slate-700 text-[20px] sm:text-4xl font-medium sm:font-normal">
                  Pemantauan Kerja Praktik
                </p>
                <p className="sm:self-stretch h-[28px] sm:h-[46px] sm:justify-start text-slate-700 text-[20px] sm:text-4xl font-medium sm:font-normal">
                  Solo Technopark
                </p>
              </div>

              <div className="flex flex-col gap-1 sm:gap-2 sm:w-[544px] lg:w-[386px] xl:w-[544px]">
                <p className="self-stretch h-[40px] sm:h-[28px] lg:h-[44px] xl:h-[28px] justify-start text-slate-700 text-[14px] md:text-[20px] lg:text-base sm:text-base font-normal">
                  Pantau seluruh progres magangmu dengan mudah di sini!
                </p>
                <p className="sm:w-[544px] lg:w-[386px] xl:w-[544px] text-justify justify-start text-slate-700 text-[14px] md:text-[20px] lg:text-base sm:text-base font-normal">
                  Dari status pendaftaran, penempatan magang, hingga dokumen
                  yang kamu perlukan. Semua informasi dapat diakses dalam satu
                  tempat. Dapatkan pembaruan real-time secara langsung tanpa
                  ribet. Pastikan setiap tahap magangmu berjalan lancar dan
                  tetap terkendali!
                </p>
              </div>

              <Link
                href="user/auth"
                className="w-[86px] sm:w-[100px] h-[34px] sm:h-[42px] px-4 py-3 bg-[#60A1FA] rounded-xl inline-flex justify-center items-center gap-2.5 text-white text-[14px] sm:text-base font-normal"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col mx-12 sm:mx-27 gap-[16px]">
        <div className="w-[70px] sm:w-[95px] h-[30px] sm:h-[45px] lg:h-[50px] px-6 py-3.5 bg-[#60A1FA] rounded-[10px] inline-flex justify-center items-center gap-2.5">
          <p className="w-9 h-5 justify-start text-white text-[14px] sm:text-base font-normal sm:font-semibold">
            FAQs
          </p>
        </div>

        <div className="justify-start text-slate-700 text-[18px] sm:text-2xl font-medium">
          Pertanyaan yang sering ditanyakan
        </div>

        <FAQAccordion />
      </div>

      <Footer />
    </div>
  );
}
