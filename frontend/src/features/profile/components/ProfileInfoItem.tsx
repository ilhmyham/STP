export const ProfileInfoItem = ({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) => (
  <div className={`space-y-[6px] ${className}`}>
    <p className='text-[14px] md:text-[15px] text-[#737F92] font-medium'>
      {label}
    </p>
    <p className='text-[14px] md:text-4 text-[#29334D] font-semibold'>
      {value}
    </p>
  </div>
);
