import Image from "next/image";
import Link from "next/link";

type PropsList = {
  notYetPaid: any[];
  packed: any[];
  sent: any[];
  finished: any[];
};

export const ListOrder = ({
  notYetPaid,
  packed,
  sent,
  finished,
}: PropsList) => {
  return (
    <div className={`lg-6 flex h-16  items-center shadow-sm`}>
      <div className=" flex w-full justify-between">
        <Link
          href={"/historytransaction?q=belum-bayar"}
          className="relative me-2 flex cursor-pointer flex-col items-center  p-2 text-xs"
        >
          <Image
            src={"/assets/icons/wallet.svg"}
            width={20}
            height={20}
            alt="icon"
          />
          <div className={`${notYetPaid?.length == 0 && "hidden"}`}>
            <span className="absolute bottom-6 right-5 rounded-full bg-blue-100 bg-blue-400 px-[6.5px] py-[2px] text-sm text-xs  text-white">
              {notYetPaid?.length ? notYetPaid?.length.toString() : "0"}
            </span>
          </div>
          <p>Belum Bayar</p>
        </Link>
        <Link
          href={"/historytransaction?q=dikemas"}
          className="relative me-2 flex cursor-pointer flex-col items-center  p-2 text-xs"
        >
          <Image
            src={"/assets/icons/box-order.svg"}
            width={20}
            height={20}
            alt="icon"
          />
          <div className={`${packed?.length == 0 && "hidden"}`}>
            <span className="absolute bottom-6 right-3 rounded-full bg-blue-100 bg-blue-400 px-[6.5px] py-[2px] text-sm text-xs  text-white">
              {packed?.length ? packed?.length.toString() : "0"}
            </span>
          </div>
          <p>Dikemas</p>
        </Link>
        <Link
          href={"/historytransaction?q=dikirim"}
          className="relative me-2 flex cursor-pointer flex-col items-center  p-2 text-xs"
        >
          <Image
            src={"/assets/icons/truck.svg"}
            width={20}
            height={20}
            alt="icon"
          />
          <div className={`${sent?.length == 0 && "hidden"}`}>
            <span className="absolute bottom-6 right-0 rounded-full bg-blue-100 bg-blue-400 px-[6.5px] py-[2px] text-sm text-xs  text-white">
              {sent?.length ? sent?.length.toString() : "0"}
            </span>
          </div>
          <p>Dikirim</p>
        </Link>
        <Link
          href={"/historytransaction?q=selesai"}
          className="relative me-2 flex cursor-pointer flex-col items-center  p-2 text-xs"
        >
          <Image
            src={"/assets/icons/complete.svg"}
            width={20}
            height={20}
            alt="icon"
          />
          <div className={`${finished?.length == 0 && "hidden"}`}>
            <span className="absolute bottom-6 right-1 rounded-full bg-blue-100 bg-blue-400 px-[6.5px] py-[2px] text-sm text-xs  text-white">
              {finished?.length ? finished?.length.toString() : "0"}
            </span>
          </div>
          <p>Selesai</p>
        </Link>
      </div>
    </div>
  );
};
