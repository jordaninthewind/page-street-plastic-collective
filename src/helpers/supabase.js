export const formatEntry = ({ lng, lat, covered = false, ...fields }) => {
  const location = `Point(${lng} ${lat})`;

  return {
    ...fields,
    covered,
    location,
    lat,
    lng,
  };
};
