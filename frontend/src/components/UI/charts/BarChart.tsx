import { useRef, FC, useEffect, useState } from 'react';
import { Chart} from 'react-chartjs-2';
import { useAppSelector } from '../../../hook';

const BarChart: FC = () => { 

  const getColorByValue = (value: number | null): string | undefined  => {
    if (value != null && value <= 35) {
        return '#DD7474'; 
    } else if (value != null && value > 35 && value < 70) {
        return '#E1BC5C'; 
    } else if (value != null && value >= 70){
        return '#5ACA85'; 
    } else {
        return undefined;
    }
  };

  const countriesPublic = useAppSelector(state => state.countriesPublic.initialStateCountriesPublic);
  

  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
  const [backgroundColor, setBackgroundColor] = useState<(string | undefined)[] >([]);

  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (countriesPublic && countriesPublic.countries){
      setLabels(countriesPublic.countries.map((item) => item.country))
      setData(countriesPublic.countries.map((item) => item.average_live_level));
      setBackgroundColor(countriesPublic.countries.map((item) => getColorByValue(item.average_live_level)));
    }
  }, [countriesPublic]);

  useEffect(() => {
    if (labels.length != 0) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      chartRef.current = new Chart(document.getElementById('myChart') as HTMLCanvasElement, {
        type: 'bar',
        data:{
            labels: labels,
            datasets: [
                {
                    label: 'Average live level',
                    data: data,
                    backgroundColor: backgroundColor,
                    borderRadius: 5,
                },
            ],
        },
        options: {
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
              max: 100,
            },
          },
        },
      });
    }
  }, [labels]);

  return <canvas id="myChart" />;
};
  
export default BarChart;