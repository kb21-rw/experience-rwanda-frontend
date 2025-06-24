import useSWR from 'swr';
import { getTripsApiUrl } from '@/utils/tripFilters';

const fetcher = (url: string) => fetch(url, { headers: { 'Content-Type': 'application/json' } }).then(res => res.json());

export function useTrips(filter: string) {
  return useSWR(getTripsApiUrl(filter), fetcher);
}
