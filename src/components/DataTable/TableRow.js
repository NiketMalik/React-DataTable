import React from "react";
import PropTypes from "prop-types";

import { TableRowPropValidator } from "components/DataTable/helpers";

const TableRow = props => {
  const { config, onClick, onSelectionChange, row } = props;
  const { id, selected, ...columns } = row;

  return (
    <tr
      className="table-row"
      data-row-id={id}
      onClick={_ => onClick && onClick()}
      style={{
        height: `${config.rowHeight}px`,
        top: `${config.rowStartIndex}px`,
      }}
    >
      <td className="table-row-item">
        <input
          type="checkbox"
          className="checkbox"
          checked={!!selected}
          onClick={e => {
            e.stopPropagation();
          }}
          onChange={e => {
            onSelectionChange && onSelectionChange(e.target.checked);
          }}
        />
      </td>

      {config.keys.map((column, index) => {
        const style = {};
        if (config.width[index]) {
          style.width = config.width[index];
        } else {
          style.flex = "1";
        }

        return (
          <td
            key={`TableRow_${column}_${id}`}
            style={style}
            className={`table-row-item ${
              config.numeric[index] ? "table-row-item_is-numeric" : ""
            }`}
          >
            {columns[column]}
          </td>
        );
      })}
    </tr>
  );
};

TableRow.propTypes = {
  config: PropTypes.exact({
    keys: PropTypes.arrayOf(PropTypes.string).isRequired,
    width: PropTypes.arrayOf(PropTypes.string).isRequired,
    numeric: PropTypes.arrayOf(PropTypes.bool).isRequired,
    rowHeight: PropTypes.number.isRequired,
    rowStartIndex: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
  onSelectionChange: PropTypes.func,
  row: TableRowPropValidator,
};

export default TableRow;
