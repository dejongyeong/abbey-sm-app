import { DLineChart } from '@/config/dynamic-line-chart';

const OilAvailabilityChart = ({ data }: any) => {
  const config = {
    data,
    xField: 'dt',
    yField: 'value',
    seriesField: 'category',
    xAxis: {
      title: { text: 'Timestamp' },
      label: {
        formatter: (value: any) => {
          return value.split(' ').join('\n');
        },
      },
    },
    yAxis: {
      title: { text: 'Status' },
    },
    stepType: 'vh',
    slider: { start: 0.5, end: 1.0 },
    tooltip: { shared: true },
    responsive: true,
  };

  return <DLineChart {...config} />;
};

export default OilAvailabilityChart;

// import { DGaugeChart } from '@/config/dynamic-gauge-chart';
// import type { GaugeConfig } from '@ant-design/plots';

// const config: GaugeConfig = {
//   percent,
//   range: {
//     color: '#30BF78',
//     width: 12,
//   },
//   indicator: {
//     pointer: {
//       style: {
//         stroke: '#D0D0D0',
//       },
//     },
//     pin: {
//       style: {
//         stroke: '#D0D0D0',
//       },
//     },
//   },
//   gaugeStyle: {
//     lineCap: 'round',
//   },
// };
