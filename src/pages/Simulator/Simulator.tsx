import React, { useState } from "react";
import { Divider, InputNumber, Row, Col, Select, Table } from "antd";
import AmortiTable from "./AmortiTable";
import GraphTest from "../../components/GraphPie";

const { Option } = Select;

const Simulator: React.FC = () => {
  const [capital, setCapital] = useState<number>(188000);
  const [taux, setTaux] = useState<number>(1.3);
  const [tauxAssurance, setTauxAssurance] = useState<number>(0.4);
  const [duration, setDuration] = useState<any>(25);
  const [TotalAssurance, setTotalAssurance] = useState<number>(0);

  const coutCreditM =
    (capital * (taux / 12 / 100)) /
    (1 - Math.pow(1 + taux / 12 / 100, -(duration * 12)));
  const interets = coutCreditM * duration * 12 - capital;
  const coutAssu = capital * (tauxAssurance / 12 / 100);

  const arrTwoDec = (number: number): number => Math.round(number * 100) / 100;

  const options = [];
  for (let i = 15; i < 31; i++) {
    options.push(
      <Option key={i} value={i}>
        {i}
      </Option>
    );
  }

  const columns = [
    { title: "", dataIndex: "type", key: "type" },
    { title: "Mensuel", dataIndex: "mensuel", key: "mensuel" },
    { title: "Total", dataIndex: "total", key: "total" },
  ];

  const tableData = [
    {
      key: 1,
      type: "Cout du crédit",
      mensuel: arrTwoDec(coutCreditM),
      total: arrTwoDec(interets),
    },
    {
      key: 2,
      type: "Cout de l'assurance",
      mensuel: arrTwoDec(coutAssu),
      total: arrTwoDec(TotalAssurance),
    },
    {
      key: 3,
      type: "Cout total",
      mensuel: arrTwoDec(coutAssu + coutCreditM),
      total: arrTwoDec(interets + TotalAssurance),
    },
  ];

  const graphData = [
    {
      name: "Credit",
      y: capital/(capital+interets+TotalAssurance)*100,
    },
    {
      name: "Interets",
      y: interets/(capital+interets+TotalAssurance)*100,
    },
    {
      name: "Assurance",
      y: TotalAssurance/(capital+interets+TotalAssurance)*100,
    },
  ]
  
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
            onChange={(e) => setTauxAssurance(e as number)}
            defaultValue={tauxAssurance}
          />
        </Col>
      </Row>

      <Divider />
      <GraphTest data={graphData} />
      <Divider />

      {Boolean(capital && duration && taux) && (
        <>
          <Table columns={columns} dataSource={tableData} pagination={false} />
          <AmortiTable
            setTotalAssurance={setTotalAssurance}
            arrTwoDec={arrTwoDec}
            capital={capital}
            taux={taux}
            coutCreditM={coutCreditM}
            tauxAssurance={tauxAssurance}
          />
        </>
      )}
    </>
  );
};

export default Simulator;
