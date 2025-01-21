import React, { useMemo, useState } from "react";
import Loading from "../LoadingComponent/Loading";
import { Table } from "antd";
import { Excel } from "antd-table-saveas-excel";

const TableComponent = (props) => {
  const {
    selectionType = "checkbox",
    data: dataSource = [],
    isPending = false,
    columns = [],
    handleDeleteMany,
  } = props;
  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);
  const newColumnExport = useMemo(() => {
    const arr = columns?.filter((col) => col.dataIndex !== "action");
    return arr;
  }, [columns]);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys);
    },
  };

  const handleDeleteAll = () => {
    handleDeleteMany(rowSelectedKeys);
  };

  const exportExcel = () => {
    try {
      if (!dataSource || !newColumnExport) {
        console.error("Missing data or columns for export");
        return;
      }

      const excel = new Excel();
      const exportColumns = newColumnExport.map((col) => ({
        title: col.title,
        dataIndex: col.dataIndex,
        key: col.key || col.dataIndex,
      }));

      const exportData = dataSource.map((record) => {
        const row = {};
        exportColumns.forEach((col) => {
          const value = record[col.dataIndex];
          row[col.dataIndex] =
            value !== undefined && value !== null ? String(value) : "";
        });
        return row;
      });

      excel
        .addSheet("Sheet1")
        .addColumns(exportColumns)
        .addDataSource(exportData, {
          str2Percent: false,
          header: true,
        })
        .saveAs("Excel.xlsx");
    } catch (error) {
      console.error("Excel export failed:", error);
    }
  };

  return (
    <Loading isPending={isPending}>
      {rowSelectedKeys?.length > 0 && (
        <div
          style={{
            background: "#1d1ddd",
            color: "#fff",
            fontWeight: "bold",
            padding: "10px",
            cursor: "pointer",
          }}
          onClick={handleDeleteAll}
        >
          Xóa tất cả
        </div>
      )}
      <button
        style={{
          margin: "10px",
          padding: "8px 16px",
          background: "#1d1ddd",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={exportExcel}
      >
        Export Excel
      </button>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
        {...props}
      />
    </Loading>
  );
};

export default TableComponent;
