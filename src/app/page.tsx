import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="">
      <h1 className="text-center font-bold text-4xl">Experience Rwanda</h1>

      <Header />

      <div className="flex justify-center gap-4 pt-10">
        <Button variant={"outline"}>More Details</Button>
        <Button variant={"default"}>Book Now</Button>
        <Button variant={"secondary"}>Cancel</Button>
      </div>
    </div>
  );
}
