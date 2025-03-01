import Content from "@/components/news/content";
import { getData } from "../utils/fetching";
import { NewsProps } from "@/types/news";

type Slug = { params: { slug: string } };

export default async function SlugProducts({ params }: Slug) {
  const slug = (await params).slug;
  const promos: NewsProps = await getData({
    path: `news`,
    params: {
      populate: "banner,thumbnail",
      "sort[0]": "date:desc",
      "filters[slug][$eq]": slug,
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
