import React from "react";

interface ProductProps {
    dataCurrent: any;
    indexCard: number;
    zoomToCardPoint: (latitude: number, longitude: number) => void;
}

const CardProduct: React.FC<ProductProps> = ({dataCurrent, indexCard, zoomToCardPoint}) => {
    const handleCardClick = () => {
        zoomToCardPoint(dataCurrent.latitude, dataCurrent.longitude);
    };

    return (
        <div
            className="rounded-xl overflow-hidden shadow-lg bg-white transform transition-all hover:scale-105 hover:shadow-xl duration-300 ease-in-out py-3"
        >
            <div className='px-6 py-3'>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Point {indexCard + 1}
                </h3>
            </div>

            <div className="px-6 grid grid-cols-2 gap-2">
                {/* Address Information */}
                <div className="m-2">
                    <h4 className="text-lg font-semibold text-gray-800">Address</h4>
                    <p className="text-gray-600 text-sm">{dataCurrent.formattedAddress}</p>
                    {dataCurrent.addressLine2 && (
                        <p className="text-gray-600 text-sm">{dataCurrent.addressLine2}</p>
                    )}
                </div>

                {/* Property Type and Year Built */}
                <div className="m-2">
                    <h4 className="text-lg font-semibold text-gray-800">Property Type</h4>
                    <p className="text-gray-600">{dataCurrent.propertyType}</p>
                    <h4 className="text-lg font-semibold text-gray-800">Year Built</h4>
                    <p className="text-gray-600">{dataCurrent.yearBuilt}</p>
                </div>

                {/* Coordinates */}
                <div className="m-2">
                    <h4 className="text-lg font-semibold text-gray-800">Location Coordinates</h4>
                    <p className="text-gray-600">
                        Latitude: {dataCurrent.latitude},
                        <br/>
                        Longitude: {dataCurrent.longitude}
                    </p>
                </div>

                {/* County Information */}
                <div className="m-2">
                    <h4 className="text-lg font-semibold text-gray-800">County</h4>
                    <p className="text-gray-600">{dataCurrent.county}</p>
                </div>
            </div>

            <div className='px-6'>
                <button
                    onClick={handleCardClick}
                    className="w-full py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-800 transition ease-in-out duration-300"
                >
                    Show on map
                </button>
            </div>
        </div>
    );
};

export default CardProduct;
