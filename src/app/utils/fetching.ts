import { STRAPI_URL } from "./constans";

type getDataProps = {
  path: string;
  headers?: HeadersInit;
  params?: Record<string, string>;
  revalidate?: number;
};
type propsAction = {
  path: string;
  method?: string;
  headers?: Record<string, string>;
  body?: Record<string, any>;
  revalidate?: number;
  params?: Record<string, any>;
};
type propsActionFormData = {
  path: string;
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  revalidate?: number;
  params?: Record<string, any>;
};
export const getData = async ({
  path,
  headers,
  revalidate,
  params,
}: getDataProps) => {
  const url = new URL(path, `${STRAPI_URL}/api/`);

  if (params) {
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        return url.searchParams.append(key, params[key]);
      }
    });
  }

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    next: {
      // revalidate: revalidate ?? 60,
      revalidate: 0,
    },
  });

  // Recommendation: handle errors
  if (!res.ok) {
    console.log(res.body);
    // This will activate the closest `error.js` Error Boundary
    // throw new Error("Failed to fetch data");
  }

  return res.json();
};

/**
 * postData
 * @param param0
 * @returns
 */
export const postData = async ({
  path,
  method,
  headers,
  body,
  revalidate,
  params,
}: propsAction) => {
  const url = new URL(path, `${STRAPI_URL}/api/`);

  if (params) {
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        return url.searchParams.append(key, params[key]);
      }
    });
  }

  const res = await fetch(url, {
    method: "POST",
    headers: headers,
    body: body instanceof FormData ? body : JSON.stringify({ data: body }), // Use FormData for file upload, otherwise use JSON.stringify
    next: {
      revalidate: revalidate ?? 60,
    },
  });

  // Recommendation: handle errors
  if (!res.ok) {
    console.log(res.body);
    // This will activate the closest `error.js` Error Boundary
    // throw new Error("Failed to fetch data");
  }

  return res.json();
};

/**
 * postDataManual
 * @param param0
 * @returns
 */
export const postDataManual = async ({
  path,
  method,
  headers,
  body,
  revalidate,
  params,
}: propsAction) => {
  const url = new URL(path, `${STRAPI_URL}/api/`);

  if (params) {
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        return url.searchParams.append(key, params[key]);
      }
    });
  }

  const res = await fetch(url, {
    method: "POST",
    headers: headers,
    body: body instanceof FormData ? body : JSON.stringify(body), // Use FormData for file upload, otherwise use JSON.stringify
    next: {
      revalidate: revalidate ?? 60,
    },
  });

  // Recommendation: handle errors
  if (!res.ok) {
    console.log(res.body);
    // This will activate the closest `error.js` Error Boundary
    // throw new Error("Failed to fetch data");
  }

  return res.json();
};

/**
 * patchData
 * @param param0
 * @returns
 */
export const patchData = async ({
  path,
  method,
  headers,
  body,
  revalidate,
  params,
}: propsAction) => {
  const url = new URL(path, `${STRAPI_URL}/api/`);

  if (params) {
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        return url.searchParams.append(key, params[key]);
      }
    });
  }

  const res = await fetch(url, {
    method: "PUT",
    headers: headers,
    body: body instanceof FormData ? body : JSON.stringify(body), // Use FormData for file upload, otherwise use JSON.stringify
    next: {
      revalidate: revalidate ?? 60,
    },
  });

  // Recommendation: handle errors
  if (!res.ok) {
    console.log(res.body);
    // This will activate the closest `error.js` Error Boundary
    // throw new Error("Failed to fetch data");
  }

  return res.json();
};
