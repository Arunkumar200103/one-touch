"use client";

interface InfoCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  backgroundColor?: string;
  borderColor?: string;
  iconColor?: string;
}

export function InfoCard({
  title,
  description,
  icon,
  backgroundColor = "#F0F9FF",
  borderColor = "#0066CC",
  iconColor = "#0066CC",
}: InfoCardProps) {
  return (
    <div
      className="p-6 rounded-2xl border-l-4 transition-all duration-300 hover:shadow-lg hover:scale-105"
      style={{
        backgroundColor,
        borderColor,
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="text-3xl flex-shrink-0 mt-1"
          style={{ color: iconColor }}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-lg mb-2" style={{ color: borderColor }}>
            {title}
          </h4>
          <p className="text-gray-700 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
