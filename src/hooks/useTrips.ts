import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url, { headers: { "Content-Type": "application/json" } }).then((res) =>
    res.json()
  );

export function useTrips() {
  return useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/trips/all-with-deleted`,
    fetcher
  );
}
