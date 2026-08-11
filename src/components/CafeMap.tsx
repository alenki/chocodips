import { useMemo } from 'react';
import { MapContainer, Marker, TileLayer, Tooltip, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import { cafe } from '../data/cafe';
import { useLocale } from '../i18n/context';
import './CafeMap.css';

/**
 * OpenStreetMap tiles, warmed with a CSS filter so the map sits inside the
 * cream/chocolate palette instead of fighting it.
 */
export function CafeMap() {
  const { t, locale } = useLocale();

  const icon = useMemo(
    () =>
      L.divIcon({
        className: 'cmap__pin-wrap',
        html: `<span class="cmap__pin"><span class="cmap__pin-core"></span></span>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      }),
    [],
  );

  return (
    <div className="cmap" role="group" aria-label={t('home.find.mapAria')}>
      <MapContainer
        center={cafe.coords}
        zoom={16}
        scrollWheelZoom={false}
        zoomControl={false}
        attributionControl={false}
        className="cmap__canvas"
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
          detectRetina
        />
        <ZoomControl position="bottomright" />
        <Marker position={cafe.coords} icon={icon}>
          <Tooltip direction="top" offset={[0, -14]} opacity={1} className="cmap__tip">
            {cafe.name} · {cafe.street[locale]}
          </Tooltip>
        </Marker>
      </MapContainer>

      <span className="cmap__frame" aria-hidden="true" />

      <a
        className="cmap__credit"
        href="https://www.openstreetmap.org/copyright"
        target="_blank"
        rel="noreferrer"
      >
        © OpenStreetMap
      </a>
    </div>
  );
}
