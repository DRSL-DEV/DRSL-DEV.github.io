import styles from "./index.module.css";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

const MapPage = () => {
  const position = { lat: 42.280701, lng: -83.740119 };
  return (
    <div className={styles["map-page-container"]}>
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <Map defaultCenter={position} defaultZoom={16}>
          <Marker position={position} />
        </Map>
      </APIProvider>
    </div>
  );
};

export default MapPage;
