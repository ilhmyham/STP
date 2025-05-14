"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

interface CustomFileInputProps {
  id: string;
  accept?: string;
  label: string;
  width?: string;
  height?: string;
  // Font styling options
  fontSize?: string;
  fontWeight?: string;
  fontColor?: string;
  fontFamily?: string;
  browseButtonBg?: string;
  browseButtonTextColor?: string;
  browseButtonHoverBg?: string;
  className?: string;
  onChange: (file: File | null) => void;
}

export default function CustomFileInput({
  id,
  accept,
  label,
  width = "70px",
  height = "40px",
  fontSize = "14px",
  fontWeight = "500",
  fontColor = "#000000",
  fontFamily = "inherit",
  browseButtonBg = "#e2e8f0", // Default light gray
  browseButtonTextColor = "#000000",
  className,
  onChange,
}: CustomFileInputProps) {
  const [fileName, setFileName] =
    useState<string>("");
  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFileName(file.name);
      onChange(file); // Pass the selected file to the parent component
    } else {
      setFileName("");
      onChange(null); // If no file selected, send null
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  // Label font style
  const labelStyle = {
    fontSize,
    fontWeight,
    color: fontColor,
    fontFamily,
  };

  const buttonStyle = {
    backgroundColor: browseButtonBg,
    color: browseButtonTextColor,
    height,
  };

  return (
    <div className='space-y-2 border-[#999999]'>
      <label
        htmlFor={id}
        className={`block mb-2 ${
          className ?? ""
        }`}
      >
        {label}
      </label>
      <div className='flex' style={{ width }}>
        <div
          className='flex-1 border border-r-0 rounded-l-md bg-white px-3 text-sm text-gray-500 cursor-pointer flex items-center'
          onClick={handleBrowseClick}
          style={{ height }}
        >
          {fileName || "Choose files"}
        </div>
        <Button
          type='button'
          variant='secondary'
          className='rounded-l-none border border-l-0 border-input bg-[#D9D9D9] text-[#444444]'
          onClick={handleBrowseClick}
          style={{ height }}
        >
          Browse
        </Button>
        <input
          ref={fileInputRef}
          id={id}
          type='file'
          accept={accept}
          className='hidden'
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
