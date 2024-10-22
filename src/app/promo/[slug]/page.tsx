import { getData } from "@/app/utils/fetching";
import Content from "@/components/promos/content";
import { PromosProps } from "@/types/promos";
import { Metadata } from "next";
type Slug = { params: { slug: string } };

export async function generateMetadata({ params }: Slug): Promise<Metadata> {
  const promos: PromosProps = await getData({
    path: `promos`,
    params: {
      populate:
        "seo",
      "filters[slug][$eq]": params.slug,
    },
  });
  try {
    const { seo } = promos.data[0].attributes;

    // const previousImages = (await parent).openGraph?.images || [];
    return {
      title: seo.title,
      description: seo.description,
      viewport: seo.viewport,
      keywords: seo.keywords,
      robots: seo.robots,
    };
  } catch (error) {
    return {
      title: "Wallpaper Indonesia | Pusat Belanja Online Material Interior di Indonesia",
      description: "Wallpaper Indonesia merupakan pusat pembelanjaan online untuk material interior mulai dari Wallpaper, Wallfoam 3D, Vinyl Flooring, Parquet Flooring, Gordyn, Blind dan Carpet Tile. Tersedia dalam beragam motif, warna, dan merek yang sesuai dengan kebutuhan Anda.",
    };
  }
}

export default async function SlugProducts({ params }: Slug) {
  const promos: PromosProps = await getData({
    path: `promos`,
    params: {
      populate:
        "thumbnail,products,products.discount,products.images,products.brands",
      "sort[0]": "date:desc",
      "filters[slug][$eq]": params.slug,
    },
  });

  return (
    <>
      <main className="mt-[120px]">
        <Content data={promos} />
      </main>
    </>
  );
}
