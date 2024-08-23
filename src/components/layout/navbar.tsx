import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const whatsapp = [
    {
      name: "Nita",
      phone: "083872239021",
    },
    {
      name: "Tika",
      phone: "083872239021",
    },
  ];

  const link = [
    {
      title: "Beranda",
      url: "#",
    },
    {
      title: "Produk",
      url: "#",
    },
    {
      title: "Berita/Inspirasi",
      url: "#",
    },
    {
      title: "Tentang Kami",
      url: "#",
    },
  ];

  return (
    <div className="overflow-hidden">
      <div className="relative w-full h-4 bg-gradient-to-r from-teal-400 to-blue-400 h-[50px]">
        <div className="bg-white w-[15%] h-[50px] absolute top-2 left-0 skew-x-[30deg]"></div>
        <div className="bg-white absolute top-2 left-0 w-[5%] h-[50px]"></div>
        <div className="bg-white w-[15%] h-[50px] absolute top-2 right-0 skew-x-[-30deg]"></div>
        <div className="bg-white absolute top-2 right-0 w-[5%] h-[50px]"></div>
        <div className="absolute top-0 left-[15%] right-[15%]">
          <div className="container mx-auto">
            <div className="mx-10 lg:mx-28">
              <div className="flex w-full justify-between items-center h-[50px]">
                <div className="flex items-center">
                  <p className="text-white text-md font-medium">
                    Customer Service:{" "}
                    <a href="" className="font-bold">
                      021 3005 1603
                    </a>
                  </p>
                </div>
                <div className="flex">
                  {whatsapp.map((item, index) => (
                    <div className="flex items-center me-4" key={index}>
                      <Image
                        src="/assets/icons/logos_whatsapp-icon.svg"
                        width={25}
                        height={25}
                        alt="wa-logo"
                      />
                      <div className="ms-1 flex flex-col">
                        <p className="text-white text-xs">Whatsapp</p>
                        <p className="text-white text-xs font-bold">
                          {item.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center">
                  <div>
                    <h1>Button 1</h1>
                  </div>
                  <div>
                    <h1>Button 2</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bg-red-100">
        <div className="container mx-auto">
          <div className="mx-10 flex">
            <div>
              <Image
                src="/assets/images/logo.png"
                width={140}
                height={140}
                alt="logo"
                className="mt-[-30px]"
              />
            </div>
            <div>
              <ul className="flex items-center bg-red-300 h-full">
                {link.map((item, index) => (
                  <li key={index}>
                    <Link href={item.url} className="uppercase me-2">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
