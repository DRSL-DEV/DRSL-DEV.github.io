import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import userMarker from "../../assets/icons/user_marker.svg";
import locateUser from "../../assets/icons/locate_user.svg";

const MapPage = () => {
  const [userPosition, setUserPosition] = useState(null);
  const [mapCenter, setMapCenter] = useState(null);
  const [zoom, setZoom] = useState(12);

  const sites = [
    { lat: 42.280701, lng: -83.740119 },
    { lat: 42.304709, lng: -83.709036 },
    { lat: 42.291144, lng: -83.717423 },
    { lat: 42.326088, lng: -83.452158 },
    { lat: 42.259408, lng: -83.713515 },
    { lat: 42.240263, lng: -83.524090 },
    { lat: 42.231830, lng: -83.744704 }
  ];

  useEffect(() => {
    const center = sites.reduce((acc, site) => {
      acc.lat += site.lat;
      acc.lng += site.lng;
      return acc;
    }, { lat: 0, lng: 0 });
    center.lat /= sites.length;
    center.lng /= sites.length;

    setMapCenter(center);
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserPosition(pos);
      },
        () => {
          console.log("Error: The Geolocation service failed.");
        });
    } else {
      console.log("Error: Your browser doesn't support geolocation.");
    }
  }

  const handleLocateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setMapCenter(pos);
        console.log("User's location found:", pos);
        console.log("mapCenter:", mapCenter);
        setZoom(13);
      }, () => {
        console.log("Error: The Geolocation service failed.");
      });
    } else {
      console.log("Error: Your browser doesn't support geolocation.");
    }
  };

  return (
    <div className={styles["map-page-container"]}>
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <Map center={mapCenter} zoom={zoom}>
          {sites.map((site, index) => (
            <Marker key={index} position={site} />
          ))}
          {userPosition && (
            <Marker
              position={userPosition}
              icon={userMarker}
            />
          )}
        </Map>
      </APIProvider>
      <div onClick={handleLocateUser}>
        <img className={styles["locate-user-button"]} src={locateUser} alt="locate user" />
      </div>
    </div>
  );
};

export default MapPage;
