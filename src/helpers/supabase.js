export const formatEntry = ({ lng, lat, ...fields }) => {
  const location = `Point(${lng} ${lat})`;

  return {
    location,
    lat,
    lng,
    ...fields,
  };
};
