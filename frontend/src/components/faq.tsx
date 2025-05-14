"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems: FAQItem[] = [
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Sed non mauris vitae erat consequat auctor eu in elit.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Sed non mauris vitae erat consequat auctor eu in elit.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Sed non mauris vitae erat consequat auctor eu in elit.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Sed non mauris vitae erat consequat auctor eu in elit.",
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Sed non mauris vitae erat consequat auctor eu in elit.",
    },
  ];

  return (
    <div>
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div key={index} className="bg-[#F0F0F0] rounded-lg overflow-hidden">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
              aria-expanded={openIndex === index}
            >
              <span className="text-[#334155] font-semibold text-[14px] sm:text-[16px]">{item.question}</span>
              <Image
                src="/icons/dropdown.svg"
                alt="dropdown"
                width={9.33}
                height={5.33}
                className={cn(
                  "text-gray-500 transition-transform duration-200",
                  openIndex === index ? "transform rotate-180" : ""
                )}
              />
            </button>

            {openIndex === index && (
              <div className="px-4 pb-4">
                <p className="text-[#334155] text-[14px] sm:text-[16px]">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
