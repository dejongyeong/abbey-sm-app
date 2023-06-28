export const convertToLatLng = (coordinates: any) => {
  const data: any = [];
  coordinates.map((coord: any) =>
    data.push([parseFloat(coord.lat), parseFloat(coord.lon)])
  );

  return data;
};
