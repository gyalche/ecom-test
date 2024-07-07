import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loading = () => {
  return (
    <SkeletonTheme baseColor="silver" highlightColor="silver">
      <p>
        <Skeleton width={200} height={200} />
      </p>
    </SkeletonTheme>
  );
};

export default Loading;
