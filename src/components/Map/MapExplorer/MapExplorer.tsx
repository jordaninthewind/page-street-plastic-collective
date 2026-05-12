import CoverLogo from "@app/assets/cover-logo.svg";
import { AddressSearch, ListItemAnimation, MapFilters } from "@app/components";
import { type Item } from "@app/components/Common/ListItemAnimation/ListItemAnimation";

const ITEMS: Item[] = [
  {
    icon: <span style={{ fontSize: 22, lineHeight: 1 }}>📍</span>,
    text: "Click anywhere on the map to request a cover",
  },
  {
    icon: <img src={CoverLogo as string} alt="Cover Logo" width={24} height={24} />,
    text: "Click on a cover to see info about the request",
  },
  {
    icon: <span style={{ fontSize: 22, lineHeight: 1 }}>💁‍♀️</span>,
    text: "...or to let us know if it's been uncovered again 🙃.",
  },
];

const MapExplorer = () => (
  <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
    <div className="eyebrow">Explore the map</div>
    <AddressSearch />
    <MapFilters />
    <ListItemAnimation items={ITEMS} />
  </div>
);

export default MapExplorer;
