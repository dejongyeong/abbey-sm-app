import { DMultiLineChart } from '@/config/dynamic-multi-line-chart';

const MultiLineChart = ({ data }: any) => {
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
    yAxis: { title: { text: 'Revolutions per Minute (RPM)' } },
    slider: { start: 0.8, end: 1.0 },
    tooltip: { shared: true },
    responsive: true,
  };

  return <DMultiLineChart {...config} />;
};

export default MultiLineChart;
