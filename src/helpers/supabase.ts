interface EntryInput {
  lng: number | string | null;
  lat: number | string | null;
  covered?: boolean;
  [key: string]: unknown;
}

export const formatEntry = ({ lng, lat, covered = false, ...fields }: EntryInput) => {
  const location = `Point(${lng} ${lat})`;
  return { ...fields, covered, location, lat, lng };
};
