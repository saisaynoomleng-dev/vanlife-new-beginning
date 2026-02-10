'use client';

import Map, { Marker } from 'react-map-gl/mapbox';

import 'mapbox-gl/dist/mapbox-gl.css';
import { env } from '@/lib/env/client';
import clsx from 'clsx';

const MAPBOX_TOKEN = env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const Mapbox = ({ className }: { className?: string }) => {
  const lat = 41.500161109708976;
  const long = -81.69364288549602;

  return (
    <div className={clsx('', className)}>
      <Map
        initialViewState={{
          latitude: lat,
          longitude: long,
          zoom: 15,
        }}
        mapboxAccessToken={MAPBOX_TOKEN}
        scrollZoom={false}
        style={{ width: 1000, height: 500 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={long} latitude={lat} color="red" />
      </Map>
    </div>
  );
};

export default Mapbox;
