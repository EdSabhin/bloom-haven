import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../assets/img/flower-c.png";

const Footer = () => {
  return (
    <div className="w-full flex items-center justify-between text-white bg-gradient-to-b from-rose-400 to-rose-500 px-6 py-6 gap-12 border-t border-pink-200">
      <Link className="w-full flex gap-4" href={""}>
        <Image src={Logo} width={60} height={60} alt="" className="" />
        <h1>Bloom Haven</h1>
      </Link>
      <ul className="w-full flex flex-col gap-4">
        <Link href={""}>Support</Link>
        <Link href={""}>Other Products</Link>
        <Link href={""}>Language</Link>
        <div className="w-full">Disclaimer</div>
        <div className="w-full flex flex-col justify-center gap-4">
          <h3 className="cursor-pointer hover:text-orange-200">Attributions</h3>
          <a
            href="https://www.flaticon.com/free-icons/healthcare-and-medical"
            title="healthcare and medical icons"
          >
            Healthcare and medical icons created by Reion - Flaticon
          </a>
          <a
            href="https://www.flaticon.com/free-icons/flower"
            title="flower icons"
          >
            Flower icons created by Design Circle - Flaticon
          </a>
          <a
            href="https://www.flaticon.com/free-icons/flower"
            title="flower icons"
          >
            Flower icons created by jocularityart - Flaticon
          </a>
          <a
            href="https://www.flaticon.com/free-icons/clarity"
            title="clarity icons"
          >
            Clarity icons created by artcus - Flaticon
          </a>
          <a href="https://www.pexels.com/photo/pink-and-purple-flower-field-262713/">
            Background photo by Pixabay.
          </a>
        </div>
      </ul>
    </div>
  );
};

export default Footer;
