import React from "react";
import Tag from "./Tag";

const TripActivities = ({ activities }: { activities: string[] }) => {
  //  If there is more than 3 activities show +X more
  // Can you calculate the width of the tags and show the +X more if the width is greater than 100%

  const activitiesToShow = activities.slice(0, 2);
  const moreActivities = activities.length - 2;
  return (
    <div className="flex gap-2">
      {activitiesToShow.map((activity, index) => (
        <Tag text={activity} key={index} variant="outline" />
      ))}
      {moreActivities > 0 && (
        <Tag text={`+${moreActivities}`} variant="outline" />
      )}
    </div>
  );
};

export default TripActivities;
