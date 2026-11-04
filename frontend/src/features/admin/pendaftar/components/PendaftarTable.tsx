import type {
  PendaftarRow,
  PendaftarStatus,
} from "../../types";

const STATUS_LABEL: Record<PendaftarStatus, string> = {
  uncheck: "Unchecked",
  diterima: "Diterima",
  ditolak: "Ditolak",
};

const statusClass = (status: PendaftarStatus) => {
  if (status === "diterima") {
    return "bg-green-100 text-green-600";
  }
  if (status === "ditolak") {
    return "bg-red-100 text-red-600";
  }
  return "bg-gray-100 text-gray-600";
};

export const PendaftarTable = ({
  rows,
  total,
  onRowClick,
  onStatusToggle,
}: {
  rows: PendaftarRow[];
  total: number;
  onRowClick: (id: number) => void;
  onStatusToggle: (
    id: number,
    currentStatus: PendaftarStatus
  ) => void;
}) => (
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
        {rows.map((row) => (
          <tr
            key={row.id}
            className='border-t border-[#F5F4F7] hover:bg-gray-100 cursor-pointer'
            onClick={() => onRowClick(row.id)}
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
                onClick={(event) => {
                  event.stopPropagation();
                  onStatusToggle(row.id, row.status);
                }}
                className={`px-3 py-1 text-sm rounded-full font-medium ${statusClass(
                  row.status
                )}`}
              >
                {STATUS_LABEL[row.status]}
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
            Menampilkan {rows.length} dari {total} data
          </td>
          <td
            colSpan={1}
            className='px-4 py-3 text-sm text-gray-700 rounded-b-2xl'
          >
            {/* Pagination menyusul setelah backend mendukungnya. */}
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
);
