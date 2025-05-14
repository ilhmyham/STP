"use client";
import React, {
  useState,
  useEffect,
} from "react";
import Image from "next/image";
import { PendaftarService } from "@/service/api";
import { useRouter } from "next/navigation";

interface Pendaftar {
  id: number;
  no: number;
  tanggal: string;
  nama: string;
  status: "uncheck" | "diterima" | "ditolak";
  divisi: string;
}

export const Dashboard = () => {
  const [data, setData] = useState<Pendaftar[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<
    string | null
  >(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<
    number | null
  >(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData =
          await PendaftarService.getAll();

        const transformedData = apiData.map(
          (item: any, index: number) => ({
            id: item.id_pendaftar,
            no: index + 1,
            tanggal: new Date(
              item.created_at
            ).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
            nama: item.nama,
            status: item.status,
            divisi:
              item.bidang_peminatan.nama_bidang, // Mengambil nama_bidang dari bidang_peminatan
          })
        );

        setData(transformedData);
      } catch (err) {
        setError("Gagal memuat data pendaftar");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStatusUpdate = async (
    id: number,
    currentStatus:
      | "uncheck"
      | "diterima"
      | "ditolak"
  ) => {
    try {
      setUpdatingId(id);

      const statusOrder: (
        | "uncheck"
        | "diterima"
        | "ditolak"
      )[] = ["uncheck", "diterima", "ditolak"];
      const currentIndex = statusOrder.indexOf(
        currentStatus
      );
      const newStatus =
        statusOrder[
          (currentIndex + 1) % statusOrder.length
        ];

      setData((prevData) =>
        prevData.map((item) =>
          item.id === id
            ? { ...item, status: newStatus }
            : item
        )
      );

      await PendaftarService.updateStatus(
        id,
        newStatus
      );
    } catch (err) {
      console.error(
        "Gagal mengupdate status:",
        err
      );

      setData((prevData) =>
        prevData.map((item) =>
          item.id === id
            ? { ...item, status: currentStatus }
            : item
        )
      );

      let errorMessage =
        "Gagal mengupdate status";
      if (err) {
        console.log(err);
      }
      setError(errorMessage);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredData = data.filter((row) => {
    const matchesFilter =
      filter === "All" || row.status === filter;
    const matchesSearch = row.nama
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className='bg-[#F4F3F6] min-h-screen p-6 flex justify-center items-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-[#F4F3F6] min-h-screen p-6 flex justify-center items-center'>
        <div className='text-red-500'>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className='bg-[#F4F3F6] min-h-screen p-6'>
      {/* Filter & Search Section */}
      <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4'>
        {/* Filter Buttons */}
        <div className='flex bg-[#ECEBED] rounded-xl p-1'>
          {[
            "All",
            "uncheck",
            "diterima",
            "ditolak",
          ].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1 rounded-lg text-sm font-medium transition ${
                filter === f
                  ? "bg-white text-black shadow-sm"
                  : "bg-transparent text-black"
              }`}
            >
              {f === "uncheck"
                ? "Unchecked"
                : f === "diterima"
                ? "Diterima"
                : f === "ditolak"
                ? "Ditolak"
                : f}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className='relative w-full md:w-64 bg-white rounded-md'>
          <span className='absolute inset-y-0 left-3 flex items-center text-gray-400'>
            <Image
              src='/icons/Search.svg'
              alt='search'
              width={18}
              height={20}
            />
          </span>
          <input
            type='text'
            placeholder='Search'
            className='w-full border border-[#E5E4E799] px-10 py-2 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300'
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>
      </div>

      {/* Table Section */}
      <div className='bg-white rounded-2xl overflow-x-auto'>
        <table className='min-w-full table-auto text-sm'>
          <thead>
            <tr className='text-gray-500 bg-[#E5E4E799]'>
              <th className='w-[100px] py-3 px-4 text-center rounded-tl-2xl'>
                No
              </th>
              <th className='w-[400px] py-3 px-4 text-left'>
                Tanggal
              </th>
              <th className='w-[400px] py-3 px-4 text-left'>
                Nama Peserta
              </th>
              <th className='w-[400px] py-3 px-4 text-left'>
                Status
              </th>
              <th className='w-[400px] py-3 px-4 text-left rounded-tr-2xl'>
                Divisi Lamaran
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr
                key={row.id}
                className='border-t border-[#F5F4F7] hover:bg-gray-100 cursor-pointer'
                onClick={() =>
                  router.push(
                    `/admin/infopendaftar/${row.id}`
                  )
                }
              >
                <td className='w-[100px] py-3 px-4 text-center'>
                  {row.no}
                </td>
                <td className='w-[400px] py-3 px-4'>
                  {row.tanggal}
                </td>
                <td className='w-[400px] py-3 px-4'>
                  {row.nama}
                </td>
                <td className='w-[400px] py-3 px-4'>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusUpdate(
                        row.id,
                        row.status
                      );
                    }}
                    className={`px-3 py-1 text-sm rounded-full font-medium ${
                      row.status === "diterima"
                        ? "bg-green-100 text-green-600"
                        : row.status === "ditolak"
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {row.status === "uncheck"
                      ? "Unchecked"
                      : row.status === "diterima"
                      ? "Diterima"
                      : "Ditolak"}
                  </button>
                </td>
                <td className='w-[400px] py-3 px-4'>
                  {row.divisi}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className='bg-white'>
              <td
                colSpan={4}
                className='px-4 py-3 text-sm text-gray-700 rounded-b-2xl'
              >
                Menampilkan {filteredData.length}{" "}
                dari {data.length} data
              </td>
              <td
                colSpan={1}
                className='px-4 py-3 text-sm text-gray-700 rounded-b-2xl'
              >
                {/* Tambahkan pagination di sini jika diperlukan */}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
