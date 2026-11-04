export interface FilterTabOption {
  value: string;
  label: string;
}

export const FilterTabs = ({
  options,
  active,
  onChange,
}: {
  options: readonly FilterTabOption[];
  active: string;
  onChange: (value: string) => void;
}) => (
  <div className='flex bg-[#ECEBED] rounded-xl p-1'>
    {options.map((option) => (
      <button
        key={option.value}
        onClick={() => onChange(option.value)}
        className={`px-4 py-1 rounded-lg text-sm font-medium transition ${
          active === option.value
            ? "bg-white text-black shadow-sm"
            : "bg-transparent text-black"
        }`}
      >
        {option.label}
      </button>
    ))}
  </div>
);
