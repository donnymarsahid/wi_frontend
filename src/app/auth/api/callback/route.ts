import { STRAPI_URL } from "@/app/utils/constans";

export async function GET(request: Request) {
  let params: any = new URL(request.url).searchParams;

  const response = await fetch(
    `${STRAPI_URL}/strapi-google-auth/user-profile`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: params.get("code"),
      }),
    }
  );

  if (response.status == 200) {
    const json = await response.json();
    return new Response(
      JSON.stringify({
        token: json.data.token,
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
        msg: "There is an error",
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
