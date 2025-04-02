import {API_URL, RENT_CAST_API_KEY} from "../main.config.tsx";
import axios from "axios";

export interface ProductProps {
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    rating: {
        rate: number;
        count: number;
    };
    title: string;
}

export const getListingProperties = async () => {
    try {
        const response = await axios.get(API_URL + "/properties", {
            params: {
                city: 'Austin',
                state: 'TX',
                limit: 40
            },
            headers: {
                'Accept': 'application/json',
                'X-Api-Key': RENT_CAST_API_KEY
            }
        });
        return response.data; // This returns the data from the response
    } catch (error) {
        console.error('Error:', error);
        return null; // In case of error, return null or handle accordingly
    }
};