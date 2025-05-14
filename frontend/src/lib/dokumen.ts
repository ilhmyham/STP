// This file handles fetching documents from the database

interface Dokumen {
    id: string
    title: string
    description: string
    publishedDate: Date
    fileUrl: string
  }
  
  // Example document types that might be in your system
  const DOCUMENT_TYPES = {
    SURAT_BALASAN: "Surat Balasan Permohonan Magang",
    SURAT_PENILAIAN: "Surat Penilaian Magang",
    SERTIFIKAT: "Sertifikat Magang",
  }
  
  export async function getDokumen(): Promise<Dokumen[]> {
    try {
      // Replace this with your actual API call or database query
      // For example, using fetch to call your API:
      // const response = await fetch('/api/dokumen');
      // const data = await response.json();
      // return data;
  
      // For now, returning mock data
      return [
        {
          id: "1",
          title: DOCUMENT_TYPES.SURAT_BALASAN,
          description:
            "Surat balasan permohonan magang Anda sudah tersedia. Silakan unduh surat balasan permohonan magang Anda.",
          publishedDate: new Date("2025-03-03"),
          fileUrl: "/api/dokumen/download/1", // This would be your API endpoint to download the file
        },
        {
          id: "2",
          title: DOCUMENT_TYPES.SURAT_PENILAIAN,
          description:
            "Surat penilaian magang Anda sudah tersedia. Silakan unduh surat penilaian yang berisi evaluasi kinerja Anda selama program magang.",
          publishedDate: new Date("2025-03-03"),
          fileUrl: "/api/dokumen/download/2",
        },
        {
          id: "3",
          title: DOCUMENT_TYPES.SERTIFIKAT,
          description:
            "Sertifikat magang Anda sudah tersedia. Silakan unduh sertifikat magang Anda setelah menyelesaikan program magang.",
          publishedDate: new Date("2025-03-03"),
          fileUrl: "/api/dokumen/download/3",
        },
      ]
    } catch (error) {
      console.error("Error fetching documents:", error)
      return []
    }
  }
  