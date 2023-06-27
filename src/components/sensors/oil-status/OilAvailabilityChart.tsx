import { DGaugeChart } from '@/config/dynamic-gauge-chart';
import type { GaugeConfig } from '@ant-design/plots';

const OilAvailabilityChart = ({ percent }: any) => {
  const config: GaugeConfig = {
    percent,
    range: {
      color: '#30BF78',
      width: 12,
    },
    indicator: {
      pointer: {
        style: {
          stroke: '#D0D0D0',
        },
      },
      pin: {
        style: {
          stroke: '#D0D0D0',
        },
      },
    },
    gaugeStyle: {
      lineCap: 'round',
    },
  };

  return <DGaugeChart {...config} />;
};

export default OilAvailabilityChart;
