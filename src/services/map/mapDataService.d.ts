declare module "@app/services/map/mapDataService" {
    export function searchNearbyAddresses(longitude: number, latitude: number, radius?: number): Promise<SearchNearbyAddressesResponse>;
}