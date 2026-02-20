import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { cafeInfo } from '../data/cafeInfo';
import 'leaflet/dist/leaflet.css';
import './CafeMap.css';

const markerIcon = new L.Icon({
  iconUrl: '/data/favicon.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export default function CafeMap() {
  return (
    <div className="cafe-map">
      <MapContainer
        center={cafeInfo.coords}
        zoom={16}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={cafeInfo.coords} icon={markerIcon}>
          <Popup>
            <strong>{cafeInfo.name}</strong><br />
            {cafeInfo.address}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
