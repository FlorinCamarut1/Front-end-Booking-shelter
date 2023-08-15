import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import styles from "./MapPage.module.css";
import LandingPage from "./LandingPage";
import { makeFetchRequest } from "../Utils/ApiFetch";
import { marker } from "leaflet";
import { applyStyles } from "@popperjs/core";
import { getStepLabelUtilityClass } from "@mui/material";
import { InfoWindow } from "@react-google-maps/api";
const MapPage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  if (!isLoaded) return <div>Loading ...</div>;
  return <Map />;
};

export default MapPage;
const Map = () => {
  const [coordsData, setCoordsData] = useState([]);
  const [selectedShelter, setSelectedShelter] = useState(null);

  const getShelterCoords = async () => {
    let data = await makeFetchRequest("shelters/getShelters", "GET", {});
    setCoordsData(data);
  };

  useEffect(() => {
    getShelterCoords();
  }, []);

  const center = useMemo(() => ({ lat: 46, lng: 25 }), []);

  return (
    <LandingPage>
      <GoogleMap
        zoom={7}
        center={center}
        mapContainerClassName={styles.mapContainer}
      >
        {coordsData.map((shelter, index) => {
          return (
            <Marker
              position={{
                lat: parseFloat(shelter.lat),
                lng: parseFloat(shelter.lng),
              }}
              key={index}
              onMouseOver={() => setSelectedShelter(shelter)}
            />
          );
        })}
        {selectedShelter && (
          <InfoWindow
            position={{
              lat: parseFloat(selectedShelter.lat),
              lng: parseFloat(selectedShelter.lng),
            }}
            onCloseClick={() => setSelectedShelter(null)}
          >
            <div>
              <img
                className={styles.image}
                src={`http://localhost:3000/images/${selectedShelter.image}`}
                alt="mountain refuge"
              />
              {selectedShelter.name}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LandingPage>
  );
};
