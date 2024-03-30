import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { APIProvider, Map, Marker, useMap } from "@vis.gl/react-google-maps";
import { Button, Modal, Select } from "antd";
import { useNavigate } from "react-router-dom";
import userMarker from "../../assets/icons/user_marker.svg";
import locateUser from "../../assets/icons/locate_user.svg";
import location_red from "../../assets/icons/location_red.svg";
import { siteLocationList } from "../../constants/constants";

const MapPage = () => {

  const center = siteLocationList.reduce((acc, site) => {
    acc.lat += site.lat;
    acc.lng += site.lng;
    return acc;
  }, { lat: 0, lng: 0 });
  center.lat /= siteLocationList.length;
  center.lng /= siteLocationList.length;

  const [userPosition, setUserPosition] = useState(null);
  const [mapCenter, setMapCenter] = useState(center);
  const [zoom, setZoom] = useState(10);
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
      setZoom(12);
    } else {
      console.log("Error: Your browser doesn't support geolocation.");
    }
    console.log("Locate user", userPosition, mapCenter, zoom);
  };

  const handleSelectSite = (selectedSiteId) => {
    const selectedSite = siteLocationList.find(site => site.id === selectedSiteId);
    if (selectedSite) {
      setMapCenter({ lat: selectedSite.lat, lng: selectedSite.lng });
      setZoom(15); // 或者您希望的其他缩放级别
    }
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
      setTimeout(() => {
        window.open(directionsUrl, '_blank');
      })

    }
    setModalOpen(false);
  };



  const handleCancel = () => {
    setModalOpen(false);
  }


  return (
    <div className={styles["map-page-container"]}>
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <div className={styles["select-container"]}>
          <Select
            showSearch
            style={{ width: 400, height: 40 }}
            placeholder="Select or Search a Site Location"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            suffixIcon={<img src={location_red} alt="location" />}
            options={siteLocationList.map((site) => ({
              value: site.id,
              label: site.name,
            }))}
            onSelect={handleSelectSite}
          />
        </div>
        <Map
          defaultCenter={center}
          defaultZoom={zoom}
          center={mapCenter}
          zoom={zoom}
          onCenterChanged={ev => setMapCenter(ev.detail.center)}
          onZoomChanged={ev => setZoom(ev.detail.zoom)}
        >
          {siteLocationList.map((site, index) => (
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
