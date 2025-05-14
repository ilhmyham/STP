"use client";
import React, {
  useState,
  useEffect,
} from "react";
import axios from "axios";
import { Button } from "@/components/ui/button/page";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Define Interfaces
interface Pendaftar {
  id_pendaftar: number;
  nama: string;
  email: string;
  noHP: string;
}

interface BidangPeminatan {
  id: number;
  nama_bidang: string;
}

interface Peserta {
  id: number;
  no: number;
  status: "On Going" | "Finished";
  bidang_peminatan_id: number;
  mentor: string;
  bidang_peminatan: BidangPeminatan;
  pendaftar: Pendaftar;
}

export const Dashboard = () => {
  const [data, setData] = useState<Peserta[]>([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/pesertas`
        );
        console.log(
          "Data dari API:",
          response.data.data
        ); // Cek data yang diterima
        setData(response.data.data);
      } catch (error) {
        console.error(
          "Error fetching data:",
          error
        );
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((row) => {
    const matchesFilter =
      filter === "All" || row.status === filter;
    const matchesSearch = row.pendaftar.nama
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const router = useRouter();
  return (
    <div className='bg-[#F4F3F6] min-h-screen p-6'>
      {/* Filter & Search Section */}
      <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4'>
        {/* Filter Buttons */}
        <div className='flex bg-[#ECEBED] rounded-xl p-1'>
          {["All", "On Going", "Finished"].map(
            (f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1 rounded-lg text-sm font-medium transition ${
                  filter === f
                    ? "bg-white text-black shadow-sm"
                    : "bg-transparent text-black"
                }`}
              >
                {f}
              </button>
            )
          )}
        </div>

        {/* Search */}
        <div className='relative w-full md:w-64 bg-white rounded-md'>
          <span className='absolute inset-y-0 left-3 flex items-center text-gray-400'>
            <Image
              src='/icons/Search.svg'
              alt='search icon'
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
                Nama Peserta
              </th>
              <th className='w-[400px] py-3 px-4 text-left'>
                Divisi
              </th>
              <th className='w-[400px] py-3 px-4 text-left'>
                Status
              </th>
              <th className='w-[400px] py-3 px-4 text-left'>
                Nama Mentor
              </th>
              <th className='w-[100px] py-3 px-4 text-left rounded-tr-2xl'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr
                key={row.id}
                className='border-t border-[#F5F4F7] hover:bg-gray-50'
                // onClick={() =>
                //   (window.location.href = `/admin/users/datapeserta/${row.id}`)
                // }
              >
                <td className='w-[100px] py-3 px-4 text-center'>
                  {index + 1}{" "}
                  {/* Menampilkan nomor urut */}
                </td>
                <td className='w-[400px] py-3 px-4'>
                  {row.pendaftar?.nama || "-"}
                </td>
                <td className='w-[400px] py-3 px-4'>
                  {row.bidang_peminatan
                    ?.nama_bidang || "-"}
                </td>
                <td className='w-[400px] py-3 px-4'>
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-medium ${
                      row.status === "Finished"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className='w-[400px] py-3 px-4'>
                  {row.mentor || "-"}
                </td>
                <td className='flex items-center space-x-4'>
                  {/* Kolom Action dengan Tombol Edit */}
                  <Button
                    onClick={() => {
                      router.push(
                        `/admin/infopendaftar/tambahdata/sunting/${row.id}`
                      );
                    }}
                    className='bg-amber-500 hover:underline cursor-pointer p-2'
                  >
                    <div className='detail__editor__icon-holder icon-holder'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='15'
                        height='15'
                        viewBox='0 0 401.523 401'
                        fill='#000000'
                      >
                        <path d='M370.59 250.973c-5.524 0-10 4.476-10 10v88.789c-.02 16.562-13.438 29.984-30 30H50c-16.563-.016-29.98-13.438-30-30V89.172c.02-16.559 13.438-29.98 30-30h88.79c5.523 0 10-4.477 10-10 0-5.52-4.477-10-10-10H50c-27.602.031-49.969 22.398-50 50v260.594c.031 27.601 22.398 49.968 50 50h280.59c27.601-.032 49.969-22.399 50-50v-88.793c0-5.524-4.477-10-10-10zm0 0'></path>
                        <path d='M376.629 13.441c-17.574-17.574-46.067-17.574-63.64 0L134.581 191.848a9.997 9.997 0 0 0-2.566 4.402l-23.461 84.7a9.997 9.997 0 0 0 12.304 12.308l84.7-23.465a9.997 9.997 0 0 0 4.402-2.566l178.402-178.41c17.547-17.587 17.547-46.055 0-63.641zM156.37 198.348 302.383 52.332l47.09 47.09-146.016 146.016zm-9.406 18.875 37.62 37.625-52.038 14.418zM374.223 74.676 363.617 85.28l-47.094-47.094 10.61-10.605c9.762-9.762 25.59-9.762 35.351 0l11.739 11.734c9.746 9.774 9.746 25.59 0 35.36zm0 0'></path>
                      </svg>
                    </div>
                  </Button>
                  <span>|</span> {/* Separator */}
                  <Button
                    onClick={() => {
                      router.push(
                        `/admin/users/datapeserta/${row.id}`
                      );
                    }}
                    className='text-blue-500 hover:underline p-2 cursor-pointer'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='15'
                      height='15'
                      viewBox='0 0 488.85 488.85'
                      fill='#000000'
                    >
                      <path d='M244.425 98.725c-93.4 0-178.1 51.1-240.6 134.1-5.1 6.8-5.1 16.3 0 23.1 62.5 83.1 147.2 134.2 240.6 134.2s178.1-51.1 240.6-134.1c5.1-6.8 5.1-16.3 0-23.1-62.5-83.1-147.2-134.2-240.6-134.2zm6.7 248.3c-62 3.9-113.2-47.2-109.3-109.3 3.2-51.2 44.7-92.7 95.9-95.9 62-3.9 113.2 47.2 109.3 109.3-3.3 51.1-44.8 92.6-95.9 95.9zm-3.1-47.4c-33.4 2.1-61-25.4-58.8-58.8 1.7-27.6 24.1-49.9 51.7-51.7 33.4-2.1 61 25.4 58.8 58.8-1.8 27.7-24.2 50-51.7 51.7z'></path>
                    </svg>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr className='bg-white'>
              <td
                colSpan={4}
                className='px-4 py-3 text-sm text-gray-700 rounded-b-2xl'
              ></td>
              <td
                colSpan={1}
                className='px-4 py-3 text-sm text-gray-700 rounded-b-2xl'
              >
                <button className='hover:underline cursor-pointer'>
                  Next Page &gt;
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
