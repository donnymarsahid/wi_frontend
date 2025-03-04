import CardProduct from "../atoms/cardProduct";

type HeroCategoryClearanceProps = {
  productsClearanceResult: any;
  keyPage: string;
};

export default function Clearance({
  productsClearanceResult,
  keyPage,
}: HeroCategoryClearanceProps) {
  return (
    <>
      <div className="mt-10">
        <div className="container mx-auto">
          <div className="md:mx-10 mx-4">
            <div className=" ">
              {/* <h1 className="lg:text-[35px] md:text-[28px] lucida-bright">
                <span className="font-bold text-[#FF0000] italic ">
                  Clearance
                </span>{" "}
                Wallpaper
              </h1> */}
              <button className="lg:text-[35px] md:text-[28px] lucida-bright bg-[#10D3A2] px-4 py-1 text-white rounded-lg shadow-lg cursor-default">
                Clearance
              </button>
              <div>
                <div className="grid gap-4 lg:grid-cols-4 grid-cols-2">
                  {productsClearanceResult.map((item, index) => (
                    <CardProduct item={item} keyPage={keyPage} key={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
