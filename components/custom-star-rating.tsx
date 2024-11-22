"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FaStar } from "react-icons/fa";

type TCustomStarRating = {
  starColor?: string;
  rating?: number;
  setRating?: React.Dispatch<React.SetStateAction<number>>;
  readOnly?: boolean;
  className?: string;
  small?: boolean;
};

export default function CustomStarRating({
  starColor = "#FFA500",
  rating,
  setRating,
  readOnly = false,
  className,
  small,
}: TCustomStarRating) {
  const [hovered, setHovered] = useState<number>(0);

  return (
    <>
      {setRating && (
        <div className={cn("flex", className)}>
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;

            return (
              <label key={index}>
                <input
                  type="radio"
                  className="hidden"
                  value={starValue}
                  onClick={() => setRating(starValue)}
                />
                <FaStar
                  color={
                    starValue <= (hovered || rating || 0)
                      ? starColor
                      : "#D3D3D3"
                  }
                  onMouseEnter={() => {
                    setRating(starValue);
                  }}
                  onMouseLeave={() => {
                    setHovered(0);
                  }}
                  className={cn("w-5 h-5 cursor-pointer", small && "w-3 h-3")}
                />
              </label>
            );
          })}
        </div>
      )}
      {readOnly && (
        <div className={cn("flex", className)}>
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <FaStar
                key={index}
                color={starValue <= (rating || 0) ? starColor : "#D3D3D3"}
                className={cn("w-5 h-5", small && "w-3 h-3")}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
