import React, { useState, useEffect } from "react";
import { Table } from "antd";

interface AmortiTableProps {
  setTotalAssurance: Function;
  tauxAssurance: number;
  arrTwoDec: Function;
  coutCreditM: number;
  capital: number;
  taux: number;
}

const AmortiTable: React.FC<AmortiTableProps> = (props) => {
  const {
    capital,
    coutCreditM,
    taux,
    tauxAssurance,
    setTotalAssurance,
    arrTwoDec,
  } = props;
  const [tableData, setTableData] = useState([]);

  const columns = [
    { title: "n°", dataIndex: "mensuNumber", key: "mensuNumber" },
    {
      title: "Capital restant",
      dataIndex: "rest",
      key: "rest",
    },
    { title: "Interets", dataIndex: "interet", key: "interet" },
    { title: "Cout Assurance", dataIndex: "assuranceM", key: "assuranceM" },
    { title: "Cumul Assurance", dataIndex: "assuranceT", key: "assuranceT" },
    { title: "Amorti / M", dataIndex: "amortiM", key: "amortiM" },
    { title: "Amorti Total", dataIndex: "amortiT", key: "amortiT" },
  ];

  useEffect(() => {
    const dataSource: any = [];
    const assuranceM = arrTwoDec(capital * (tauxAssurance / 12 / 100));
    let rest = capital;
    let key = 1;
    let amortiT = 0;
    let assuranceT = 0;
    while (rest > 0.001) {
      const interet = rest * (taux / 12 / 100);
      const amortiM = coutCreditM - interet;
      amortiT += amortiM;
      assuranceT += assuranceM;
      dataSource.push({
        key,
        mensuNumber: key,
        rest: arrTwoDec(rest),
        interet: arrTwoDec(interet),
        assuranceM,
        assuranceT: arrTwoDec(assuranceT),
        amortiM: arrTwoDec(amortiM),
        amortiT: arrTwoDec(amortiT),
      });
      rest = rest + interet - coutCreditM;
      key++;
    }
    setTotalAssurance(assuranceT);
    setTableData(dataSource);
  }, [coutCreditM, tauxAssurance]);

  return <Table columns={columns} dataSource={tableData} />;
};

export default AmortiTable;
