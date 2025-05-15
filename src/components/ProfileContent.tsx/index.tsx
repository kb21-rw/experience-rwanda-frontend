import user from "@/data/user.json"
import ProfileCard from "./Card"

export default function ProfileContent() {
  return (
    <div className="flex flex-col items-center justify-center py-4 ">
      <ProfileCard imageSrc={"/uploads/giraffe.jpg"} alt={user.name} />
      <div>{user.name}</div>
    </div>
  )
}

