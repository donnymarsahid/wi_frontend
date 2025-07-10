import Content from "@/components/news/content";
import { getData } from "../utils/fetching";
import { NewsProps } from "@/types/news";

type tParams = Promise<{ slug: string }>;

export default async function SlugProducts(props: { params: tParams }) {
  // const slug = (await props.params).slug;
  // const promos: NewsProps = await getData({
  //   path: `news`,
  //   params: {
  //     populate: "banner,thumbnail",
  //     "sort[0]": "date:desc",
  //     "filters[slug][$eq]": slug,
  //   },
  // });

  return (
    <>
      <main className="mt-[120px]">
        {/* <Content data={promos} /> */}
        <Content />
      </main>
    </>
  );
}
