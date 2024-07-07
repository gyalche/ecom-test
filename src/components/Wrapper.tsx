import React, { PropsWithChildren } from "react";

const Wrapper = ({ children }: PropsWithChildren) => {
  return <div className="p-4">{children}</div>;
};

export default Wrapper;
