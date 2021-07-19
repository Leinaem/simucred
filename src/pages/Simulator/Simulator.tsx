import React, { useState } from "react";
import { Divider, InputNumber, Row, Col, Select } from "antd";
import AmortiTable from "./AmortiTable";

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

  return (
    <>
      <h2>Simulation</h2>
      <Divider />
      <Row gutter={16}>
        <Col span={6}>
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
        <Col span={6}>
          <h4>Années</h4>
          <Select
            placeholder="Duration"
            style={{ width: 150 }}
            onChange={(value) => setDuration(value)}
            defaultValue={duration}
          >
            <Option value={15}>15</Option>
            <Option value={20}>20</Option>
            <Option value={25}>25</Option>
          </Select>
        </Col>
        <Col span={6}>
          <h4>Taux (crédit)</h4>
          <InputNumber
            placeholder="Taux"
            style={{ width: 150 }}
            step="0.05"
            onChange={(e) => setTaux(e as number)}
            defaultValue={taux}
          />
        </Col>
        <Col span={6}>
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

      {Boolean(capital && duration && taux) && (
        <>
          <h3>cout crédit mensuel : {arrTwoDec(coutCreditM)}</h3>
          <h3>cout assurance mensuel : {arrTwoDec(coutAssu)}</h3>
          <h3>Mensualité : {arrTwoDec(coutAssu + coutCreditM)}</h3>

          <h3>cout assurance total: {arrTwoDec(TotalAssurance)}</h3>
          <h3>Interets : {arrTwoDec(interets)}</h3>
          <h3>Cout total du drédit : {arrTwoDec(interets + TotalAssurance)}</h3>

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
