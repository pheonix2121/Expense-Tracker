import React from "react";
import styles from "./CsvFileDown.module.css";
import { useSelector } from "react-redux";

const CsvFileDown= () => {
  const items = useSelector((state) => state.item.items);


  const convertToCSV = () => {
    let CSVReport = "Amount,Category,Description\n";
    items.forEach((element) => {
      let row =
        element.amount +
        "," +
        element.category +
        "," +
        element.description +
        "\n";
      CSVReport += row;
    });
    return new Blob([CSVReport], { type: "text/csv" });

  };

  const csvDownloadHandler = () => {
    const csvData = convertToCSV();
    const csvURL = URL.createObjectURL(csvData);

    const tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", "expenses.csv");
    tempLink.click();
  };

  return (
    <button onClick={csvDownloadHandler} className={styles.report}>
      Download Report
    </button>
  );
};

export default CsvFileDown;