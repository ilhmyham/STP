import type {
  BidangPeminatanOption,
  InternshipInfoValues,
} from "../types";

export const InternshipInfoFields = ({
  title = "Data Informasi Magang",
  formData,
  onChange,
  bidangOptions = [],
  tanggalSelesaiName = "tanggal_selesai",
}: {
  title?: string;
  formData: InternshipInfoValues;
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => void;
  bidangOptions?: readonly BidangPeminatanOption[];
  tanggalSelesaiName?: string;
}) => (
  <div className='bg-white shadow-md rounded-2xl p-6 max-w-4x mb-6'>
    <h2 className='text-lg font-semibold text-red-600 mb-6'>
      {title}
    </h2>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <div className='flex flex-col gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Supervisor/Mentor
          </label>
          <input
            type='text'
            name='mentor'
            value={formData.mentor}
            onChange={onChange}
            placeholder='Masukkan Nama Supervisor/Mentor'
            className='w-full px-4 py-2 border rounded-md border-gray-300'
          />
          <input
            type='text'
            name='mentor_kedua'
            value={formData.mentor_kedua}
            onChange={onChange}
            placeholder='Masukkan Nama Supervisor/Mentor Kedua'
            className='w-full mt-2 px-4 py-2 border rounded-md border-gray-300'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Penempatan Magang
          </label>
          <select
            name='bidang_peminatan_id'
            value={formData.bidang_peminatan_id}
            onChange={onChange}
            className='w-full px-4 py-2 border rounded-md border-gray-300 text-gray-400'
          >
            <option value=''>
              Masukkan Divisi Penempatan Magang
            </option>
            {bidangOptions.map((bidang) => (
              <option key={bidang.id} value={bidang.id}>
                {bidang.nama_bidang}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Tanggal Mulai Magang
          </label>
          <input
            type='date'
            name='tanggal'
            value={formData.tanggal}
            onChange={onChange}
            className='w-full px-4 py-2 border rounded-md border-gray-300 text-gray-400'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Tanggal Selesai Magang
          </label>
          <input
            type='date'
            name={tanggalSelesaiName}
            value={formData.tanggal_selesai}
            onChange={onChange}
            className='w-full px-4 py-2 border rounded-md border-gray-300 text-gray-400'
          />
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            No Handphone
          </label>
          <input
            type='text'
            name='noHp'
            value={formData.noHp}
            onChange={onChange}
            placeholder='+62 8xxxxxxxxx'
            className='w-full px-4 py-2 border rounded-md border-gray-300'
          />
          <input
            type='text'
            name='noHp_kedua'
            value={formData.noHp_kedua}
            onChange={onChange}
            placeholder='+62 8xxxxxxxxx'
            className='w-full mt-2 px-4 py-2 border rounded-md border-gray-300'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Email
          </label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={onChange}
            placeholder='Masukkan Email Supervisor/Mentor'
            className='w-full px-4 py-2 border rounded-md border-gray-300'
          />
          <input
            type='email'
            name='email_kedua'
            value={formData.email_kedua}
            onChange={onChange}
            placeholder='Masukkan Email Supervisor/Mentor Kedua'
            className='w-full mt-2 px-4 py-2 border rounded-md border-gray-300'
          />
        </div>
      </div>
    </div>
  </div>
);
