import { getData } from "@/app/utils/fetching";
import Detail from "@/components/news/detail";
import { NewsProps } from "@/types/news";

type Slug = { params: { slug: string } };

export default async function SlugProducts({ params }: Slug) {
  const news: NewsProps = await getData({
    path: `news`,
    params: {
      populate: "thumbnail,banner",
      "sort[0]": "date:desc",
      "filters[slug][$eq]": params.slug,
    },
  });

  return (
    <>
      <main className="mt-[120px]">
        <Detail data={news} />
      </main>
    </>
  );
}
