"use client";
import { useState } from "react";
import logo from "../assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { navItems } from "@/constants";
import Profile from "../assets/profile.png";
import Search from "../assets/Search.png";
import Bag from "../assets/Bag.png";
import Fav from "../assets/Fav.png";
import { motion } from "framer-motion";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";
import { getBagged, getFavList } from "@/services/redux/slices/product.slice";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<boolean>(false);
  const favProduct = useSelector(getFavList);
  const bagged = useSelector(getBagged);

  const router = useRouter();

  return (
    <nav className="p-4 sticky top-0 z-10 bg-white">
      <div className="w-full mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0 cursor-pointer">
          <Image src={logo} alt="logo" onClick={() => router.push("/")} />
        </div>

        {/* Side Menu (Mobile and Tablet) */}
        {isOpen && (
          <motion.div
            animate={isOpen ? "open" : "closed"}
            variants={{
              open: { opacity: 1, x: 0 },
              closed: { opacity: 0, x: "-100%" },
            }}
            className="lg:hidden fixed inset-0 bg-gray-800 bg-opacity-75 z-50"
          >
            <div className="max-w-sm w-full bg-white h-full shadow-lg p-4 transform transition-transform ease-in-out duration-300 translate-x-full">
              <div className="flex justify-start">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col items-start justify-start space-y-2 mt-4">
                {navItems?.map(({ label, link, dropdown }) => (
                  <Link href={!dropdown ? link : ""} key={label}>
                    {label}{" "}
                    {dropdown && (
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
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Menu Links (Desktop) */}
        <div className="hidden lg:flex lg:items-center lg:space-x-6">
          {navItems?.map(({ label, link, dropdown }) => (
            <Link href={!dropdown ? link : ""} key={label}>
              {label}{" "}
              {dropdown && (
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
              )}
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-end ">
          {search && (
            <div>
              <input
                type="text"
                placeholder="search"
                className="border border-gray-500 outline-none rounded-md px-1"
              />
            </div>
          )}
          <div className="flex items-center justify-around min-w-[216px] h-[48px]">
            <Image
              src={Search}
              alt="search"
              className="cursor-pointer"
              onClick={() => setSearch(!search)}
            />
            <Badge badgeContent={bagged?.length || "0"} color="secondary">
              <Image
                src={Bag}
                alt="bag"
                className="cursor-pointer"
                onClick={() => router.push("/cart")}
              />
            </Badge>
            <Badge badgeContent={favProduct?.length || "0"} color="primary">
              <Image src={Fav} alt="fav" className="cursor-pointer" />
            </Badge>
            <Image src={Profile} alt="profile" className="profile" />
          </div>
        </div>

        {/* Menu Button (Mobile and Tablet) */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none self-end"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};
