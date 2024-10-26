import Image from "next/image";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <Image
        unoptimized
        src="/assets/icons/loader.gif"
        width={220}
        height={220}
        alt="loading..."
      />
    </main>
  );
}
