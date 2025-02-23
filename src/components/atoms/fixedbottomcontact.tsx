"use client";

import { CustomerServicesProps } from "@/types/customerServices";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type CustomerServices = {
  customerServices: CustomerServicesProps;
};

const FixedContact = ({ customerServices }: CustomerServices) => {
  const [showContacts, setShowContacts] = useState(false);

  const toggleContacts = () => {
    setShowContacts(!showContacts);
  };

  return (
    <div className="fixed md:bottom-[35px] bottom-[70px] md:right-[35px] right-[10px] z-[9999]">
      <button
        onClick={toggleContacts}
        className="bg-[#46BDDC] text-white md:p-4 p-[10px] rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        <Image
          src="/assets/icons/logos_whatsapp-icon.svg"
          width={35}
          height={35}
          alt="wa-logo"
        />
      </button>
      {showContacts && (
        <div className="mt-2 bg-white border border-gray-300 rounded-lg shadow-md p-4">
          <ul>
            {customerServices.data.map((item, index) => (
              <li key={index}>
                <Link
                  href={`https://api.whatsapp.com/send?phone=${item.attributes.whatsapp}&text=Halo%20Ka%20${item.attributes.name}%20Wallpaper%20Indonesia`}
                  className="text-[#46BDDC] hover:underline"
                >
                  {item.attributes.name}: {item.attributes.whatsapp}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FixedContact;
