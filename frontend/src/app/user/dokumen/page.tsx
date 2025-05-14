import Footer from "@/components/footer/page"
import { getDokumen } from "@/lib/dokumen"
import { DocumentCard } from "@/app/user/dokumen/dokumen/page"
import Navbar from "@/components/navbar/page"

export default async function Dokumen() {
  // Fetch documents from the database
  const dokumen = await getDokumen()

  return (
    <div>
      <Navbar />
      <div className="gap-[26px] pt-[70px] pb-[225px] flex flex-col items-center justify-center">
        <div className="items-center flex flex-col gap-3">
          <p className="text-[20px] md:text-[28px] font-semibold text-[#29334D]">Dokumen Saya</p>

          <p className="w-[300px] md:w-[600px] lg:w-[833px] text-base md:text-[20px] text-[#29334D]/75 text-center">
            Dokumen magang Anda tersedia untuk diunduh. Pastikan mengunduhnya sebelum dihapus dalam 1 bulan setelah
            periode magang berakhir!
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {dokumen.map((doc) => (
            <DocumentCard
              key={doc.id}
              title={doc.title}
              description={doc.description}
              publishedDate={doc.publishedDate}
              fileUrl={doc.fileUrl}
            />
          ))}
        </div>
      </div>
    <Footer/>
    </div>
  )
}
