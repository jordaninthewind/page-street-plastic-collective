export const formatEntry = ({ lng, lat, ...fields }) => {
  try {
    return {
      ...fields,
      location: `Point(${lng} ${lat})`,
    };
  } catch (error) {
    console.error(error);
  }
};
