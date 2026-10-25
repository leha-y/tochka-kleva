"use client";

import { useEffect } from "react";
import { useMapEvents } from "react-leaflet";

interface ClickHandlerProps {
  onMapClick: (lat: number, lng: number) => void;
}

export default function ClickHandler({ onMapClick }: ClickHandlerProps) {
  useMapEvents({
    click: (e) => {
      console.log("Клик по карте:", e.latlng);
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });

  return null;
}
