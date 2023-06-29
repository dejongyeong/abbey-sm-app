import MachineMap from '@/components/mapping/MachineMap';
import HydraulicPressure from '@/components/sensors/hydraulic-pressure/HydraulicPressure';
import OilAvailability from '@/components/sensors/oil-status/OilAvailability';
import VacuumSpeed from '@/components/sensors/vacuum-speed/VacuumSpeed';
import VacuumTemp from '@/components/sensors/vacuum-temperature/VacuumTemp';
export default function SensorData() {
  return (
    <>
      <div className="grid grid-cols-2 max-[1440px]:grid-cols-2 max-[768px]:grid-cols-1 gap-4">
        <VacuumSpeed />
        <VacuumTemp />
        <HydraulicPressure />
        <OilAvailability />
      </div>
      <div className="mt-4">
        <MachineMap />
      </div>
    </>
  );
}
