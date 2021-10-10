import React from "react";
// @ts-ignore
import ReactHighcharts from "react-highcharts";

const initialConfig = {
  chart: {
    type: "pie",
    spacing: [0, 0, 0, 0],
  },
  title: {
    text: "",
    align: "left",
    style: {
      "font-family": "Open Sans",
      "font-size": "1.4em",
    },
  },
  subtitle: {
    text: "",
    align: "left",
    style: {
      "font-family": "Open Sans",
      "font-size": "1.1em",
    },
  },
  tooltip: {
    useHTML: true,
    backgroundColor: "white",
    borderColor: "transparent",
    borderRadius: 0,
  },
  plotOptions: {
    series: {
      states: {
        hover: {
          halo: {
            size: 10,
          },
        },
      },
    },
    pie: {
      dataLabels: {
        enabled: true,
      },
      borderWidth: 2,
      size: "100%",
    },
  },
  legend: {
    enabled: true,
    itemStyle: {
      fontFamily: "Open Sans",
    },
  },
  series: [
    {
      name: "Cout %",
      colors: [
        "#007bc1",
        "#ca3c3d",
        "#39b620",
        "#983fef",
        "#f47721",
        "#f0aa1f",
        "#f0cb2f",
        "#4da3d4",
        "#da7777",
        "#74cc63",
        "#b779f4",
        "#f7a064",
        "#f5c462",
        "#f5db6d",
      ],
      type: "pie",
      data: [
        {
          name: "Credit",
          y: 61.41,
        },
        {
          name: "Interets",
          y: 11.84,
        },
        {
          name: "Assurance",
          y: 10.85,
        },
      ],
    },
  ],
  credits: {
    enabled: false,
  },
};

const graphStyles = {
  domProps: {
    style: {
      height: "100%",
    },
  },
};

interface GraphPieProps {
  data: any;
}
const GraphPie: React.FC<GraphPieProps> = (props) => {
  const config = {
    ...initialConfig,
  };

  config.series[0].data = props.data;

  return (
    <div>
      <div style={{ height: "200px" }}>
        <ReactHighcharts config={config} {...graphStyles} />
      </div>
    </div>
  );
};

export default GraphPie;
