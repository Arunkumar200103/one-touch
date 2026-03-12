"use client";

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
}

export function StepCard({
  number,
  title,
  description,
  icon,
  backgroundColor = "#EFF6FF",
  textColor = "#0066CC",
}: StepCardProps) {
  return (
    <div className="flex gap-6 items-start group animate-fade-in-up">
      <div
        className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
        style={{ backgroundColor: textColor }}
      >
        {number}
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold mb-2" style={{ color: textColor }}>
          {title}
        </h3>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>
      <div className="hidden md:flex items-center justify-center text-4xl opacity-30 group-hover:opacity-50 transition-opacity">
        {icon}
      </div>
    </div>
  );
}
