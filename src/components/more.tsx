import { moreCategory } from "@/constants";
import Image from "next/image";
import React from "react";

type Props = {};

const More = (props: Props) => {
  return (
    <div className="w-full flex flex-col gap-6 mt-10">
      <p className="font-semibold text-[32px]">More on Chic Seduire:</p>
      <div className="w-full flex items-center- justify-center gap-3 overflow-x-auto">
        {moreCategory?.map((data) => (
          <React.Fragment key={data.label}>
            <Image
              src={data?.image}
              alt={data.label}
              height={200}
              width={200}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default More;
