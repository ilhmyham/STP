import type { UploadedFile } from "../types";

export const PendaftarFileDisplay = ({
  label,
  file,
}: {
  label: string;
  file: UploadedFile;
}) => (
  <div className='w-auto'>
    <label className='block mb-2 font-medium text-sm text-[#636D7C]'>
      {label}
    </label>
    <div className='flex'>
      <div className='flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm bg-[#F9F9F9] flex items-center'>
        {file.name || "Tidak ada file"}
      </div>
      <button
        className={`bg-gray-300 hover:bg-gray-400 text-sm text-black px-4 py-2 rounded-r-md ${
          !file.url
            ? "cursor-not-allowed opacity-50"
            : ""
        }`}
        onClick={() =>
          file.url &&
          window.open(file.url, "_blank")
        }
        disabled={!file.url}
      >
        Lihat
      </button>
    </div>
  </div>
);
