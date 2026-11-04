import { Button } from "@/components/ui/button/page";
import type { BerkasPesertaType } from "@/service/types";
import type { UploadedFile } from "../../infopendaftar/types";

export const PesertaBerkasCard = ({
  title,
  publishedLabel,
  publishedAt,
  file,
  type,
  editLabel = "Ubah Dokumen",
  uploadInputRef,
  updateInputRef,
  onUploadClick,
  onFileChange,
  onUpdateFile,
}: {
  title: string;
  publishedLabel: string;
  publishedAt: React.ReactNode;
  file: UploadedFile;
  type: BerkasPesertaType;
  editLabel?: string;
  uploadInputRef: React.RefObject<HTMLInputElement | null>;
  updateInputRef: React.RefObject<HTMLInputElement | null>;
  onUploadClick: (type: string) => void;
  onFileChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => void;
  onUpdateFile: (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => void;
}) => (
  <div className='bg-white rounded-2xl shadow p-6 mb-6'>
    <h2 className='text-[#29334D] font-semibold text-[22px]'>
      {title}
    </h2>
    <p className='text-[#636D7C] mt-2 mb-2 flex items-center gap-2'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='18'
        height='18'
        viewBox='0 0 18 18'
        fill='none'
      >
        <path
          d='M8.99996 15.6667C10.7681 15.6667 12.4638 14.9644 13.714 13.7141C14.9642 12.4639 15.6666 10.7682 15.6666 9.00008C15.6666 7.23197 14.9642 5.53628 13.714 4.28604C12.4638 3.03579 10.7681 2.33341 8.99996 2.33341C7.23185 2.33341 5.53616 3.03579 4.28591 4.28604C3.03567 5.53628 2.33329 7.23197 2.33329 9.00008C2.33329 10.7682 3.03567 12.4639 4.28591 13.7141C5.53616 14.9644 7.23185 15.6667 8.99996 15.6667ZM8.99996 0.666748C10.0943 0.666748 11.1779 0.882296 12.189 1.30109C13.2 1.71987 14.1187 2.3337 14.8925 3.10752C15.6663 3.88135 16.2802 4.80001 16.699 5.81105C17.1177 6.8221 17.3333 7.90573 17.3333 9.00008C17.3333 11.2102 16.4553 13.3298 14.8925 14.8926C13.3297 16.4554 11.2101 17.3334 8.99996 17.3334C4.39163 17.3334 0.666626 13.5834 0.666626 9.00008C0.666626 6.78994 1.5446 4.67033 3.1074 3.10752C4.67021 1.54472 6.78982 0.666748 8.99996 0.666748ZM9.41663 4.83341V9.20841L13.1666 11.4334L12.5416 12.4584L8.16663 9.83341V4.83341H9.41663Z'
          fill='#737F92'
        />
      </svg>
      {publishedLabel}
      {publishedAt}
    </p>

    <div className='flex flex-wrap mt-4 justify-between gap-4'>
      <Button
        className='text-sm font-semibold min-w-[300px] px-6 py-2 bg-[#49CA7B] hover:bg-green-600 text-white rounded-xl flex items-center justify-center gap-2'
        onClick={() => {
          console.log("URL:", file.url);
          if (file.url) {
            window.open(file.url, "_blank");
          }
        }}
      >
        <img
          src='/icons/show.svg'
          alt='lihat'
          className='w-5 h-5'
        />
        Lihat Dokumen
      </Button>

      <Button
        className='text-sm font-semibold min-w-[300px] px-6 py-2 bg-[#EABE4F] hover:bg-yellow-500 text-white rounded-xl flex items-center justify-center gap-2'
        onClick={() => updateInputRef.current?.click()}
      >
        <img
          src='/icons/edit.svg'
          alt='ubah'
          className='w-5 h-5'
        />
        {editLabel}
        <input
          ref={updateInputRef}
          type='file'
          accept='.pdf,.doc,.docx,.jpg,.jpeg,.png'
          style={{ display: "none" }}
          onChange={(event) =>
            onUpdateFile(event, type)
          }
        />
      </Button>

      <Button
        className='text-sm font-semibold min-w-[300px] px-6 py-2 bg-[#2658AC] hover:bg-blue-700 text-white rounded-xl flex items-center justify-center gap-2'
        onClick={() => onUploadClick(type)}
      >
        <img
          src='/icons/upload.svg'
          alt='unggah'
          className='w-5 h-5'
        />
        Unggah Dokumen
        <input
          ref={uploadInputRef}
          type='file'
          accept='.pdf,.doc,.docx,.jpg,.jpeg,.png'
          style={{ display: "none" }}
          onChange={(event) =>
            onFileChange(event, type)
          }
        />
      </Button>
    </div>
  </div>
);
