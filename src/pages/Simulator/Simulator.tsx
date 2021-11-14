import React, { useEffect, useState } from "react";
import { Divider, Popover } from "antd";
import AmortiTable from "./AmortiTable";
import GraphPie from "../../components/GraphPie";
import Entries from "./Entries";

const Simulator: React.FC = () => {
  const [capital, setCapital] = useState<number>(188000);
  const [duration, setDuration] = useState<any>(25);
  const [taux, setTaux] = useState<number>(1.3);
  const [assuranceTaux, setAssuranceTaux] = useState<number>(0.4);
  const [assuranceCT, setAssuranceCT] = useState<number>(0);
  const [assuranceCM, setAssuranceCM] = useState<number>(0);

  const creditM =
    (capital * (taux / 12 / 100)) /
    (1 - Math.pow(1 + taux / 12 / 100, -(duration * 12)));
  const interets = creditM * duration * 12 - capital;

  const arrTwoDec = (number: number): number => Math.round(number * 100) / 100;

  // Graph pie data
  const graphData = [
    {
      name: "Credit",
      y: arrTwoDec((capital / (capital + interets + assuranceCT)) * 100),
    },
    {
      name: "Interets",
      y: arrTwoDec((interets / (capital + interets + assuranceCT)) * 100),
    },
    {
      name: "Assurance",
      y: arrTwoDec((assuranceCT / (capital + interets + assuranceCT)) * 100),
    },
  ];

  useEffect(() => {
    setAssuranceCM(arrTwoDec(capital * (assuranceTaux / 12 / 100)));
  }, [capital, assuranceTaux]);

  const mensualiteResult = () => (
    <>
      <p>Crédit : {arrTwoDec(creditM)}€ </p>
      <p>Assurance : {assuranceCM}€ </p>
    </>
  );

  return (
    <>
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
      <GraphPie data={graphData} />
      <Divider />
      <Popover content={mensualiteResult()}>
        <p>Mensualité : {arrTwoDec(creditM) + assuranceCM}€ </p>
      </Popover>
      <Divider />

      {Boolean(capital && duration && taux) && (
        <AmortiTable
          setAssuranceCT={setAssuranceCT}
          arrTwoDec={arrTwoDec}
          capital={capital}
          taux={taux}
          creditM={creditM}
          assuranceCM={assuranceCM}
        />
      )}
    </>
  );
};

export default Simulator;
