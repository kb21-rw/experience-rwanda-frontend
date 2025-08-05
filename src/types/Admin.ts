export type Admin = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "SUPER_ADMIN" | "ADMIN" | string;
  status: "ACTIVE" | "INACTIVE" | string;
  createdAt: string;
  updatedAt: string;
  href?: string;
};

export interface StatusType {
  count: number;
  label: string;
  bgColor: string;
  circleColor: string;
}

export interface DashboardCardData {
  title: string;
  total: number;
  icon: React.ReactNode;
  statuses: StatusType[];
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

export interface Profile {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}
export interface TokenPayload {
  exp: number;
  iat: number;
  email: string;
  name: string;
  role: "ADMIN" | "SUPER_ADMIN" | "EDITOR";
}
