export type Admin = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "SUPER_ADMIN" | "ADMIN" | string;
  status: "ACTIVE" | "INACTIVE" | string;
  createdAt: string;
  updatedAt: string;
};

export interface StatusBadge {
  count: number;
  label: string;
  bgColor: string;
  circleColor: string;
}

export interface DashboardCardData {
  title: string;
  total: number;
  icon: React.ReactNode;
  statuses: StatusBadge[];
}

export interface DashboardData {
  trips: {
    total: number;
    upcoming: number;
    canceled: number;
    completed: number;
  };
  admins: Admin[];
}