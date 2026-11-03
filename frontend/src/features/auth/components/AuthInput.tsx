import type { ChangeEvent } from "react";

interface AuthInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error: string;
}

export const AuthInput = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
}: AuthInputProps) => (
  <div className="space-y-2">
    <label htmlFor={name} className="block text-[#3b4f81] font-medium">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      placeholder={label}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#3b4f81]"
    />
    {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
  </div>
);
