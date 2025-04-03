import React from 'react';
import {AddressData} from "../interfaces/interfaces.main.tsx";
import SliderImages from "../components/slider/slider.tsx";

const images = [
    "https://imgv3.fotor.com/images/blog-richtext-image/a-shadow-of-a-boy-carrying-the-camera-with-red-sky-behind.jpg",
    "https://imgv3.fotor.com/images/blog-richtext-image/a-man-taking-a-photo-with-blue-sky-and-sun-behind.jpg",
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/new-year-background-736885_1280.jpg",
    "https://media.istockphoto.com/id/1073018112/photo/christmas-scene-with-a-cute-snowman-free-space-for-text-on-right-side-snob-light-and-bokeh-in.jpg?s=2048x2048&w=is&k=20&c=hfqgb0WKMMS5XCH2a1TCfeRRSe14HyuCflQDiabPBZ0=",
    "https://media.istockphoto.com/id/1810498034/photo/happy-snowman-holding-a-fir-branch-decorated-with-berries-candy-and-star-shaped-decoration-on.jpg?s=2048x2048&w=is&k=20&c=F4-K1yx60q2v8uL6o-JbgCMfOMIHlXMIshrbBhJqyhA="
];

const InfoPage: React.FC = () => {
    const dataCurrent: AddressData = JSON.parse(localStorage.getItem('dataCurrentInfo') || '{}');

    const {
        formattedAddress,
        addressLine1,
        addressLine2,
        city,
        state,
        zipCode,
        county,
        latitude,
        longitude,
        propertyType,
        yearBuilt
    } = dataCurrent;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6 lg:px-8">
            <SliderImages
                images={images}
            />

            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-4xl font-extrabold text-center text-teal-400 mb-8">Property Information</h1>

                {/* Address Section */}
                <div className="bg-indigo-50 p-6 rounded-lg mb-8 shadow-sm">
                    <h2 className="text-2xl font-semibold text-teal-400 mb-4">Address</h2>
                    <p className="text-lg text-gray-700">{formattedAddress}</p>
                    <p className="text-lg text-gray-700">{addressLine1}</p>
                    {addressLine2 && <p className="text-lg text-gray-700">{addressLine2}</p>}
                    <p className="text-lg text-gray-700">{city}, {state} {zipCode}</p>
                    <p className="text-lg text-gray-700">{county}</p>
                </div>

                {/* Property Details Section */}
                <div className="bg-indigo-50 p-6 rounded-lg mb-8 shadow-sm">
                    <h2 className="text-2xl font-semibold text-teal-400 mb-4">Property Details</h2>
                    <p className="text-lg text-gray-700">Property Type: <span
                        className="font-bold text-teal-400">{propertyType}</span></p>
                    {yearBuilt && <p className="text-lg text-gray-700">Year Built: <span
                        className="font-bold text-teal-400">{yearBuilt}</span></p>}
                </div>

                {/* Geographical Information Section */}
                <div className="bg-indigo-50 p-6 rounded-lg mb-8 shadow-sm">
                    <h2 className="text-2xl font-semibold text-teal-400 mb-4">Geographical Information</h2>
                    <p className="text-lg text-gray-700">Latitude: <span
                        className="font-bold text-teal-400">{latitude}</span></p>
                    <p className="text-lg text-gray-700">Longitude: <span
                        className="font-bold text-teal-400">{longitude}</span></p>
                </div>
            </div>
        </div>
    );
};

export default InfoPage;
