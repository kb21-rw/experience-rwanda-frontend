import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { FaCloudUploadAlt} from "react-icons/fa";


const CreateTrip = () => {
  return (
    <div className=" p-10 bg-white font-inter">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Trips | New Trip
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <Label
              htmlFor="title"
              className="block text-sm font-medium text-black mb-2"
            >
              Title
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="Hike with vibes at Muhabura volcano"
              className="w-96 px-3 py-2 border border-black rounded-md "
            />
          </div>

          <div>
            <Label
              htmlFor="location"
              className="block text-sm font-medium text-black mb-2"
            >
              Location
            </Label>
            <Input
              id="location"
              type="text"
              placeholder="Musanze district"
              className="w-96 px-3 py-2 border border-black rounded-md "
            />
          </div>

          <div>
            <Label
              htmlFor="description"
              className="block text-sm font-medium text-black mb-2"
            >
              Description
            </Label>
            <textarea
              id="description"
              rows={4}
              className="w-96 px-3 py-2 border border-black rounded-md  "
              placeholder="Enter trip description..."
            />
          </div>

          <div>
            <Label className="block text-lg font-bold text-black mb-4">
              Gallery
            </Label>
            <div className="flex gap-12">
              <div className="w-36 h-36 border border-white bg-white shadow-2xl rounded-md">
                <FaCloudUploadAlt className="mx-auto h-12 w-12 mt-5" />
                <p className="text-sm text-black font-inter text-center p-3">
                  Upload Cover photo or drag it here
                </p>
              </div>

              <div className="w-36 h-36 border border-white bg-white shadow-2xl rounded-md">
                <FaCloudUploadAlt className=" h-12 w-12 mx-auto mt-5" />
                <p className="text-sm text-black font-inter text-center p-3">
                  Upload gallery photo or drag it here
                </p>
                
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label
                htmlFor="date"
                className="block text-sm font-medium text-black mb-2"
              >
                Date
              </Label>
              <Input
                type="date"
                defaultValue="2025-07-12"
                className="w-32 p-2 border border-black rounded-md"
              />
            </div>
            <div>
              <Label
                htmlFor="price"
                className="block text-sm font-medium text-black mb-2"
              >
                Price
              </Label>
              <Input
                id="price"
                type="text"
                placeholder="30$ / day"
                className="w-32 p-2 text-black border border-black rounded-md "
              />
            </div>
            <div>
              <Label
                htmlFor="seats"
                className="block text-sm font-medium text-black mb-2"
              >
                Seats
              </Label>
              <Input
                id="seats"
                type="number"
                placeholder="60 seats"
                className="w-32 p-2 border text-black border-black rounded-md"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-black mb-6">
              Trip packages
            </h3>

            {[1, 2, 3].map((index) => (
              <div key={index} className="mb-6">
                <Label className="block text-sm font-medium text-gray-700 mb-3">
                  Meal
                </Label>
                <div className="flex gap-2">
                  {["Breakfast", "Dinner", "Lunch", "Juices"].map((meal) => (
                    <button
                      key={meal}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {meal}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6">
            <button className="w-full bg-black text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors">
              Create New Trip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
