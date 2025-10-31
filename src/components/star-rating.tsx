import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";

const MAX_RATING = 5;
const MIN_RATING = 0;

interface StarRatingProps {
  rating: number;
  className?: string;
  IconClassName?: string;
  text?: string;
}

export const StarRating = ({
  rating,
  className,
  IconClassName,
  text,
}: StarRatingProps) => {
  const safeRating = Math.max(MIN_RATING, Math.min(rating, MAX_RATING));

  return (
    <div className={cn("flex items-center gap-x-1")}>
      {Array.from({ length: MAX_RATING }).map((_, index) => (
        <StarIcon
          key={index}
          className={cn(
            "size-4",
            index < safeRating ? "fill-black" : "",
            IconClassName
          )}
        />
      ))}
      {text && <p>{text}</p>}
    </div>
  );
};
