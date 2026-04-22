export module "@app/constants" {
    export const MAP_CENTER: [number, number];
    export const MAP_BOUNDS: [[number, number], [number, number]];
    export const PAGE_STREET_BOUNDS: [[number, number], [number, number]];
    export const COVER_STATES: {
        covered: { color: string };
        missing: { color: string };
        temporary: { color: string };
    };
    export const COVER_TYPES: { value: string; label: string }[];
}