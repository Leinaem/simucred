import React from "react";
// @ts-ignore
import ReactHighcharts from "react-highcharts";

const initialConfig = {
  chart: {
    type: "column",
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
  xAxis: {
    categories: ["Apples", "Oranges", "Pears", "Grapes", "Bananas"],
  },
  yAxis: {
    min: 0,
    title: {
      text: "Total fruit consumption",
    },
    stackLabels: {
      style: {
        color: "gray",
      },
    },
  },

  tooltip: {
    headerFormat: "<b>Mensualité {point.x}</b><br/>",
    pointFormat: "{series.name}: {point.y} €<br/>Total: {point.stackTotal} €",
  },

  legend: {
    backgroundColor: "white",
    borderColor: "#CCC",
    borderWidth: 1,
  },

  plotOptions: {
    column: {
      stacking: "normal",
    },
    series: {
      borderWidth: 0,
      pointPadding: 0,
      groupPadding: 0,
    },
  },
  series: [],
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

interface GraphStakedColumnProps {
  data: any;
}
const GraphStakedColumn: React.FC<GraphStakedColumnProps> = (props) => {
  const config = {
    ...initialConfig,
  };

  config.series = props.data;

  return (
    <div className="chart-container">
      <ReactHighcharts config={config} {...graphStyles} />
    </div>
  );
};

export default GraphStakedColumn;
