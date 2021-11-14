import React from "react";
// @ts-ignore
import ReactHighcharts from "react-highcharts";

const initialConfig = {
  chart: {
    type: "pie",
    spacing: [0, 0, 0, 0],
    backgroundColor: "#006655",
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
  },
  plotOptions: {
    series: {
      states: {
        hover: {
          halo: {
            size: 15,
            opacity: 0.7,
          },
        },
      },
    },
    pie: {
      borderWidth: 2,
      size: "90%",
    },
  },
  series: [
    {
      dataLabels: {
        style: {
          color: "#fff",
          fontSize: 14,
          fontWeight: 400,
        },

        connectorWidth: 2,
        distance: 20,
      },

      name: "Cout %",
      colors: ["#007bc1", "#ca3c3d", "#39b620"],
      data: [
        {
          name: "Credit",
        },
        {
          name: "Interets",
        },
        {
          name: "Assurance",
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
    <div className="chart-container">
      <ReactHighcharts config={config} {...graphStyles} />
    </div>
  );
};

export default GraphPie;
