export const ITEM_PER_PAGE = 10;
export const STATUS_CONFIG = {
  available: {
    label: "Available",
    variant: "default" as const,
    color: "bg-green-100 text-green-800",
  },
  "fully-booked": {
    label: "Fully booked",
    variant: "outline" as const,
    color: "bg-yellow-100 text-yellow-800",
  },
  ongoing: {
    label: "Ongoing",
    variant: "secondary" as const,
    color: "bg-blue-100 text-blue-800",
  },
  completed: {
    label: "Completed",
    variant: "outline" as const,
    color: "bg-teal-100 text-teal-800",
  },
  canceled: {
    label: "Canceled",
    variant: "destructive" as const,
    color: "bg-red-100 text-red-800",
  },
};
