import React from "react";
import PropTypes from "prop-types";

import TableHead from "components/DataTable/TableHead";
import TableRow from "components/DataTable/TableRow";
import {
  GreaterThanZeroPropValidator,
  TableRowPropValidator,
} from "components/DataTable/helpers";

class DataTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      computedRows: props.rows.slice(0, props.visibleRows * 2),
      isLoading: false,
      rows: props.rows,
      rowStartIndex: 0,
      page: 0,
      visibleRows: props.visibleRows,
    };

    this.tableRef = React.createRef();
    this.tableBodyRef = React.createRef();
  }

  componentDidMount() {
    const { onLoadMore } = this.props;
    if (onLoadMore) {
      const tableEle = this.tableRef.current;
      const tableBodyEle = this.tableBodyRef.current;
      tableEle.addEventListener("scroll", e => {
        // Compute client height on scroll for dynamic height
        const tableScrollTop = tableEle.scrollTop;
        const tableOffsetHeight = tableEle.clientHeight;
        const tableBodyScrollHeight = tableBodyEle.scrollHeight;

        this._throttle(this._handleRowVisibility.bind(this), 10)(
          tableScrollTop
        );

        if (!this.state.isLoading) {
          if (tableBodyScrollHeight - tableOffsetHeight <= tableScrollTop) {
            this.setState({ isLoading: true }, () => {
              this._loadMore();
            });
          }
        }
      });
    }
  }

  /**
   * Throttling event
   * @param {Function} callback
   * @param {number} limit
   * @returns {Function}
   * @private
   */
  _throttle(callback, limit) {
    let wait = false;
    return function() {
      if (!wait) {
        callback.apply(null, arguments);
        wait = true;
        setTimeout(function() {
          wait = false;
        }, limit);
      }
    };
  }

  /**
   * Handles row virtualization logic
   * @param {number} scrollOffset
   * @private
   */
  _handleRowVisibility(scrollOffset) {
    const { rowHeight } = this.props;
    const { rows, visibleRows } = this.state;

    const currentVisibleRowIndex = Math.floor(scrollOffset / rowHeight);
    const prevRowIndex = currentVisibleRowIndex - visibleRows * 2;
    const nextRowIndex = currentVisibleRowIndex + visibleRows * 4;
    const rowStartIndex = prevRowIndex > 0 ? prevRowIndex : 0;

    const mutatedComputedRows = [];
    rows
      .slice(rowStartIndex, currentVisibleRowIndex)
      .forEach(row => mutatedComputedRows.push(row));
    rows
      .slice(currentVisibleRowIndex, nextRowIndex)
      .forEach(row => mutatedComputedRows.push(row));

    this.setState({
      computedRows: mutatedComputedRows,
      rowStartIndex: rowStartIndex,
    });
  }

  /**
   * Handles loadMore for infinite scroll
   * @private
   */
  _loadMore() {
    const { onLoadMore } = this.props;
    const { page } = this.state;

    const nextPage = page + 1;
    onLoadMore(nextPage).then(nextRows => {
      this.setState(prevState => ({
        isLoading: false,
        page: nextPage,
        rows: [...prevState.rows, ...nextRows],
      }));
    });
  }

  /**
   * Recomputes the row for any updates
   * @private
   */
  _recomputeRows() {
    const { rows, computedRows } = this.state;

    const mutatedComputedRows = computedRows.map(computedRow => {
      return rows.find(row => row.id === computedRow.id);
    });

    this.setState({ computedRows: mutatedComputedRows });
  }

  /**
   * Handles row selection change event.
   * @param {number} index
   * @param {boolean} isSelected
   * @private
   */
  _rowSelectionChangeHandler(index, isSelected) {
    const { onSelectionChange } = this.props;
    this.setState(
      prevState => {
        const mutatedRows = [...prevState.rows];
        mutatedRows[index].selected = isSelected;

        // Trigger selectionChange
        onSelectionChange &&
          onSelectionChange(
            mutatedRows.filter(row => !!row.selected).map(row => row.id)
          );

        return {
          rows: mutatedRows,
        };
      },
      () => {
        this._recomputeRows();
      }
    );
  }

  /**
   * Handles row selection change event.
   * @param {boolean} isSelected
   * @private
   */
  _selectAllHandler(isSelected) {
    const { onSelectionChange } = this.props;
    this.setState(
      prevState => {
        const mutatedRows = [...prevState.rows].map(row => ({
          ...row,
          selected: isSelected,
        }));

        // Trigger selectionChange
        onSelectionChange &&
          onSelectionChange(
            (isSelected ? prevState.rows : []).map(row => row.id)
          );

        return {
          rows: mutatedRows,
        };
      },
      () => {
        this._recomputeRows();
      }
    );
  }

  render() {
    const {
      className,
      columns,
      config,
      onRowClick,
      rowHeight,
      visibleRows,
    } = this.props;
    const { computedRows, isLoading, rows, rowStartIndex } = this.state;

    const isSticky = !!config.stickyHeader;
    const isSelectAll =
      rows.length > 0 &&
      rows.filter(row => !!row.selected).length === rows.length;
    const rowConfig = {
      keys: [],
      numeric: [],
      rowHeight: rowHeight,
      width: [],
    };
    columns.forEach(column => {
      rowConfig.keys.push(column.id);
      rowConfig.numeric.push(column.numeric);
      rowConfig.width.push(column.width);
    });

    const tableHeadCommonProps = {
      columns: columns,
      isSelectAll: isSelectAll,
      onSelectionChange: this._selectAllHandler.bind(this),
    };

    let tableHeight = visibleRows * rowHeight;
    if (rows.length === 0) {
      tableHeight = 50;
    }

    return (
      <div
        className={`data-table ${className || ""}`}
        data-is-loading={isLoading}
      >
        {isLoading && <div className="loader" />}
        {isSticky && <TableHead {...tableHeadCommonProps} isSticky={true} />}

        <table
          ref={this.tableRef}
          cellPadding="0"
          cellSpacing="0"
          style={{
            height: `${tableHeight}px`,
          }}
        >
          {!isSticky && (
            <thead>
              <TableHead {...tableHeadCommonProps} isSticky={false} />
            </thead>
          )}
          <tbody
            ref={this.tableBodyRef}
            className="data-table-body"
            style={{ height: `${rows.length * rowHeight}px` }}
          >
            {rows.length === 0 && (
              <tr className="table-row empty-rows">
                <td className="table-row-item">No Data</td>
              </tr>
            )}
            {rows.length > 0 &&
              computedRows.map((row, index) => (
                <TableRow
                  key={`DataTable_TableRow_${row.id}`}
                  config={{
                    ...rowConfig,
                    rowStartIndex: (rowStartIndex + index) * rowHeight,
                  }}
                  row={row}
                  onClick={column => onRowClick(row, rowStartIndex + index)}
                  onSelectionChange={isSelected =>
                    this._rowSelectionChangeHandler(
                      rowStartIndex + index,
                      isSelected
                    )
                  }
                />
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

DataTable.propTypes = {
  className: PropTypes.string,
  config: PropTypes.shape({
    stickyHeader: PropTypes.bool,
  }).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
        .isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.string,
    })
  ).isRequired,
  onLoadMore: PropTypes.func,
  onRowClick: PropTypes.func,
  onSelectionChange: PropTypes.func,
  rows: PropTypes.arrayOf(TableRowPropValidator).isRequired,
  rowHeight: GreaterThanZeroPropValidator,
  visibleRows: GreaterThanZeroPropValidator,
};

export default DataTable;
export { TableRow };
