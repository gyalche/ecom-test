import React from "react";
import Wrapper from "./Wrapper";
import { fotterSocialMedia, navbarData } from "@/constants";
import Link from "next/link";
import footerLogo from "../assets/footerLogo.png";
import Image from "next/image";

type Props = {};

const Footer = (props: Props) => {
  return (
    <Wrapper>
      <div className="footer flex justify-around text-white">
        {navbarData?.map((data, index) => (
          <div key={data?.title} className="flex">
            <div className="flex flex-col items-start  gap-7 text-white">
              <p className="text-white">{data?.title}</p>
              <div className="flex items-start flex-col">
                {data?.subTitle?.map((val, index) => (
                  <Link key={index} href={val.url} className="link_word">
                    {val?.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
        <div className="flex flex-col gap-2">
          <Image src={footerLogo} alt="footerlogo" />
          <div className="link_word flex items-start justify-start flex-col gap-1">
            <p className="link_word">60-49 Road 11378 New York</p>
            <a href="tel:65 11 188 888">+65 11 188 888</a>
            <a href="mailto:chicseduire@gmail.com">chicseduire@gmail.com</a>
          </div>
          <div className="flex gap-4">
            {fotterSocialMedia?.map(({ icon, alt }) => (
              <Image key={alt} src={icon} alt={alt} />
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Footer;
