"use client";

import GoogleMapReact from "google-map-react";
import { MapPin } from "lucide-react";

interface Location {
  lat: number;
  lng: number;
  name?: string;
}

interface SimpleMapProps {
  locations: Location[];
  zoom?: number;
  height?: string;
  width?: string;
  className?: string;
}

const Marker = ({ name }: Location) => (
  <div className="flex flex-col items-center">
    {name && (
      <span className="mb-1 bg-white text-gray-800 text-xs font-semibold px-2 py-1 rounded-lg shadow-md whitespace-nowrap">
        {name}
      </span>
    )}
    <div className="flex items-center justify-center w-8 h-8 bg-green-700 rounded-full shadow-lg relative">
      <MapPin className="w-5 h-5 text-white" />
      <div className="absolute -bottom-1 w-2 h-2 bg-green-700 rotate-45"></div>
    </div>
  </div>
);

export default function Map({
  locations,
  zoom = 11,
  height = "100vh",
  width = "100%",
}: SimpleMapProps) {
  const defaultCenter = locations.length
    ? { lat: locations[0].lat, lng: locations[0].lng }
    : { lat: 0, lng: 0 };

  return (
    <div style={{ height, width }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "",
        }}
        defaultCenter={defaultCenter}
        defaultZoom={zoom}
      >
        {locations.map((loc, idx) => (
          <Marker
            key={idx}
            lat={loc.lat}
            lng={loc.lng}
            name={loc.name}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
