"use client"
import { useSelectedLayoutSegment } from "next/navigation";

const AdminPage = () => {
  const segment = useSelectedLayoutSegment()


    return (
        <div>
            <p>{segment}</p>
        <p>This is the admin page.</p>
        </div>
    );
}
export default AdminPage;