import Image from "next/image";

interface RequestTripProps {
  title: string;
  description: string;
  buttonText: string;
  images: string[];
}

const CustomizedTripContent = ({ title, description, buttonText }: RequestTripProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 bg-emerald-400 p-20 rounded-lg">
        <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
  <Image src="/uploads/giraffe.jpg" width={360} height={480} alt="Large" className="w-full h-full object-cover rounded-lg"/>

  <div className="grid grid-rows-2 gap-4">
    <Image src="/uploads/girafffe.jpg"  alt="Small 1" className="w-full h-full object-cover rounded-lg"/>
    <Image src="/uploads/akagera.png" alt="Small 2" className="w-full h-full object-cover rounded-lg"/>
  </div>
</div>


      <div className="max-w-lg text-left md:text-left">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-lg mb-6">{description}</p>
        <button className="border border-black px-4 py-2 hover:bg-black hover:text-white transition">
          {buttonText}
        </button>
      </div>
    </div>
  );
}


export default CustomizedTripContent;
