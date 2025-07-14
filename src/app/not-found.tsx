import cx from "classnames";
import { poppins } from "./fonts";
import Image from "next/image";

const NotFound = () => {
  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-center py-6 ${cx(
        poppins,
        poppins.className
      )}`}
    >
      <div className="text-center">
        {/* <Image
          src={"/assets/images/404_page-not-found-1024x576.jpg"}
          width={500}
          height={500}
          alt="404"
        /> */}
      </div>
    </div>
  );
};

export default NotFound;
