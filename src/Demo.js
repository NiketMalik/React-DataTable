import React from "react";
import DataTable from "components/DataTable/index";
import "static/css/app.scss";

const pageSize = 50;
const generateRows = (pageNumber = 0) => {
  const rows = [];
  for (
    let i = pageNumber * pageSize;
    i < pageNumber * pageSize + pageSize;
    i++
  ) {
    rows.push({
      id: `id_${i}`,
      description: "Loreum Ipsum",
      product: <span>{`Product ${i + 1}`}</span>,
      price: 15.2 + i,
    });
  }
  return rows;
};

const loadRows = (pageNumber = 0) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(generateRows(pageNumber)), 2500);
  });
};

export default () => {
  return (
    <div>
      <h1 className="header">Data Table</h1>
      <DataTable
        onLoadMore={loadRows}
        onRowClick={console.log}
        onSelectionChange={console.log}
        config={{ stickyHeader: true }}
        columns={[
          {
            id: "product",
            label: "Product",
            numeric: false,
            width: "160px",
          },
          {
            id: "description",
            label: "Description",
            numeric: false,
            width: "50%",
          },
          {
            id: "price",
            label: "Price",
            numeric: true,
          },
        ]}
        rows={generateRows(0)}
        rowHeight={55}
        visibleRows={10}
      />
    </div>
  );
};
