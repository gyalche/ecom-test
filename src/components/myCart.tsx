"use client";
import {
  getBagged,
  removeFromBag,
} from "@/services/redux/slices/product.slice";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStarsRating from "react-awesome-stars-rating";
type Props = {};

const MyCartCompoent = (props: Props) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [desc, setDesc] = useState<string>("");
  const bagged = useSelector(getBagged);

  const dispatch = useDispatch();

  console.log("ba", bagged);
  return (
    <>
      {bagged?.length ? (
        <div className="w-full mt-6">
          <p className="font-semibold text-[32px]">Shopping bag</p>
          <div className="w-full border-b border-gray-400 mt-5" />

          <div className="w-full h-[50px] mt-3 flex items-center justify-around">
            {["Item", "Price", "Quantity", "Total"].map((data) => (
              <p
                key={data}
                className="font-semibold text-[16px] sm:text-[30px]"
              >
                {data}
              </p>
            ))}
          </div>
          <div className="w-full border-b border-gray-400 mt-5" />
          <div className="mt-6">
            {bagged.map((data: any, index: number) => (
              <div key={data?.id} className="w-full overflow-x-auto">
                <div className="flex items-center justify-around  ">
                  {/*items*/}
                  <div className="flex justify-center w-[280px] gap-2 flex-wrap">
                    <div className="flex justify-center w-[50px] sm:w-[70px]">
                      <img
                        src={data?.image}
                        alt={data?.title}
                        className="h-[100px] object-contain"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="font-normal text-[16px]">
                        {data?.category}
                      </p>
                      <div className="hidden md:block">
                        <ReactStarsRating
                          className="flex w-[50px]"
                          value={Math.floor(data?.rating?.rate)}
                          secondaryColor
                        />
                      </div>
                      <p className="font-normal text-[16px]">
                        {data?.title.slice(0, 10)}
                      </p>
                    </div>
                  </div>

                  {/* price */}
                  <div className="w-[250px]">
                    <p className="font-normal text-[16px]">{data?.price}</p>
                  </div>
                  <div className="border-black w-[220px]">
                    <select
                      onChange={(e: any) => {
                        setQuantity(e.target.value);
                        setDesc(data?.title);
                      }}
                    >
                      {[1, 2, 3, 4, 5].map((data) => (
                        <option key={data} value={data}>
                          {data}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-between w-[150px]">
                    <p className="font-normal text-[16px] ">
                      {data?.price * (data.title === desc ? quantity : 1)}
                    </p>
                    <button
                      className="border border-red-600 px-3 rounded-lg text-red-800"
                      onClick={() => dispatch(removeFromBag(data?.id))}
                    >
                      remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full h-[500px] items-center justify-center">
          <h1>No items has been added to cart</h1>
        </div>
      )}
    </>
  );
};

export default MyCartCompoent;
