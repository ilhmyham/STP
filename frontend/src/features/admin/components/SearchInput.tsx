import Image from "next/image";

export const SearchInput = ({
  value,
  onChange,
  alt = "search",
}: {
  value: string;
  onChange: (value: string) => void;
  alt?: string;
}) => (
  <div className='relative w-full md:w-64 bg-white rounded-md'>
    <span className='absolute inset-y-0 left-3 flex items-center text-gray-400'>
      <Image
        src='/icons/Search.svg'
        alt={alt}
        width={18}
        height={20}
      />
    </span>
    <input
      type='text'
      placeholder='Search'
      className='w-full border border-[#E5E4E799] px-10 py-2 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300'
      value={value}
      onChange={(event) =>
        onChange(event.target.value)
      }
    />
  </div>
);
