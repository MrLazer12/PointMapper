export interface zoomPointCoordinates {
    latitude: number | null,
    longitude: number | null
}

export interface AddressData {
    id: string;
    formattedAddress: string;
    addressLine1: string;
    addressLine2: string | null;
    city: string;
    state: string;
    zipCode: string;
    county: string;
    latitude: number;
    longitude: number;
    propertyType: string;
    yearBuilt?: number;
}