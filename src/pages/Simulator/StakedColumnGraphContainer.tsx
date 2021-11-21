import React, { useState, useEffect } from "react";
import GraphStakedColumn from "../../components/GraphStakedColumn";

// utils
import { roundTwoDec } from "../../utils/format";

interface StakedColumnGraphContainerProps {
  capital: number;
  creditM: number;
  taux: number;
  assuranceCM: number;
}

const StakedColumnGraphContainer: React.FC<StakedColumnGraphContainerProps> = (
  props
) => {
  const { capital, creditM, taux, assuranceCM } = props;
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const data: any = [
      {
        name: "interêts",
        color: "#ca3c3d",
        data: [],
      },
      {
        name: "Assurance",
        color: "#39b620",
        data: [],
      },
      {
        name: "Crédit",
        color: "#007bc1",
        data: [],
      },
    ];

    let rest = capital;

    while (rest > 0.001) {
      const interet = rest * (taux / 12 / 100);
      const amortiM = creditM - interet;

      data
        .find((category: any) => category.name === "interêts")
        .data.push(roundTwoDec(interet));
      data
        .find((category: any) => category.name === "Assurance")
        .data.push(roundTwoDec(assuranceCM));
      data
        .find((category: any) => category.name === "Crédit")
        .data.push(roundTwoDec(amortiM));

      rest = rest + interet - creditM;
    }
    setGraphData(data);
  }, [assuranceCM, creditM, taux]);

  return (
    <>
      <GraphStakedColumn data={graphData} />
    </>
  );
};

export default StakedColumnGraphContainer;
