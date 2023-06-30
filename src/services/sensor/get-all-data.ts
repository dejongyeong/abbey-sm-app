import { getGps } from './get-gps-data';
import { getHydraulicPressure } from './get-hydraulic-pressure';
import { getOilStatus } from './get-oil-status';
import { getVacuumSpeed } from './get-vacuum-speed';
import { getVacuumTemperature } from './get-vacuum-temperature';

const getAllData = async (start: any, end: any, serial: any) => {
  const requests = [
    { getData: getVacuumSpeed, key: 'vacuumSpeed' },
    { getData: getVacuumTemperature, key: 'vacuumTemp' },
    { getData: getHydraulicPressure, key: 'hydraulicPressure' },
    { getData: getOilStatus, key: 'oilStatus' },
    { getData: getGps, key: 'gps' },
  ];

  const updatedSensorData: any = {
    vacuumSpeed: [],
    vacuumSpeedError: false,
    vacuumTemp: [],
    vacuumTempError: false,
    hydraulicPressure: [],
    hydraulicPressureError: false,
    oilStatus: [],
    oilStatusError: false,
    gps: [],
    gpsError: false,
  };

  await Promise.all(
    requests.map(async ({ getData, key }) => {
      try {
        const data = await getData({ start, end, serial });
        updatedSensorData[key] = data;
      } catch (error) {
        updatedSensorData[`${key}Error`] = true;
      }
    })
  );

  return updatedSensorData;
};

export default getAllData;
