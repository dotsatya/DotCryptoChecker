"use server";

import qs from "query-string";

const BASE_URL = process.env.DOTCRYPTO_BASE_URL;
const API_KEY = process.env.DOTCRYPTO_API_KEY;

if (!BASE_URL || !API_KEY) {
  throw new Error("Missing base URL or API key");
}

export async function fetcher<T>(
  endpoint: string,
  params?: QueryParams,
  revalidate = 60
): Promise<T> {
  const url = qs.stringifyUrl(
    {
      url: `${BASE_URL}/${endpoint}`,
      query: params,
    },
    {
      skipEmptyString: true,
      skipNull: true,
    }
  );

  const response = await fetch(url, {
    headers: {
      "x-cg-pro-api-key": API_KEY,
      "Content-Type": "application/json",
    } as Record<string, string>,
    next: {
      revalidate,
    },
  });
  if (!response.ok) {
    const errorBody: CoinGeckoErrorBody = await response
      .json()
      .catch(() => ({}));
    throw new Error(
      `API Error: ${response.status} :${errorBody.error || response.statusText}`
    );
  }
  return response.json();
}
