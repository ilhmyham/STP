"use client";

import { useState } from "react";
import { createEmptyForm } from "../lib/profileForm";
import type { ProfileFormValues } from "../types";

/** State & handler form edit profil (perilaku submit dipertahankan). */
export function useProfileForm() {
  const [formData, setFormData] =
    useState<ProfileFormValues>(createEmptyForm);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const name =
      event.target.name as keyof ProfileFormValues;
    const { value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  const resetForm = () => {
    setFormData(createEmptyForm());
  };

  return { formData, handleChange, handleSubmit, resetForm };
}
