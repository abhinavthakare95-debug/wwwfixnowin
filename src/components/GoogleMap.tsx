import { useCallback, useState } from "react";
import { GoogleMap as GMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY, DEFAULT_CENTER, DEFAULT_ZOOM } from "@/lib/maps";

interface MapMarker {
  id: number;
  lat: number;
  lng: number;
  name: string;
  service?: string;
  rating?: number;
  isUser?: boolean;
}

interface GoogleMapProps {
  markers?: MapMarker[];
  center?: { lat: number; lng: number };
  zoom?: number;
  className?: string;
  showUserLocation?: boolean;
  userLocation?: { lat: number; lng: number } | null;
  onMarkerClick?: (marker: MapMarker) => void;
}

const containerStyle = { width: "100%", height: "100%" };

const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#1a1d29" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1a1d29" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#8a8fa3" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#2c2f3e" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212338" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#0e1626" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#1e2132" }] },
  { featureType: "transit", elementType: "geometry", stylers: [{ color: "#1e2132" }] },
];

const GoogleMapComponent = ({
  markers = [],
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  className = "",
  userLocation,
  onMarkerClick,
}: GoogleMapProps) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => setMap(map), []);
  const onUnmount = useCallback(() => setMap(null), []);

  if (loadError) {
    return (
      <div className={`rounded-xl bg-card border border-border/50 flex items-center justify-center ${className}`}>
        <div className="text-center p-8">
          <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🗺️</span>
          </div>
          <p className="text-muted-foreground text-sm font-medium">Map failed to load</p>
          <p className="text-muted-foreground text-xs mt-1">Please check your Google Maps API key</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className={`rounded-xl bg-card border border-border/50 flex items-center justify-center ${className}`}>
        <div className="text-center p-8">
          <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground text-sm">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-xl overflow-hidden border border-border/50 ${className}`}>
      <GMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          styles: darkMapStyle,
          disableDefaultUI: true,
          zoomControl: true,
          fullscreenControl: true,
        }}
      >
        {/* Provider markers */}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelectedMarker(marker);
              onMarkerClick?.(marker);
            }}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: marker.isUser ? "#22c55e" : "#f97316",
              fillOpacity: 1,
              strokeColor: "#fff",
              strokeWeight: 2,
              scale: marker.isUser ? 10 : 8,
            }}
          />
        ))}

        {/* User location */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: "#3b82f6",
              fillOpacity: 1,
              strokeColor: "#fff",
              strokeWeight: 3,
              scale: 10,
            }}
          />
        )}

        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="p-1 text-gray-900">
              <p className="font-bold text-sm">{selectedMarker.name}</p>
              {selectedMarker.service && (
                <p className="text-xs text-gray-600">{selectedMarker.service}</p>
              )}
              {selectedMarker.rating && (
                <p className="text-xs text-amber-600">⭐ {selectedMarker.rating}</p>
              )}
            </div>
          </InfoWindow>
        )}
      </GMap>
    </div>
  );
};

export default GoogleMapComponent;
