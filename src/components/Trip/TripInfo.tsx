import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TripInfo = ({ props }: any) => {
  console.log(props);
  return (
    <div>
      <h1>Trip</h1>
      <p>Info</p>
      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-1">Info</div>
        <div className="col-span-1">Info</div>
      </div>
    </div>
  );
};

export default TripInfo;
