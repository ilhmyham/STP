"use client";

import { ProfileFormField } from "./ProfileFormField";
import { useProfileForm } from "../hooks/useProfileForm";
import {
  LEFT_FIELDS,
  RIGHT_FIELDS,
} from "../lib/profileForm";

export const ProfileForm = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    resetForm,
  } = useProfileForm();

  return (
    <div className='flex flex-col bg-white border-[0.5px] border-[#BDCED5] rounded-[12px] shadow-sm px-[36px] py-[30px] md:px-[44px] gap-[34px] w-[300px] sm:w-auto'>
      <h1 className='text-[18px] md:text-[20px] text-[#29334D] font-semibold'>
        Informasi Pribadi
      </h1>

      <form onSubmit={handleSubmit}>
        <div className='flex flex-col md:flex-row gap-6 md:gap-18'>
          <div className='space-y-6'>
            {LEFT_FIELDS.map((field) => (
              <ProfileFormField
                key={field.name}
                field={field}
                value={formData[field.name]}
                onChange={handleChange}
              />
            ))}
          </div>

          <div className='space-y-6'>
            {RIGHT_FIELDS.map((field) => (
              <ProfileFormField
                key={field.name}
                field={field}
                value={formData[field.name]}
                onChange={handleChange}
              />
            ))}
          </div>
        </div>
      </form>

      <div className='flex justify-start gap-4'>
        <button
          type='button'
          className='bg-white hover:bg-red-600 text-red-600 hover:text-white outline-1 outline-offset-[-1px] outline-red-600 w-20 px-7 py-[5px] rounded-lg inline-flex justify-center items-center gap-2.5'
          onClick={resetForm}
        >
          Batal
        </button>
        <button
          type='submit'
          className='bg-[#2658AC] hover:bg-blue-800 text-white w-20 px-7 py-[5px] rounded-lg inline-flex justify-center items-center gap-2.5'
        >
          Simpan
        </button>
      </div>
    </div>
  );
};
