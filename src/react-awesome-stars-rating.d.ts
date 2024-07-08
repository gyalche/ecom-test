declare module "react-awesome-stars-rating" {
  import * as React from "react";

  interface ReactStarsRatingProps {
    value?: number;
    size?: number;
    onChange?: (value: number) => void;
    isHalf?: boolean;
    className?: string;
    secondaryColor?: any;
    // Add more props as per the library's documentation
  }

  const ReactStarsRating: React.FC<ReactStarsRatingProps>;
  export default ReactStarsRating;
}
