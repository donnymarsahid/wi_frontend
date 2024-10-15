import Content from "@/components/about.tsx/content";
import { getData } from "../utils/fetching";
import { AboutProps } from "@/types/about";
import { ClientProps } from "@/types/client";
import { FooterProps } from "@/types/footer";

type Slug = { params: { slug: string } };

export default async function SlugProducts({ params }: Slug) {
  const about: AboutProps = await getData({
    path: `about`,
    params: {
      populate: "portfolios,banners",
    },
  });

  const clients: ClientProps = await getData({
    path: `clients`,
    params: {
      populate: "logo",
      "sort[0]": "createdAt:desc",
    },
  });

  const footer: FooterProps = await getData({
    path: `footer`,
  });

  return (
    <>
      <main className="mt-[120px] md:mt-[200px] lg:mt-[120px]">
        <Content data={about} clients={clients} footer={footer} />
      </main>
    </>
  );
}
