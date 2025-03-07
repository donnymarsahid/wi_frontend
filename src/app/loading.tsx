"use client";

import React, { CSSProperties, useState } from "react";
import { BeatLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Loading() {
  let [color, setColor] = useState("#45BDDB");
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex h-screen w-screen items-center justify-center absolute top-0 bottom-0 right-0 left-0 bg-white z-[9999999999]">
      <div>
        <BeatLoader
          color={color}
          loading={true}
          cssOverride={override}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}
