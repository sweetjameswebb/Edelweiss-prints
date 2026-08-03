"use client";

interface Props {
  title?: string;
  placeholderColor?: string;
  className?: string;
}

export default function FramedPoster({
  title,
  placeholderColor = "#C9B49A",
  className = "",
}: Props) {
  return (
    <div
      className={`w-full h-full flex items-center justify-center ${className}`}
      style={{ backgroundColor: placeholderColor + "33" }}
    >
      <div
        className="w-3/4 h-3/4 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: placeholderColor + "66" }}
      >
        {title && (
          <span className="font-serif text-sm text-center px-2 leading-snug text-white opacity-80">
            {title}
          </span>
        )}
      </div>
    </div>
  );
}
