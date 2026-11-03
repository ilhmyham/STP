"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import SuccessModal from "@/components/popup/signup/page";
import { useMyApp } from "./AuthProvider";
import { AuthFormDesktop } from "./AuthFormDesktop";
import { AuthFormMobile } from "./AuthFormMobile";
import type { AuthFormErrors, AuthFormValues } from "../types";

const createEmptyErrors = (): AuthFormErrors => ({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  general: "",
});

const initialValues: AuthFormValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<AuthFormValues>(initialValues);
  const [errors, setErrors] = useState<AuthFormErrors>(createEmptyErrors);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { login, register } = useMyApp();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    let valid = true;
    const newErrors = createEmptyErrors();

    if (!formData.email.trim()) {
      newErrors.email = "Email diperlukan";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Kata sandi diperlukan";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Kata sandi minimal 6 karakter";
      valid = false;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Kata sandi tidak cocok";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      if (isLogin) {
        const result = await login(formData.email, formData.password);
        if (!result.ok) {
          setErrors((prev) => ({
            ...prev,
            general: result.message ?? "Email atau password salah",
          }));
        }
        return;
      }

      const result = await register({
        name: formData.username,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      });

      if (!result.ok) {
        setErrors((prev) => ({
          ...prev,
          general: result.message ?? "Pendaftaran gagal",
        }));
        return;
      }

      setShowSuccessModal(true);
    } catch (error) {
      console.log(`auth error: ${error}`);
      setErrors((prev) => ({
        ...prev,
        general: "Terjadi kesalahan, coba lagi nanti",
      }));
    }
  };

  const viewProps = {
    isLogin,
    formData,
    errors,
    onChange: handleChange,
    onSubmit: handleSubmit,
    onToggleMode: () => setIsLogin((prev) => !prev),
  };

  return (
    <>
      <AuthFormDesktop {...viewProps} />
      <AuthFormMobile {...viewProps} />
      {showSuccessModal && (
        <SuccessModal onClose={() => setShowSuccessModal(false)} />
      )}
    </>
  );
};

export default AuthForm;
