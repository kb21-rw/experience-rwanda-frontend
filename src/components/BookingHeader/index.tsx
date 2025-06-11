"use client";

import { useTrips } from "@/hooks/useTrips";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

const BookingHeader = () => {
  const { trips } = useTrips();
  console.log("TTTTTTTTTTTTTTTTTTTTTTrips", trips);
  return (
    <div className="p-10 bg-white font-inter">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Booking | <span>{trips[0].title} </span>
        </h1>
        <div>
          <h1>Crew Team:</h1>
          <p>
            Nestor Ngabonziza <span className="font-semibold">(Driver)</span>
          </p>
          <p>
            Ramona Ingabire{" "}
            <span className="font-semibold">(Trip coordinator)</span>
          </p>
        </div>
      </div>
      <div>
        {/* <div>
          <p>{trips[0].title}</p>
          <p>{trips[0].departureTime}</p>
        </div> */}
      </div>
      <div></div>
      <div className="flex gap-3">
        <div className="w-20 h-20  items-center align-middle">
          <CircularProgressbarWithChildren
            value={66}
            styles={{
              path: {
                stroke: "black",
              },
              trail: {
                stroke: "#d6d6d6",
              },
            }}
          >
            <div style={{ fontSize: 12, marginTop: -5 }}>
              <strong>66</strong> mate
            </div>
          </CircularProgressbarWithChildren>
        </div>
        <div className="w-20 h-20  items-center align-middle">
          <CircularProgressbarWithChildren
            value={86}
            styles={{
              path: {
                stroke: "black",
              },
              trail: {
                stroke: "#d6d6d6",
              },
            }}
          >
            <div style={{ fontSize: 12, marginTop: -5 }}>
              <strong>66 %</strong> mate
            </div>
          </CircularProgressbarWithChildren>
        </div>
      </div>
      ;
    </div>
  );
};

export default BookingHeader;
