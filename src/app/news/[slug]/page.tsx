import { getData } from "@/app/utils/fetching";
import Detail from "@/components/news/detail";
import { NewsProps } from "@/types/news";
import { Metadata } from "next";

type tParams = Promise<{ slug: string }>;

// export async function generateMetadata(props: {
//   params: tParams;
// }): Promise<Metadata> {
//   const slug = (await props.params).slug;
//   const news: NewsProps = await getData({
//     path: `news`,
//     params: {
//       populate: "seo",
//       "filters[slug][$eq]": slug,
//     },
//   });
//   try {
//     const { seo } = news.data[0].attributes;

//     // const previousImages = (await parent).openGraph?.images || [];
//     return {
//       title: seo.title,
//       description: seo.description,
//       viewport: seo.viewport,
//       keywords: seo.keywords,
//       robots: seo.robots,
//     };
//   } catch (error) {
//     return {
//       title:
//         "Wallpaper Indonesia | Pusat Belanja Online Material Interior di Indonesia",
//       description:
//         "Wallpaper Indonesia merupakan pusat pembelanjaan online untuk material interior mulai dari Wallpaper, Wallfoam 3D, Vinyl Flooring, Parquet Flooring, Gordyn, Blind dan Carpet Tile. Tersedia dalam beragam motif, warna, dan merek yang sesuai dengan kebutuhan Anda.",
//     };
//   }
// }

export default async function SlugProducts(props: { params: tParams }) {
  const slug = (await props.params).slug;
  // const news: NewsProps = await getData({
  //   path: `news`,
  //   params: {
  //     populate: "thumbnail,banner",
  //     "sort[0]": "date:desc",
  //     "filters[slug][$eq]": slug,
  //   },
  // });

  return (
    <>
      <main className="mt-[120px]">
        {/* <Detail data={news} /> */}
        <Detail />
      </main>
    </>
  );
}
