import React from "react";
import DataTable from "components/DataTable/index";
import "static/css/app.scss";
import "static/css/datatable.scss";

export default class Demo extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      errorToast: false,
      searchTerm: "",
      rows: [],
    };
  }

  componentDidMount() {
    this._rowLoader();
  }

  /**
   * Loads row
   * @private
   */
  _rowLoader() {
    this.loadRows(0)
      .then(rows => {
        this.setState({ rows: rows });
      })
      .catch(err => {
        this.setState(
          {
            errorToast: "Something went wrong. Check console for more info.",
          },
          () => {
            setTimeout(() => {
              this.setState({
                errorToast: false,
              });
            }, 2500);
          }
        );
        console.error(err);
      })
      .finally(_ => this.setState({ isLoading: false }));
  }

  /**
   * Loads data from endpoint
   * @param {!Array<?>} rows
   */
  generateRows(rows) {
    return rows.map(row => ({
      id: `album_${row.id}`,
      thumbnail: (
        <img
          className="demo-thumbnail"
          src={row.thumbnailUrl}
          alt={row.title}
        />
      ),
      title: <span className="demo-title">{row.title}</span>,
      url: row.url,
    }));
  }

  /**
   * Loads data from endpoint
   * @param {number} pageNumber
   */
  loadRows(pageNumber) {
    const { searchTerm } = this.state;
    return fetch(
      `https://jsonplaceholder.typicode.com/photos?_page=${pageNumber +
        1}&q=${searchTerm}`
    )
      .then(res => res.json())
      .then(this.generateRows.bind(this));
  }

  render() {
    const { isLoading, rows } = this.state;
    return (
      <div className="demo">
        <div className="loader" data-is-loading={isLoading} />
        <h1 className="header">Photo Album</h1>

        <DataTable
          onLoadMore={this.loadRows.bind(this)}
          onRowClick={row => {
            window.open(row.url, "_blank");
            console.log(row);
          }}
          onSelectionChange={console.log}
          onSearch={searchTerm =>
            this.setState({ searchTerm }, this._rowLoader)
          }
          config={{ stickyHeader: true }}
          columns={[
            {
              id: "thumbnail",
              label: "Thumbnail",
              numeric: false,
              width: "250px",
            },
            {
              id: "title",
              label: "Title",
              numeric: false,
            },
          ]}
          rows={rows}
          rowHeight={200}
          visibleRows={3}
        />
      </div>
    );
  }
}
