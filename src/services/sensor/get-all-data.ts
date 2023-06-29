import { getGps } from './get-gps-data';
import { getHydraulicPressure } from './get-hydraulic-pressure';
import { getOilStatus } from './get-oil-status';
import { getVacuumSpeed } from './get-vacuum-speed';
import { getVacuumTemperature } from './get-vacuum-temperature';

const getAllData = async (start: any, end: any, serial: any) => {
  const requests = [
    getVacuumSpeed({ start, end, serial }),
    getVacuumTemperature({ start, end, serial }),
    getHydraulicPressure({ start, end, serial }),
    getOilStatus({ start, end, serial }),
    getGps({ start, end, serial }),
  ];

  const [
    vacuumSpeedData,
    vacuumTempData,
    hydraulicPressureData,
    oilStatusData,
    gpsData,
  ] = await Promise.all(requests);

  return {
    vacuumSpeed: vacuumSpeedData,
    vacuumSpeedError: false,
    vacuumTemp: vacuumTempData,
    vacuumTempError: false,
    hydraulicPressure: hydraulicPressureData,
    hydraulicPressureError: false,
    oilStatus: oilStatusData,
    oilStatusError: false,
    gps: gpsData,
    gpsError: false,
  };
};

export default getAllData;
