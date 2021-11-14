import React from "react";
import { InputNumber, Row, Col, Select } from "antd";
const { Option } = Select;

interface EntriesProps {
  capital: number;
  setCapital: Function;
  duration: number;
  setDuration: Function;
  taux: number;
  setTaux: Function;
  assuranceTaux: number;
  setAssuranceTaux: Function;
}

const Entries: React.FC<EntriesProps> = (props) => {
  const {
    capital,
    setCapital,
    duration,
    setDuration,
    taux,
    setTaux,
    assuranceTaux,
    setAssuranceTaux,
  } = props;

  const options = [];
  for (let i = 10; i < 31; i++) {
    options.push(
      <Option key={i} value={i}>
        {i}
      </Option>
    );
  }

  return (
    <>
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
    </>
  );
};

export default Entries;
