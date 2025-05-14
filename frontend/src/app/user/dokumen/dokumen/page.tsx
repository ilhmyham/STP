import Image from "next/image"
import { formatDate } from "@/lib/utils"

interface DocumentCardProps {
  title: string
  description: string
  publishedDate: Date
  fileUrl: string
}

export function DocumentCard({ title, description, publishedDate, fileUrl }: DocumentCardProps) {
  return (
    <div className="flex flex-col w-[300px] md:w-[600px] lg:w-[884px] p-5 md:px-[47px] md:py-[38px] border-[0.5px] border-[#BDCED5] rounded-[14px] md:rounded-[16px] shadow-sm gap-3">
      <div className="space-y-1">
        <p className="text-base md:text-[22px] text-[#29334D] font-medium">{title}</p>
        <p className="text-[14px] md:text-base text-[#737F92] font-Poppins">{description}</p>
      </div>

      <div className="flex flex-row gap-[6px]">
        <Image src="/icons/clock.svg" alt="clock" width={14} height={14} className="md:w-[20px] md:h-[20px]" />
        <p className="text-[12px] md:text-[14px] text-[#737F92] font-Poppins font-medium">
          Diterbitkan: {formatDate(publishedDate)}
        </p>
      </div>

      <a
        href={fileUrl}
        download
        className="flex flex-row justify-center items-center w-full bg-[#2658AC] rounded-[8px] gap-2 py-[8px]"
      >
        <Image
          src="/icons/download.svg"
          alt="Download icon"
          width={14}
          height={14}
          className="md:w-[20px] md:h-[20px]"
        />
        <span className="text-white text-[12px] sm:text-base font-semibold">Unduh Dokumen</span>
      </a>
    </div>
  )
}
