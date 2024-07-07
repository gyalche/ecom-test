"use client";
import { filterValue, sidebarData } from "@/constants";
import { GetProduct } from "@/services/apis/product";
import { useQueries, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ReactStarsRating from "react-awesome-stars-rating";
import Skeleton from "react-loading-skeleton";
import Loading from "./loading";
import { motion } from "framer-motion";
import Bag from "../assets/addBag.png";
import addFav from "../assets/addFav.png";
const HomePageComponent = () => {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filterLabel, setFilterLabel] = useState<string>("");
  const [showColor, setShowColor] = useState<boolean>(false);
  const [showSize, setShowSize] = useState<boolean>(false);
  const [color, setColor] = useState<string>("");
  const [size, setSize] = useState<string>("");

  const { data: productData, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: GetProduct,
  });

  console.log("this is product data", productData);
  console.log("Loading", isLoading);
  //data fetch
  return (
    <div className="flex gap-5">
      {/* sidebar */}
      <div className="min-w-[187px] max-h-screen flex flex-col items-center shadow-custom sticky top-0">
        <div className="w-full h-[60px] flex items-center justify-center border-gray-200 border-b">
          <p className="font-normal text-md">All Women&apos;s</p>
        </div>
        <div className="w-full flex flex-col gap-4 items-start justify-start p-[24px]">
          {sidebarData?.map(({ label }, index) => (
            <p
              key={index}
              className="font-light text-sm cursor-pointer hover:text-blue-600"
            >
              {label}
            </p>
          ))}
        </div>
        <div className="w-full h-[60px] flex items-center justify-center border-gray-200 border-b">
          <p className="font-normal text-md">Filter by:</p>
        </div>
        <div className="w-full flex flex-col gap-4 items-start justify-start p-[24px]">
          {filterValue?.map((data, index) => (
            <div key={index} className="w-full">
              <div className="flex w-full items-center justify-between">
                <p>{data.label}</p>{" "}
                {
                  <button
                    onClick={() => {
                      setFilterLabel(data?.label);
                      if (data.label === "Color") {
                        setShowColor(!showColor);
                      } else {
                        setShowSize(!showSize);
                      }
                    }}
                  >
                    <svg
                      className="h-4 w-4 ml-1"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                }
              </div>
              {showColor && (
                <div>
                  {data.label === "Color" &&
                    data.values.map((val) => (
                      <div
                        key={val}
                        className="flex items-center justify-start gap-5"
                      >
                        <input
                          type="checkbox"
                          value={val}
                          onClick={() => {
                            {
                              color === val ? setColor("") : setColor(val);
                            }
                          }}
                          checked={val === color}
                        />
                        <p className="font-light text-sm">{val}</p>
                      </div>
                    ))}
                </div>
              )}
              {showSize && (
                <div>
                  {data.label === "Size" &&
                    data.values.map((val) => (
                      <div
                        key={val}
                        className="flex items-center justify-start gap-5"
                      >
                        <input
                          type="checkbox"
                          value={val}
                          onClick={() => {
                            {
                              size === val ? setSize("") : setSize(val);
                            }
                          }}
                          checked={val === size}
                        />
                        <p className="font-light text-sm">{val}</p>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/*dashboard*/}
      <div>
        <h1 className="font-bold text-sm sm:text-xl">
          Women’s Collection: Tops, Bottoms, Jackets + More{" "}
        </h1>
        <div className="w-full flex flex-wrap gap-2 mt-4">
          {isLoading ? (
            <>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((data) => (
                <div key={data}>
                  <Loading />
                </div>
              ))}
            </>
          ) : (
            <>
              {productData?.map((data: any) => (
                <div
                  className="relative h-[414px] w-[239px] flex flex-col gap-5 cursor-pointer items-start justify-start"
                  key={data?.id}
                >
                  {/* <Image src={data?.image} alt="image" width={100} height={100} /> */}
                  <motion.div
                    whileHover={{ opacity: [0, 1] }}
                    transition={{
                      duration: 0.25,
                      ease: "easeInOut",
                      staggerChildren: 0.5,
                      delaryChildren: 0.5,
                    }}
                    className="w-full flex items-center justify-center relative hover:bg-gray-200 bg-opacity-50"
                  >
                    <img
                      src={data?.image}
                      className="object-contain h-[200px] object-contain mix-blend-multiply"
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: [0, 1] }}
                      transition={{
                        duration: 0.25,
                        ease: "easeInOut",
                        staggerChildren: 0.5,
                      }}
                      className="w-full absolute h-full flex flex-col"
                    >
                      <motion.div
                        whileInView={{ scale: [0, 1] }}
                        whileHover={{ scale: [1, 0.9] }}
                        transition={{
                          duration: 0.25,
                        }}
                        className=" flex items-center justify-end p-1"
                      >
                        <Image
                          src={addFav}
                          alt="add to fav"
                          className="text-rex-300"
                        />
                      </motion.div>

                      <motion.div
                        whileInView={{ scale: [0, 1] }}
                        whileHover={{ scale: [1, 0.9] }}
                        transition={{
                          duration: 0.25,
                        }}
                        className="flex flex-1 items-center justify-center "
                      >
                        <button className=" p-2 rounded-xl bg-blue-950 text-white flex items-center justify-center gap-2">
                          <Image src={Bag} alt="add to bag" />
                          Add to bag
                        </button>
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  <p className=" w-full min-h-[50px] text-[16px] font-medium">
                    {data?.title.slice(0, 50)}
                  </p>
                  <p className=" w-full min-h-[10px] text-[16px] font-medium">
                    ${data?.price}
                  </p>
                  <ReactStarsRating
                    className="flex"
                    value={Math.floor(data?.rating?.rate)}
                    secondaryColor
                  />
                  {/* <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    <motion.p
                      className="text-white"
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25 }}
                    >
                      HELLO WORLD
                    </motion.p>
                  </motion.div> */}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePageComponent;
