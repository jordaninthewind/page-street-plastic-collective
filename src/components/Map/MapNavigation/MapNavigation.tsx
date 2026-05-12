import { AddDrainCover, CoverInfo, MapExplorer, UserPanel } from "@app/components";
import withSearchParamState from "@app/components/HOC/withSearchParamState";

import "./MapNavigation.css";

const baseState = (id: number, lat: string, lng: string) => !id && !lat && !lng;
const existingCoverState = (id: number, lat: string, lng: string) => id && lat && lng;
const newCoverState = (id: number, lat: string, lng: string) => !id && lat && lng;

const MAP_NAVIGATION_STATES = [
  { Component: MapExplorer, condition: baseState },
  { Component: CoverInfo, condition: existingCoverState },
  { Component: AddDrainCover, condition: newCoverState },
];

const MapNavigation = withSearchParamState(({ id, lat, lng }) => (
  <div className="map-panel">
    {MAP_NAVIGATION_STATES.map(({ Component, condition }, idx) => (
      condition(id, lat, lng) ? <Component key={idx} /> : null
    ))}
    <UserPanel />
  </div>
));

export default MapNavigation;
