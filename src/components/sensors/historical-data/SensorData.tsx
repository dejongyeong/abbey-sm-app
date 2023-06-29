import MachineMap from '@/components/mapping/MachineMap';
import HydraulicPressure from '@/components/sensors/hydraulic-pressure/HydraulicPressure';
import OilAvailability from '@/components/sensors/oil-status/OilAvailability';
import VacuumSpeed from '@/components/sensors/vacuum-speed/VacuumSpeed';
import VacuumTemp from '@/components/sensors/vacuum-temperature/VacuumTemp';

interface IProps {
  vacuumSpeed: any[];
  vacuumSpeedError: boolean;
  vacuumTemp: any[];
  vacuumTempError: boolean;
  hydraulicPressure: any[];
  hydraulicPressureError: boolean;
  oilStatus: any[];
  oilStatusError: boolean;
  gps: any[];
  gpsError: boolean;
}

export default function SensorData({
  vacuumSpeed,
  vacuumSpeedError,
  vacuumTemp,
  vacuumTempError,
  hydraulicPressure,
  hydraulicPressureError,
  oilStatus,
  oilStatusError,
  gps,
  gpsError,
}: IProps) {
  return (
    <>
      <div className="grid grid-cols-2 max-[1440px]:grid-cols-2 max-[768px]:grid-cols-1 gap-4">
        <VacuumSpeed data={vacuumSpeed} error={vacuumSpeedError} />
        <VacuumTemp data={vacuumTemp} error={vacuumTempError} />
        <HydraulicPressure
          data={hydraulicPressure}
          error={hydraulicPressureError}
        />
        <OilAvailability data={oilStatus} error={oilStatusError} />
      </div>
      <div className="mt-4">
        <MachineMap data={gps} error={gpsError} />
      </div>
    </>
  );
}
