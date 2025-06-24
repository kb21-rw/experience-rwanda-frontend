export const filterToStatus: Record<string, string> = {
  all: "ongoing",
  booked: "fully-booked",
  past: "completed",
  canceled: "canceled",
};

export function getTripsApiUrl(filter: string) {
  const status = filterToStatus[filter] || filterToStatus.all;
  return `${process.env.NEXT_PUBLIC_API_URL}/trips?status=${status}`;
}
