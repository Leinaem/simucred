import React, { useState, useEffect } from "react";
import { Table } from "antd";

interface AmortiTableProps {
  coutCred: number;
  capital: number;
  taux: number;
}

const AmortiTable: React.FC<AmortiTableProps> = (props) => {
  const { capital, coutCred, taux } = props;
  const [tableData, setTableData] = useState([]);

  const columns = [
    { title: "n°", dataIndex: "mensuNumber", key: "mensuNumber" },
    {
      title: "Capital restant",
      dataIndex: "rest",
      key: "rest",
    },
    { title: "Interets", dataIndex: "interet", key: "interet" },
    { title: "Amorti / M", dataIndex: "amortiM", key: "amortiM" },
    { title: "Amorti Total", dataIndex: "amortiT", key: "amortiT" },
  ];

  useEffect(() => {
    const dataSource: any = [];
    let rest = capital;
    let key = 1;
    let amortiT = 0;
    while (rest > 0) {
      const interet = rest * (taux / 12 / 100);
      const amortiM = coutCred - interet;
      amortiT += amortiM;
      dataSource.push({
        key,
        mensuNumber: key,
        rest: Math.round(rest * 100) / 100,
        interet: Math.round(interet * 100) / 100,
        amortiM: Math.round(amortiM * 100) / 100,
        amortiT: Math.round(amortiT * 100) / 100,
      });
      rest = rest + interet - coutCred;
      key++;
    }
    setTableData(dataSource);
  }, [coutCred]);

  return <Table columns={columns} dataSource={tableData} />;
};

export default AmortiTable;
