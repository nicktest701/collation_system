import { Bar } from 'react-chartjs-2';
import Content from '../Content';
// import _ from 'lodash';
const BarChart = () => {
  return (
    // <Card>
    //   <CardContent>
    <Content
      sx={{
        minWidth: 150,
        height: 200,
      }}
    >
      <Bar
        data={{
          // labels,
          labels: ['one', 'two', 'three'],
          datasets: [
            {
              label: 'No of Students',
              // data: dataset,
              data: [5, 4, 5],
              // backgroundColor: [' rgb(1, 46, 84)', 'rgb(255, 192, 159)'],
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: 2,
            autoPadding: true,
          },
          scales: {
            x: {
              ticks: {
                display: false,
              },
              grid: {
                display: false,
              },
            },
            y: {
              ticks: {
                display: false,
              },
              grid: {
                display: false,
              },
            },
          },
          plugins: {
            legend: {
              // display: false,
            },
          },
        }}
      />
    </Content>
    //   </CardContent>
    // </Card>
  );
};

export default BarChart;
