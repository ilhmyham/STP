import type { PesertaRow } from "../../types";
import { PesertaRowActions } from "./PesertaRowActions";

export const PesertaTable = ({
  rows,
  onEdit,
  onView,
}: {
  rows: PesertaRow[];
  onEdit: (id: number) => void;
  onView: (id: number) => void;
}) => (
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
        {rows.map((row, index) => (
          <tr
            key={row.id}
            className='border-t border-[#F5F4F7] hover:bg-gray-50'
          >
            <td className='w-[100px] py-3 px-4 text-center'>
              {index + 1}
            </td>
            <td className='w-[400px] py-3 px-4'>
              {row.pendaftar?.nama || "-"}
            </td>
            <td className='w-[400px] py-3 px-4'>
              {row.bidang_peminatan?.nama_bidang || "-"}
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
              <PesertaRowActions
                onEdit={() => onEdit(row.id)}
                onView={() => onView(row.id)}
              />
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
);
