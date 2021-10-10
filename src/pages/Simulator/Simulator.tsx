import React, { useEffect, useState } from "react";
import { Divider, InputNumber, Row, Col, Select, Popover } from "antd";
import AmortiTable from "./AmortiTable";
import GraphPie from "../../components/GraphPie";

const { Option } = Select;

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

  const options = [];
  for (let i = 15; i < 31; i++) {
    options.push(
      <Option key={i} value={i}>
        {i}
      </Option>
    );
  }

  // Grapg pie data
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
      <Row gutter={16} justify="center">
        <Col span={5}>
          <h4>Capital</h4>
          <InputNumber
            placeholder="Capital"
            style={{ width: 150 }}
            step="1000"
            defaultValue={capital}
            onChange={(e) => {
              setCapital(e as number);
            }}
          />
        </Col>
        <Col span={5}>
          <h4>Années</h4>
          <Select
            placeholder="Duration"
            style={{ width: 150 }}
            onChange={(value) => setDuration(value)}
            defaultValue={duration}
          >
            {options}
          </Select>
        </Col>
        <Col span={5}>
          <h4>Taux (crédit)</h4>
          <InputNumber
            placeholder="Taux"
            style={{ width: 150 }}
            step="0.05"
            onChange={(e) => setTaux(e as number)}
            defaultValue={taux}
          />
        </Col>
        <Col span={5}>
          <h4>Taux (assurance)</h4>
          <InputNumber
            placeholder="TauxA"
            style={{ width: 150 }}
            step="0.01"
            onChange={(e) => setAssuranceTaux(e as number)}
            defaultValue={assuranceTaux}
          />
        </Col>
      </Row>

      <Divider />
      <GraphPie data={graphData} />
      <Divider />
      <Popover content={mensualiteResult()}>
        <p>Mensualité : {arrTwoDec(creditM) + assuranceCM}€ </p>
      </Popover>
      <Divider />

      {Boolean(capital && duration && taux) && (
        <>
          <AmortiTable
            setAssuranceCT={setAssuranceCT}
            arrTwoDec={arrTwoDec}
            capital={capital}
            taux={taux}
            creditM={creditM}
            assuranceCM={assuranceCM}
          />
        </>
      )}
    </>
  );
};

export default Simulator;
