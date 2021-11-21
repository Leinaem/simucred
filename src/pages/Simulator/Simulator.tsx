import React, { useEffect, useState } from "react";

// Libraries
import { Divider } from "antd";

// Components
import AmortiTable from "./AmortiTable";
import GraphPie from "../../components/GraphPie";
import Synthesis from "./Synthesis";
import Entries from "./Entries";

// utils
import { roundTwoDec } from "../../utils/format";

const Simulator: React.FC = () => {
  const [capital, setCapital] = useState<number>(210000);
  const [duration, setDuration] = useState<any>(25);
  const [taux, setTaux] = useState<number>(1.29);
  const [assuranceTaux, setAssuranceTaux] = useState<number>(0.36);
  const [assuranceCT, setAssuranceCT] = useState<number>(0);
  const [assuranceCM, setAssuranceCM] = useState<number>(0);

  const creditM =
    (capital * (taux / 12 / 100)) /
    (1 - Math.pow(1 + taux / 12 / 100, -(duration * 12)));
  const interets = creditM * duration * 12 - capital;

  // Graph pie data
  const graphData = [
    {
      name: "Credit",
      y: roundTwoDec((capital / (capital + interets + assuranceCT)) * 100),
    },
    {
      name: "Interets",
      y: roundTwoDec((interets / (capital + interets + assuranceCT)) * 100),
    },
    {
      name: "Assurance",
      y: roundTwoDec((assuranceCT / (capital + interets + assuranceCT)) * 100),
    },
  ];

  useEffect(() => {
    setAssuranceCM(roundTwoDec(capital * (assuranceTaux / 12 / 100)));
  }, [capital, assuranceTaux]);

  return (
    <div className="simulator">
      <h2>Simulation</h2>
      <Divider />
      <Entries
        setCapital={setCapital}
        capital={capital}
        duration={duration}
        setDuration={setDuration}
        taux={taux}
        setTaux={setTaux}
        assuranceTaux={assuranceTaux}
        setAssuranceTaux={setAssuranceTaux}
      />
      <Divider />
      <Synthesis
        creditM={creditM}
        assuranceCM={assuranceCM}
        assuranceCT={assuranceCT}
        interets={interets}
      />
      <Divider />
      <GraphPie data={graphData} />
      <Divider />
      {Boolean(capital && duration && taux) && (
        <AmortiTable
          setAssuranceCT={setAssuranceCT}
          roundTwoDec={roundTwoDec}
          capital={capital}
          taux={taux}
          creditM={creditM}
          assuranceCM={assuranceCM}
        />
      )}
    </div>
  );
};

export default Simulator;
