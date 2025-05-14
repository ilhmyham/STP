import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "destructive" | "sunting";
};

export const Button = ({
  children,
  className = "",
  variant = "default",
  ...props
}: ButtonProps) => {
  let variantClass = "";

  if (variant === "default") {
    variantClass = "bg-[#2EBB62] text-white";
  } else if (variant === "outline") {
    variantClass = "text-white hover:bg-[#2e3d6a] hover:text-white";
  } else if (variant === "destructive") {
    variantClass =
      "bg-white border text-red-600 hover:bg-red-700 hover:text-white";
  } else if (variant === "sunting") {
    variantClass =
      "text-sm w-full md:w-auto bg-white text-black border border-[#405385] hover:bg-[#f5f6fa]";
  }

  const baseClass =
    "px-4 py-2 rounded-xl text-sm font-medium transition duration-200";

  return (
    <button className={`${baseClass} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
};
