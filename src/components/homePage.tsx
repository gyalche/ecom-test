"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetProduct } from "@/services/apis/product";
import Image from "next/image";
import ReactStarsRating from "react-awesome-stars-rating";
import Loading from "./loading";
import { motion } from "framer-motion";
import ReactPaginate from "react-paginate";
import Bag from "../assets/addBag.png";
import addFav from "../assets/addFav.png";
import { filterValue, sidebarData } from "@/constants";
import { Pagination, Rating } from "@mui/material";
import More from "./more";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBag,
  addToFavroite,
  getBagged,
  getFavList,
  removeFromFavroite,
} from "@/services/redux/slices/product.slice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useRouter } from "next/navigation";

const HomePageComponent = () => {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filterLabel, setFilterLabel] = useState<string>("");
  const [showColor, setShowColor] = useState<boolean>(false);
  const [showSize, setShowSize] = useState<boolean>(false);
  const [color, setColor] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(0);
  const [purchas, setPurchas] = useState([]);

  const itemsPerPage = 10;

  const {
    data: productData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["todos", color, size],
    queryFn: GetProduct,
  });

  const handlePageClick = (event: any, page: any) => {
    setCurrentPage(page - 1);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = productData?.slice(offset, offset + itemsPerPage);

  const dispatch = useDispatch();
  const favProduct = useSelector(getFavList);
  const bagged = useSelector(getBagged);
  const favProd = Array.from(new Set(favProduct?.map((data: any) => data?.id)));
  const alreadyBag = Array.from(new Set(bagged?.map((data: any) => data?.id)));
  console.log("bagged", bagged);

  const addToCart = (data: any) => {
    if (!alreadyBag.includes(data.id)) {
      console.log("bdata", data);
      dispatch(addToBag(data));
    }
  };

  // useEffect(() => {
  //   localStorage.setItem("bag", JSON.stringify([]));
  // }, [purchas]);

  // console.log("purchas", purchas);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-5">
        {/* sidebar */}
        <div className="sm:flex sm:min-w-[187px] max-h-[700px] flex flex-col items-center shadow-custom sticky top-20 z-20 sm:z-0 bg-white">
          <div className="hidden sm:flex w-full h-[60px] flex items-center justify-center border-gray-200 border-b">
            <p className="font-normal text-md">All Women&apos;s</p>
          </div>
          <div className="hidden w-full sm:flex flex-col gap-4 items-start justify-start p-[24px]">
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
        {/* dashboard */}
        <div>
          <h1 className="font-bold text-sm sm:text-xl">
            Women’s Collection: Tops, Bottoms, Jackets + More{" "}
          </h1>
          <div className="w-full flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
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
                {currentItems?.map((data: any) => (
                  <div
                    className="relative h-[414px] w-[200px] flex flex-col gap-5 cursor-pointer items-center justify-start"
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
                          <>
                            {favProd.includes(data?.id) ? (
                              <FavoriteIcon
                                onClick={() =>
                                  dispatch(removeFromFavroite(data?.id))
                                }
                              />
                            ) : (
                              <Image
                                src={addFav}
                                alt="add to fav"
                                className="text-rex-300"
                                onClick={() => dispatch(addToFavroite(data))}
                              />
                            )}
                          </>
                        </motion.div>

                        <motion.div
                          whileInView={{ scale: [0, 1] }}
                          whileHover={{ scale: [1, 0.9] }}
                          transition={{
                            duration: 0.25,
                          }}
                          className="flex flex-1 items-center justify-center "
                        >
                          <button
                            className=" p-2 rounded-xl bg-blue-950 text-white flex items-center justify-center gap-2"
                            onClick={() => addToCart(data)}
                          >
                            <Image src={Bag} alt="add to bag" />
                            Add to bag
                          </button>
                        </motion.div>
                      </motion.div>
                    </motion.div>

                    <p className=" w-full min-h-[50px] text-[16px] font-medium">
                      {data?.title.slice(0, 30)}
                    </p>
                    <p className=" w-full min-h-[10px] text-[16px] font-medium">
                      ${data?.price}
                    </p>
                    <ReactStarsRating
                      className="flex"
                      value={Math.floor(data?.rating?.rate)}
                      secondaryColor
                    />
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="flex items-center justify-center mt-2">
            <Pagination
              count={Math.ceil(productData?.length / itemsPerPage) || 1}
              shape="rounded"
              onChange={handlePageClick}
            />
          </div>
        </div>
      </div>
      <More />
    </div>
  );
};

export default HomePageComponent;
