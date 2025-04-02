import React from "react";
import {AddressData, zoomPointCoordinates} from "../../interfaces/interfaces.main.tsx";

interface ProductProps {
    dataCurrent: AddressData;
    setZoom: React.Dispatch<React.SetStateAction<number>>;
    indexCard: number;
    zoomToCardPoint: (point: zoomPointCoordinates) => void;
}

const CardProduct: React.FC<ProductProps> = ({dataCurrent, indexCard, zoomToCardPoint, setZoom}) => {
    const handleCardClick = () => {
        zoomToCardPoint({
            latitude: dataCurrent.latitude,
            longitude: dataCurrent.longitude
        });
    };

    const handleCardMouseOut = () => {
        console.warn('handleCardMouseOut');
    };

    return (
        <div
            onMouseEnter={handleCardClick}
            onMouseLeave={handleCardMouseOut}
            className="rounded-xl overflow-hidden shadow-lg bg-white transform transition-all hover:scale-105 hover:shadow-xl duration-300 ease-in-out py-3"
        >
            <div className='px-6 py-3'>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Point nr.{indexCard + 1}
                </h3>
            </div>

            <div className="px-8">
                <h4 className="text-lg font-semibold text-gray-800">Coordinates</h4>
                <p className="text-gray-600">
                    Latitude: {dataCurrent.latitude},
                    Longitude: {dataCurrent.longitude}
                </p>
            </div>

            <div className="px-6 grid grid-cols-2 gap-2">
                <div className="m-2">
                    <h4 className="text-lg font-semibold text-gray-800">Address</h4>
                    <p className="text-gray-600 text-sm">{dataCurrent.formattedAddress}</p>
                    {dataCurrent.addressLine2 && (
                        <p className="text-gray-600 text-sm">{dataCurrent.addressLine2}</p>
                    )}
                </div>

                <div className="m-2">
                    <h4 className="text-lg font-semibold text-gray-800">Property Type</h4>
                    <p className="text-gray-600">{dataCurrent.propertyType}</p>
                    <h4 className="text-lg font-semibold text-gray-800">Year Built</h4>
                    <p className="text-gray-600">{dataCurrent.yearBuilt}</p>
                </div>

                <div className="m-2">
                    <h4 className="text-lg font-semibold text-gray-800">County</h4>
                    <p className="text-gray-600">{dataCurrent.county}</p>
                </div>
            </div>
        </div>
    );
};

export default CardProduct;
