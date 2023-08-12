import React from "react";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import styles from "./MapPage.module.css";
import LandingPage from "./LandingPage";

const MapPage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  if (!isLoaded) return <div>Loading ...</div>;
  return <Map />;
};

export default MapPage;

const Map = () => {
  const center = useMemo(() => ({ lat: 46, lng: 25 }), []);
  return (
    <LandingPage>
      <GoogleMap
        zoom={7}
        center={center}
        mapContainerClassName={styles.mapContainer}
      >
        <Marker
          label="Refugiul Stâna de Râu"
          position={{ lat: 45.37060469837035, lng: 22.9366697185442 }}
        />
      </GoogleMap>
    </LandingPage>
  );
};
