import type { ProfileFormValues } from "../types";

export interface ProfileFormFieldConfig {
  name: keyof ProfileFormValues;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "date";
  kind?: "text" | "select";
  options?: readonly {
    value: string;
    label: string;
  }[];
  labelClassName?: string;
}

const INPUT_CLASS =
  "w-full lg:w-[194px] xl:w-[280px] px-3 py-2 border text-sm border-[#999999] focus:outline-none focus:ring-2 focus:ring-[#3b4f81] rounded-md";
const DEFAULT_LABEL_CLASS =
  "text-[#29334D] text-[14px] md:text-base font-semibold";

export const ProfileFormField = ({
  field,
  value,
  onChange,
}: {
  field: ProfileFormFieldConfig;
  value: string;
  onChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => void;
}) => (
  <div className='flex flex-col gap-2'>
    <label
      htmlFor={field.name}
      className={
        field.labelClassName ?? DEFAULT_LABEL_CLASS
      }
    >
      {field.label}
    </label>

    {field.kind === "select" ? (
      <select
        id={field.name}
        name={field.name}
        value={value}
        onChange={onChange}
        className={INPUT_CLASS}
      >
        {field.placeholder && (
          <option value=''>
            {field.placeholder}
          </option>
        )}
        {field.options?.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        id={field.name}
        name={field.name}
        type={field.type ?? "text"}
        value={value}
        onChange={onChange}
        placeholder={field.placeholder}
        className={INPUT_CLASS}
      />
    )}
  </div>
);
