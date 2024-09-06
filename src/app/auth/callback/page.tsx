"use client";
import { setEncryptedLocalStorage } from "@/app/lib/utils";
import Loading from "@/app/loading";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const CallbackPage = () => {
  const params = useSearchParams();

  useEffect(() => {
    const code = params.get("code");
    if (code) {
      fetch(`/auth/api/callback?code=${code}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (response) => {
        const json = await response.json();

        if (response.status == 200 && json.token) {
          if (typeof window !== "undefined") {
            await window.localStorage.setItem(
              "token",
              setEncryptedLocalStorage(json.token) ?? ""
            );
          }
        }

        window.location.href = "/";
      });
    }
  }, [params]);

  return (
    <div>
      <Loading />
    </div>
  );
};

export default CallbackPage;
