"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#2658AC] text-white w-full lg:h-[497px] py-8 px-6 md:px-12">
      <div className="container mx-auto md:mt-[50px]">
        <div className="flex flex-col gap-[26px] md:gap-[32px]">
          <div className="md:mb-0 max-w-md">
            <Image
              src="/icons/stp-putih.png"
              alt="Solo Technopark Logo"
              width={100}
              height={46}
              className="md:w-[120px] md:h-[66px]"
            />
          </div>

          <div className="flex flex-row self-stretch justify-between items-end">
            <h3 className="w-[200px] md:w-[320px] lg:w-[451px] text-[14px] md:text-[22px] lg:text-[32px] md:font-medium">
              Solo Technopark siap wujudkan impianmu untuk belajar, berkarya,
              dan berinovasi di dunia nyata!
            </h3>

            <div className="flex flex-row gap-3 md:gap-x-12 gap-y-2 text-[12px] md:text-[16px]">
              <div className="flex flex-col gap-[12px] md:gap-[20px]">
                <Link
                  href="https://www.instagram.com/solotechnopark_official/"
                  className="flex items-center gap-2 hover:text-blue-200 transition-colors"
                >
                  <Image
                    src="/icons/instagram.svg"
                    width={14}
                    height={14}
                    alt="logo instagram"
                    className="md:w-[20px] md:h-[20px]"
                  />
                  <span>Instagram</span>
                </Link>

                <Link
                  href="https://www.tiktok.com/@solotechnopark?is_from_webapp=1&sender_device=pc"
                  className="flex items-center gap-2 hover:text-blue-200 transition-colors"
                >
                  <Image
                    src="/icons/tiktok.svg"
                    width={14}
                    height={14}
                    alt="logo tiktok"
                    className="md:w-[20px] md:h-[20px]"
                  />
                  <span>TikTok</span>
                </Link>

                <Link
                  href="https://x.com/solo_technopark"
                  className="flex items-center gap-2 hover:text-blue-200 transition-colors"
                >
                  <Image
                    src="/icons/x.svg"
                    width={14}
                    height={14}
                    alt="logo twitter"
                    className="md:w-[20px] md:h-[20px]"
                  />
                  <span>Twitter</span>
                </Link>
              </div>

              <div className="flex flex-col gap-[12px] md:gap-[20px]">
                <Link
                  href="https://www.youtube.com/channel/UCqtTWpV2tExmQ1pQQLILd2Q"
                  className="flex items-center gap-2 hover:text-blue-200 transition-colors"
                >
                  <Image
                    src="/icons/youtube.svg"
                    width={14}
                    height={14}
                    alt="logo youtube"
                    className="md:w-[20px] md:h-[20px]"
                  />
                  <span>Youtube</span>
                </Link>

                <Link
                  href="https://www.facebook.com/solotechnopark.id?mibextid=ZbWKwL"
                  className="flex items-center gap-2 hover:text-blue-200 transition-colors"
                >
                  <Image
                    src="/icons/facebook.svg"
                    width={14}
                    height={14}
                    alt="logo facebook"
                    className="md:w-[20px] md:h-[20px]"
                  />
                  <span>Facebook</span>
                </Link>

                <Link
                  href="https://www.linkedin.com/company/solo-technopark/"
                  className="flex items-center gap-2 hover:text-blue-200 transition-colors"
                >
                  <Image
                    src="/icons/linkedin.svg"
                    width={14}
                    height={14}
                    alt="logo linkedin"
                    className="md:w-[20px] md:h-[20px]"
                  />
                  <span>LinkedIn</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white mt-[36px] sm:mt-[50px] pt-4 flex flex-col md:flex-row justify-between text-sm">
          <p className="text-[8px] lg:text-[14px]">
            © 2025 Solo Technopark | All rights reserved.
          </p>
          <p className="text-[8px] lg:text-[14px]">
            Designed and Developed by IT Intern Member x Solo Technopark.
          </p>
        </div>
      </div>
    </footer>
  );
}
