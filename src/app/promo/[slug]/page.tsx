import { getData } from "@/app/utils/fetching";
import Content from "@/components/promos/content";
import { PromosProps } from "@/types/promos";
type Slug = { params: { slug: string } };

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
