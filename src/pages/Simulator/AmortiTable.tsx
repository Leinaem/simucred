import React, { useState, useEffect } from "react";
import { Table } from "antd";

interface AmortiTableProps {
  setAssuranceCT: Function;
  assuranceCM: number;
  roundTwoDec: Function;
  creditM: number;
  capital: number;
  taux: number;
}

const AmortiTable: React.FC<AmortiTableProps> = (props) => {
  const { capital, creditM, taux, setAssuranceCT, roundTwoDec, assuranceCM } =
    props;
  const [tableData, setTableData] = useState([]);

  const columns = [
    { title: "n°", dataIndex: "mensuNumber", key: "mensuNumber" },
    {
      title: "Capital restant",
      dataIndex: "rest",
      key: "rest",
    },
    { title: "Interets", dataIndex: "interet", key: "interet" },
    { title: "Cout Assurance", dataIndex: "assuranceCM", key: "assuranceCM" },
    { title: "Cumul Assurance", dataIndex: "assuranceT", key: "assuranceT" },
    { title: "Amorti / M", dataIndex: "amortiM", key: "amortiM" },
    { title: "Amorti Total", dataIndex: "amortiT", key: "amortiT" },
  ];

  useEffect(() => {
    const dataSource: any = [];
    let rest = capital;
    let key = 1;
    let amortiT = 0;
    let assuranceT = 0;
    while (rest > 0.001) {
      const interet = rest * (taux / 12 / 100);
      const amortiM = creditM - interet;
      amortiT += amortiM;
      assuranceT += assuranceCM;
      dataSource.push({
        key,
        mensuNumber: key,
        rest: roundTwoDec(rest),
        interet: roundTwoDec(interet),
        assuranceCM,
        assuranceT: roundTwoDec(assuranceT),
        amortiM: roundTwoDec(amortiM),
        amortiT: roundTwoDec(amortiT),
      });
      rest = rest + interet - creditM;
      key++;
    }
    setAssuranceCT(assuranceT);
    setTableData(dataSource);
  }, [creditM, assuranceCM]);

  return <Table columns={columns} dataSource={tableData} />;
};

export default AmortiTable;
