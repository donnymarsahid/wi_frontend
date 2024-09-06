import { STRAPI_URL } from "@/app/utils/constans";

export async function GET(request: Request) {
  const token = request.headers.get("Authorization");

  const response = await fetch(`${STRAPI_URL}/api/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      revalidate: 0,
    },
  });

  if (response.status == 200) {
    const json = await response.json();
    return new Response(
      JSON.stringify({
        msg: "success",
        data: json,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } else {
    return new Response(
      JSON.stringify({
        err: true,
        msg: "Sesi telah berakhir.",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
