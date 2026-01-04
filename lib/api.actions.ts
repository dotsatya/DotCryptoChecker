"use server";

import qs from "query-string";

const BASE_URL = process.env.DOTCRYPTO_BASE_URL;
const API_KEY = process.env.DOTCRYPTO_API_KEY;

if (!BASE_URL || !API_KEY) {
  throw new Error("Missing base URL or API key");
}

// export async function fetcher<T>(
//   endpoint: string,
//   params?: QueryParams,
//   revalidate = 60
// ): Promise<T> {
//   const url = qs.stringifyUrl(
//     {
//       url: `${BASE_URL}/${endpoint}`,
//       query: params,
//     },
//     {
//       skipEmptyString: true,
//       skipNull: true,
//     }
//   );

//   const response = await fetch(url, {
//     headers: {
//       "x-cg-pro-api-key": API_KEY,
//       "Content-Type": "application/json",
//     } as Record<string, string>,
//     next: {
//       revalidate,
//     },
//   });

//   if (!response.ok) {
//     const errorBody: CoinGeckoErrorBody = await response.json().catch(() => ({}));

//     if (response.status === 429) {
//       // Handle "Too Many Requests" error
//       throw new Error(`API Error: ${response.status} - Too Many Requests`);
//     } else {
//       // Throw generic error for other errors
//       throw new Error(
//         `API Error: ${response.status} :${errorBody.error || response.statusText}`
//       );
//     }
//   }

//   return response.json();
// }

// export async function fetcher<T>(
//   endpoint: string,
//   params?: QueryParams,
//   revalidate = 60
// ): Promise<T> {
//   const url = qs.stringifyUrl(
//     {
//       url: `${BASE_URL}/${endpoint}`,
//       query: params,
//     },
//     {
//       skipEmptyString: true,
//       skipNull: true,
//     }
//   );

//   const retryCount = 3; // Number of retries
//   const retryDelay = 2000; // Delay between retries in milliseconds

//   for (let i = 0; i < retryCount; i++) {
//     try {
//       const response = await fetch(url, {
//         headers: {
//           "x-cg-pro-api-key": API_KEY,
//           "Content-Type": "application/json",
//         } as Record<string, string>,
//         next: {
//           revalidate,
//         },
//       });

//       if (!response.ok) {
//     const errorBody: CoinGeckoErrorBody = await response.json().catch(() => ({}));

//     if (response.status === 429) {
//       // Handle "Too Many Requests" error
//       if (i < retryCount - 1) {
//         // Retry the request after a delay
//         await new Promise((resolve) => setTimeout(resolve, retryDelay));
//         continue;
//       }
//     } else {
//       // Throw generic error for other errors
//       throw new Error(
//         `API Error: ${response.status} :${errorBody.error || response.statusText}`
//       );
//     }
//   }

//   // Store the response body in a variable
//   const responseBody = await response.json();

//   // Return the response object itself or the response body
//   return responseBody;
// }catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }

//   throw new Error("Failed to fetch data after multiple retries");
// }

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

  const retryCount = 3;
  const retryDelay = 2000;

  for (let i = 0; i < retryCount; i++) {
    try {
      const response = await fetch(url, {
        headers: {
          "x-cg-pro-api-key": API_KEY as string,
          "Content-Type": "application/json",
        },
        next: { revalidate },
      });

      // ✅ SUCCESS → read body ONCE and return
      if (response.ok) {
        return (await response.json()) as T;
      }

      // ❌ ERROR RESPONSE
      if (response.status === 429 && i < retryCount - 1) {
        await new Promise((r) => setTimeout(r, retryDelay));
        continue;
      }

      // ❌ Non-retriable error
      const errorBody: CoinGeckoErrorBody = await response
        .json()
        .catch(() => ({}));
      throw new Error(
        `API Error: ${response.status} : ${
          errorBody.error || response.statusText
        }`
      );
    } catch (error) {
      console.error("Error fetching data:", error);

      if (i === retryCount - 1) {
        throw error;
      }
    }
  }

  throw new Error("Failed to fetch data after multiple retries");
}
