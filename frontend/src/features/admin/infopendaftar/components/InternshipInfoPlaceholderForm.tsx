export const InternshipInfoPlaceholderForm = () => (
  <div className='bg-white shadow-md rounded-2xl p-6 max-w-4x mb-6'>
    <h2 className='text-lg font-semibold text-red-600 mb-6'>
      Data Informasi Magang
    </h2>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      <div className='flex flex-col gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Supervisor/Mentor
          </label>
          <input
            type='text'
            placeholder='Masukkan Nama Supervisor/Mentor'
            className='w-full px-4 py-2 border rounded-md border-gray-300'
          />
          <input
            type='text'
            placeholder='Masukkan Nama Supervisor/Mentor'
            className='w-full mt-2 px-4 py-2 border rounded-md border-gray-300'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Penempatan Magang
          </label>
          <select className='w-full px-4 py-2 border rounded-md border-gray-300 text-gray-400'>
            <option className='text-gray-400'>
              Masukkan Divisi Penempatan Magang
            </option>
          </select>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Tanggal Mulai Magang
          </label>
          <input
            type='date'
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
            placeholder='+62 8xxxxxxxxx'
            className='w-full px-4 py-2 border rounded-md border-gray-300'
          />
          <input
            type='text'
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
            placeholder='Masukkan Email Supervisor/Mentor'
            className='w-full px-4 py-2 border rounded-md border-gray-300'
          />
          <input
            type='email'
            placeholder='Masukkan Email Supervisor/Mentor'
            className='w-full mt-2 px-4 py-2 border rounded-md border-gray-300'
          />
        </div>
      </div>
    </div>
  </div>
);
