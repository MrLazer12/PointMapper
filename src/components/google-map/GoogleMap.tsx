import {
    GoogleMap,
    LoadScript,
    Marker
} from "@react-google-maps/api";
import React, {
    useEffect,
    useState,
    useRef,
    forwardRef,
    useImperativeHandle
} from "react";
import {
    AddressData,
    zoomPointCoordinates
} from "../../interfaces/interfaces.main.tsx";

const apiKeyForMaps = import.meta.env.GOOGLE_MAPS_API_KEY;

interface GoogleMapProps {
    data: AddressData[] | null;
    zoomPointCoordinates: zoomPointCoordinates | null;
    centerOriginal: zoomPointCoordinates;
    zoomOriginal: number;
}

export interface GoogleMapHandle {
    zoomBack: () => void;
}

const GoogleMapComponent = forwardRef<GoogleMapHandle, GoogleMapProps>(
    ({data, zoomPointCoordinates, zoomOriginal, centerOriginal}, ref) => {
        const containerStyle = {
            width: "100%",
            height: "100%",
        };

        const locations = Array.isArray(data)
            ? data.map(item => ({
                lat: item.latitude,
                lng: item.longitude,
            }))
            : [];

        const center = locations.length
            ? {
                lat: locations.reduce((sum, loc) => sum + loc.lat, 0) / locations.length,
                lng: locations.reduce((sum, loc) => sum + loc.lng, 0) / locations.length,
            }
            : {
                lat: centerOriginal.latitude,
                lng: centerOriginal.longitude
            };

        const [zoom, setZoom] = useState(zoomOriginal);
        const [mapCenter, setMapCenter] = useState(center);
        const mapRef = useRef<any>(null);
        const isZoomingRef = useRef(false);  // Prevent multiple triggers

        const slowZoom = (
            targetZoom: number,
            targetCenter: { lat: number; lng: number },
            callback?: () => void
        ) => {
            if (!mapRef.current) return;
            let currentZoom = mapRef.current.getZoom();
            const zoomIncrement = targetZoom > currentZoom ? 1 : -1;

            const interval = setInterval(() => {
                currentZoom += zoomIncrement;
                mapRef.current.setZoom(currentZoom);
                mapRef.current.panTo(targetCenter);

                if (currentZoom === targetZoom) {
                    clearInterval(interval);
                    if (callback) callback();
                }
            }, 300);
        };

        const slowZoomToCenterAndBack = () => {
            // Prevent re-triggering if already zooming
            if (isZoomingRef.current) return;

            isZoomingRef.current = true;

            const targetCenter = {
                lat: centerOriginal.latitude,
                lng: centerOriginal.longitude,
            };

            slowZoom(18, targetCenter, () => {
                setTimeout(() => {
                    slowZoom(12, targetCenter, () => {
                        isZoomingRef.current = false;
                    });
                }, 400);
            });
        };

        useImperativeHandle(ref, () => ({
            zoomBack: slowZoomToCenterAndBack,
        }));

        useEffect(() => {
            setMapCenter(center);
            setZoom(zoomOriginal);
        }, [centerOriginal]);

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
    }
);

export default GoogleMapComponent;
