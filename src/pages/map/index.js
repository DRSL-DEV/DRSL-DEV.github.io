import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { APIProvider, Map, Marker, useMap } from "@vis.gl/react-google-maps";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import userMarker from "../../assets/icons/user_marker.svg";
import locateUser from "../../assets/icons/locate_user.svg";

const MapPage = () => {
  const sites = [
    { id: 1, name: "Site 1", lat: 42.280701, lng: -83.740119 },
    { id: 2, name: "Site 2", lat: 42.304709, lng: -83.709036 },
    { id: 3, name: "Site 3", lat: 42.291144, lng: -83.717423 },
    { id: 4, name: "Site 4", lat: 42.326088, lng: -83.452158 },
    { id: 5, name: "Site 5", lat: 42.259408, lng: -83.713515 },
    { id: 6, name: "Site 6", lat: 42.240263, lng: -83.524090 },
    { id: 7, name: "Site 7", lat: 42.231830, lng: -83.744704 }
  ];

  const center = sites.reduce((acc, site) => {
    acc.lat += site.lat;
    acc.lng += site.lng;
    return acc;
  }, { lat: 0, lng: 0 });
  center.lat /= sites.length;
  center.lng /= sites.length;

  const [userPosition, setUserPosition] = useState(null);
  const [mapCenter, setMapCenter] = useState(center);
  const [zoom, setZoom] = useState(12);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
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
    if (userPosition) {
      setMapCenter(userPosition);
      setZoom(15);
    } else {
      console.log("Error: Your browser doesn't support geolocation.");
    }
    console.log("Locate user", userPosition, mapCenter, zoom);
  };

  const handleMarkerClick = (site) => {
    setSelectedSite(site);
    setModalOpen(true);
  }

  const handleViewStories = () => {
    navigate("/site-page")
    setModalOpen(false);
  }

  const handleDirections = () => {
    if (userPosition && selectedSite) {
      const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userPosition.lat},${userPosition.lng}&destination=${selectedSite.lat},${selectedSite.lng}&travelmode=walking`;
      window.open(directionsUrl, '_blank');
    }
    setModalOpen(false);
  };


  const handleCancel = () => {
    setModalOpen(false);
  }


  return (
    <div className={styles["map-page-container"]}>
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <Map
          defaultCenter={center}
          defaultZoom={zoom}
          center={mapCenter}
          zoom={zoom}
          onCenterChanged={ev => setMapCenter(ev.detail.center)}
          onZoomChanged={ev => setZoom(ev.detail.zoom)}
        >
          {sites.map((site, index) => (
            <Marker key={index} position={site} onClick={() => handleMarkerClick(site)} />
          ))}
          {userPosition && (
            <Marker
              position={userPosition}
              icon={userMarker}
            />
          )}
        </Map>
      </APIProvider>
      <Modal
        title={selectedSite?.name}
        open={modalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>Close</Button>,
          <Button key="stories" type="link" onClick={handleViewStories} className={styles["primary-modal-button"]} >View Stories</Button>,
          <Button key="direct" type="link" onClick={handleDirections} className={styles["primary-modal-button"]}>Directions</Button>
        ]}
      >
        <p>Latitude: {selectedSite?.lat}</p>
      </Modal>
      <div onClick={handleLocateUser}>
        <img className={styles["locate-user-button"]} src={locateUser} alt="locate user" />
      </div>
    </div>
  );
};

export default MapPage;
