interface StepIndicatorProps {
  currentStep: number;
  className?: string;
}

export default function StepIndicator({ currentStep, className }: StepIndicatorProps) {
  const steps = [
    { number: 1, title: "Informasi Data Diri" },
    { number: 2, title: "Informasi Pendidikan" },
    { number: 3, title: "Bidang dan Periode Magang" },
    { number: 4, title: "Lampiran" },
  ];

  return (
    <div className={`py-8 px-4 ${className ?? ""}`}>
      <div className="flex justify-between items-start max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="relative flex flex-col items-center justify-start flex-1 h-full">
            <div className="relative flex items-center">
              {index > 0 && (
                <div
                  className={`absolute right-full w-30 h-0.5
                    ${currentStep >= step.number ? "bg-[#2658AC]" : "bg-[#666666]"}
                  `}
                />
              )}

              <div
                className={`w-17 h-17 rounded-full flex items-center justify-center z-10 border-3
                  ${currentStep >= step.number
                    ? "border-[#2658AC] bg-white text-[#2658AC]"
                    : "border-[#666666] bg-white text-[#666666]"}
                `}
              >
                <span className="text-2xl font-medium">{step.number}</span>
              </div>
            </div>

            <span
              className={`mt-2 flex justify-center text-center text-lg md:text-lg font-medium break-words w-24
                ${currentStep >= step.number ? "text-[#2658AC]" : "text-[#666666]"}
              `}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}