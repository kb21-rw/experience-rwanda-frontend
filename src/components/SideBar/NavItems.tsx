import Link from 'next/link';
import { ReactNode } from 'react';


interface NavItem {
  name: string;
  icon: ReactNode;
  path: string;
  exact?: boolean;
}

interface SidebarNavItemProps {
  item: NavItem;
  collapsed: boolean;
  isActive: boolean;
}

const SidebarNavItem = ({ 
  item, 
  collapsed, 
  isActive 
}: SidebarNavItemProps) => {
  return (
    <li key={item.name}>
      <Link 
        href={item.path}
        className={`flex items-center px-4 py-3 hover:bg-gray-200 ${isActive ? 'bg-gray-500' : ''}`}
      >
        <span className={collapsed ? 'mx-auto' : 'mr-3'}>
          {item.icon}
        </span>
        {!collapsed && <span>{item.name}</span>}
      </Link>
    </li>
  );
};

export default SidebarNavItem;
