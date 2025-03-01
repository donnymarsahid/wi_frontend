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
    <main className="flex h-screen w-full items-center justify-center absolute top-0 bottom-0 bg-white z-[99999]">
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
    </main>
  );
}
