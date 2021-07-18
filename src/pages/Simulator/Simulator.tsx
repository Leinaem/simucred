import React, { useState } from "react";
import { Divider, InputNumber, Row, Col, Select } from "antd";
import AmortiTable from "./AmortiTable";

const { Option } = Select;

const Simulator: React.FC = () => {
  const [capital, setCapital] = useState<number>(188000);
  const [taux, setTaux] = useState<number>(1.3);
  const [tauxA, setTauxA] = useState<number>(0.4);
  const [duration, setDuration] = useState<any>(20);

  const coutCred =
    (capital * (taux / 12 / 100)) /
    (1 - Math.pow(1 + taux / 12 / 100, -(duration * 12)));
  const interets = coutCred * duration * 12 - capital;
  const coutAssu = capital * (tauxA / 12 / 100);

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
            onChange={(e) => setTauxA(e as number)}
            defaultValue={tauxA}
          />
        </Col>
      </Row>

      {Boolean(capital && duration && taux) && (
        <>
          <h3>cout crédit mensuel : {Math.round(coutCred * 100) / 100}</h3>
          <h3>cout assurance mensual : {Math.round(coutAssu * 100) / 100}</h3>
          <h3>Mensualité : {Math.round((coutAssu + coutCred) * 100) / 100}</h3>

          <h3>Interets : {Math.round(interets * 100) / 100}</h3>
          <AmortiTable capital={capital} taux={taux} coutCred={coutCred} />
        </>
      )}
    </>
  );
};

export default Simulator;
