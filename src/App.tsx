import React, {useEffect, useState} from "react";
import CardProduct from "./components/card-product/card.tsx";
import dataJSON from './data.json';
import GoogleMapComponent from "./components/google-map/GoogleMap.tsx";
import {zoomPointCoordinates} from "./interfaces/interfaces.main.tsx";

const App: React.FC = () => {
    const [data, setData] = useState<any[] | null>(null);
    const [zoomPointCoordinates, setZoomPointCoordinates] = useState<zoomPointCoordinates | null>(null);

    const getProducts = async () => {
        setData(dataJSON);
        // try {
        //     const result = await getListingProperties();
        //     setProducts(result);
        // } catch (error) {
        //     console.error("Error fetching data", error);
        // } finally {
        //     setLoading(false);
        // }
    };

    const zoomToCardPoint = (latitude: number, longitude: number) => {
        setZoomPointCoordinates({latitude, longitude});
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start">
            <div className="grid grid-cols-2 w-full h-screen">
                <section className="py-12 px-4 overflow-auto">
                    <div className="grid grid-cols-3 gap-6">
                        {data?.map((dataCurrent: any, index) => (
                            <CardProduct
                                zoomToCardPoint={zoomToCardPoint}
                                key={index}
                                indexCard={index}
                                dataCurrent={dataCurrent}
                            />
                        ))}
                    </div>
                </section>

                <section className="h-full">
                    <GoogleMapComponent data={data} zoomPointCoordinates={zoomPointCoordinates}/>
                </section>
            </div>
        </div>
    );
};

export default App;
