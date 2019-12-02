import React from "react";
import PropTypes from "prop-types";

const TableHead = props => {
  const { columns, isSelectAll, isSticky, onSelectionChange } = props;

  const TableHeadWrapperTr = "tr";
  const TableHeadWrapperTh = "th";
  const TableHeadDiv = "div";
  const TableHeadWrapper = isSticky ? TableHeadDiv : TableHeadWrapperTr;
  const TableHeadColumn = isSticky ? TableHeadDiv : TableHeadWrapperTh;

  return (
    <TableHeadWrapper
      className={`table-head ${isSticky ? "table-head-sticky" : ""}`}
    >
      <TableHeadColumn className="table-head-column">
        <input
          type="checkbox"
          className="checkbox"
          checked={!!isSelectAll}
          onChange={e => {
            onSelectionChange && onSelectionChange(e.target.checked);
          }}
        />
      </TableHeadColumn>

      {columns.map(column => {
        const style = {};
        if (column.width) {
          style.width = column.width;
        } else {
          style.flex = "1";
        }

        return (
          <TableHeadColumn
            key={column.id}
            className={`table-head-column ${
              column.numeric ? "table-head-column_is-numeric" : ""
            }`}
            style={style}
          >
            {column.label}
          </TableHeadColumn>
        );
      })}
    </TableHeadWrapper>
  );
};

TableHead.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.string,
    })
  ).isRequired,
  isSelectAll: PropTypes.bool,
  isSticky: PropTypes.bool.isRequired,
  onSelectionChange: PropTypes.func,
};

export default TableHead;
