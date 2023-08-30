import { Icon } from "leaflet";
import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const MapTest = ({ StartCity, StartCityName, EndCity, EndCityName }) => {

  
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && !routingControlRef.current) {
      const map = mapRef.current.leafletElement;

      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(StartCity),
          L.latLng(EndCity),
        ],
      }).addTo(map);

      routingControlRef.current = routingControl;
    }
  }, [StartCity, EndCity]);

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/5591/5591266.png",
    iconSize: [38, 38],
    shadowSize: [50, 64],
  });

  const markers = [
    {
      id: 1,
      geocode: StartCity,
      popUp: <p className="font-bold"> {StartCityName}</p>,
    },
    {
      id: 2,
      geocode: EndCity,
      popUp: EndCityName,
    },
  ];

  return (
    <div>
      <MapContainer
        ref={mapRef}
        center={StartCity}
        zoom={5}
        doubleClickZoom={true}
        scrollWheelZoom={false}
        className="h-[600px] w-[80vw] mx-auto  border-white border-8 z-40 mb-28"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

{markers.map((marker) => (
  <Marker position={marker.geocode} icon={customIcon} key={marker.id} draggable={false}>
    <Popup>{marker.popUp}</Popup>
  </Marker>
))}
      </MapContainer>
    </div>
  );
};

export default MapTest;
