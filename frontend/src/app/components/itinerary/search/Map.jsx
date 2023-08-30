import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import "leaflet-routing-machine";

const Map = ({ StartCity, EndCity }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.remove(); 
    }

  const newMap = L.map("map").setView([61.524010,105.318756], 8); 

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(newMap);

    const start = L.latLng(StartCity[0], StartCity[1]);
    const end = L.latLng(EndCity[0], EndCity[1]);

    
    const routingControl = L.Routing.control({
      waypoints: [start, end],
      routeWhileDragging: false,
      show: false,
      altLineOptions: { show: true },
    }).addTo(newMap);

    mapRef.current = newMap;

  

    routingControl.on("routeselected", function (e) {
        const route = e.route;
        const { totalDistance, totalTime } = route.summary;
      
      });
    }, [StartCity, EndCity]);
  
  return (
    <div className="xl:h-screen xs:h-[75vh] sm:h-[70vh]">
    <div id="map" className="h-[600px] w-[80vw] mx-auto border-white border-8 z-40 mb-28 p-4">
</div>
    </div>
  );
};

export default Map;
