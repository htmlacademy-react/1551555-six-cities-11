import { City, Offers, Offer } from '../../types/types';
import { useRef, useEffect } from 'react';
import useMap from '../../hooks/useMap';
import { Icon, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';

type MapProps = {
  city: City;
  offers: Offers;
  selectedOffer: Offer | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export default function Map({
  city,
  offers,
  selectedOffer,
}: MapProps): JSX.Element {
  const mapRef = useRef(null);

  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const { lat, lng } = city;
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });
        marker

          .setIcon(
            selectedOffer !== undefined && offer.id === selectedOffer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);
      });
      map.setView({ lat, lng });
    }
  }, [map, offers, city, selectedOffer]);

  return <div style={{ height: '100%' }} ref={mapRef}></div>;
}
