import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api";
import React, {useEffect, useState, useRef} from "react";
import {AddressData, zoomPointCoordinates} from "../../interfaces/interfaces.main.tsx";

const apiKeyForMaps = import.meta.env.GOOGLE_MAPS_API_KEY;

interface GoogleMapProps {
    data: AddressData[] | null;
    zoomPointCoordinates: zoomPointCoordinates | null;
    zoomOriginal: number;
}

const GoogleMapComponent: React.FC<GoogleMapProps> = ({data, zoomPointCoordinates, zoomOriginal}) => {
    const containerStyle = {
        width: "100%",
        height: "100%",
    };

    const locations: { lat: number; lng: number; }[] = Array.isArray(data)
        ? data.map((item: { latitude: number; longitude: number; }) => ({
            lat: item.latitude,
            lng: item.longitude,
        }))
        : [];

    const center = locations.length
        ? {
            lat: locations.reduce((sum, loc) => sum + loc.lat, 0) / locations.length,
            lng: locations.reduce((sum, loc) => sum + loc.lng, 0) / locations.length,
        }
        : {lat: 30.32526, lng: -97.69927};

    const [zoom, setZoom] = useState(zoomOriginal);
    const [mapCenter, setMapCenter] = useState(center);
    const mapRef = useRef<any>(null);

    const slowZoom = (targetZoom: number, targetCenter: { lat: number; lng: number }) => {
        if (mapRef.current) {
            const currentZoom = mapRef.current.getZoom();
            const zoomIncrement = targetZoom > currentZoom ? 1 : -1;
            // const center = mapRef.current.getCenter();

            const interval = setInterval(() => {
                const newZoom = mapRef.current.getZoom() + zoomIncrement;
                if (newZoom === targetZoom) {
                    clearInterval(interval);
                } else {
                    setZoom(newZoom);
                    mapRef.current.setZoom(newZoom);
                    mapRef.current.panTo(targetCenter);
                }
            }, 100);
        }
    };

    useEffect(() => {
        setZoom(zoomOriginal);

        const timeout = setTimeout(() => {
            if (zoomPointCoordinates) {
                const targetCenter = {
                    lat: zoomPointCoordinates.latitude,
                    lng: zoomPointCoordinates.longitude,
                };
                slowZoom(20, targetCenter);
            } else {
                setMapCenter(center);
                setZoom(zoomOriginal);
            }
        }, 565);

        return () => clearTimeout(timeout);
    }, [zoomPointCoordinates]);

    return (
        <LoadScript googleMapsApiKey={apiKeyForMaps}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={mapCenter}
                zoom={zoom}
                onLoad={(map) => {
                    mapRef.current = map;
                }}
            >
                {locations.map((location, index) => (
                    <Marker
                        key={index}
                        position={location}
                        label={(index + 1).toString()}
                    />
                ))}
            </GoogleMap>
        </LoadScript>
    );
};

export default GoogleMapComponent;
