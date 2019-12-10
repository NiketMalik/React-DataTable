import React from "react";
import ReactDOM from "react-dom";
import DataTable from "components/DataTable/index";
import TableRow from "components/DataTable/TableRow";
import { shallow, mount } from "enzyme";

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
      column_1: "Loreum Ipsum",
      column_2: "Loreum Ipsum",
    });
  }
  return rows;
};

const loadRows = (pageNumber = 0) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(generateRows(pageNumber)), 500);
  });
};

const columns = [
  {
    id: "column_1",
    label: "Column 1",
  },
  {
    id: "column_2",
    label: "Column 2",
  },
];

const rowHeight = 55;

describe("DataTable", () => {
  test("Renders without crashing", () => {
    const func = () => {
      const container = shallow(
        <DataTable
          config={{}}
          columns={columns}
          rows={generateRows(0)}
          rowHeight={rowHeight}
          visibleRows={10}
        />
      );
    };

    expect(func).not.toThrow(TypeError);
  });

  test("rowHeight", () => {
    const func = () => {
      const container = shallow(
        <DataTable
          config={{}}
          columns={columns}
          rows={generateRows(0)}
          visibleRows={10}
        />
      );
    };

    expect(func).toThrowError(
      /Invalid prop `rowHeight` supplied to `DataTable`/
    );
  });

  test("visibleRows", () => {
    const func = () => {
      const container = shallow(
        <DataTable
          config={{}}
          columns={columns}
          rows={generateRows(0)}
          rowHeight={rowHeight}
        />
      );
    };

    expect(func).toThrowError(
      /Invalid prop `visibleRows` supplied to `DataTable`/
    );
  });

  test("rows", () => {
    const func = () => {
      const container = shallow(
        <DataTable
          config={{}}
          columns={columns}
          visibleRows={10}
          rowHeight={rowHeight}
        />
      );
    };

    expect(func).toThrowError(
      /The prop `rows` is marked as required in `DataTable`/
    );
  });

  test("columns", () => {
    const func = () => {
      const container = shallow(
        <DataTable config={{}} visibleRows={10} rowHeight={rowHeight} />
      );
    };

    expect(func).toThrowError(
      /The prop `columns` is marked as required in `DataTable`/
    );
  });

  describe("config", () => {
    test("overall", () => {
      const func = () => {
        const container = shallow(
          <DataTable
            columns={columns}
            rows={generateRows(0)}
            visibleRows={10}
            rowHeight={rowHeight}
          />
        );
      };

      expect(func).toThrowError(
        /The prop `config` is marked as required in `DataTable`/
      );
    });

    test("stickyHeader", () => {
      const container = mount(
        <DataTable
          config={{ stickyHeader: true }}
          columns={columns}
          rows={generateRows(0)}
          visibleRows={10}
          rowHeight={rowHeight}
        />
      );

      const tableHeadWrapper = container.find(".table-head-sticky");
      expect(tableHeadWrapper.exists()).toBeTruthy();
    });

    test("className", () => {
      const container = mount(
        <DataTable
          className={"dummy-class"}
          config={{}}
          columns={columns}
          rows={generateRows(0)}
          visibleRows={10}
          rowHeight={rowHeight}
        />
      );

      const dummyClass = container.find(".dummy-class");
      expect(dummyClass.exists()).toBeTruthy();
    });
  });

  describe("onSearch", () => {
    test("global", async () => {
      const rows = generateRows(0);
      const mockCallBack = jest.fn();
      const container = mount(
        <DataTable
          config={{}}
          columns={columns}
          rows={rows}
          visibleRows={50}
          rowHeight={rowHeight}
          onSearch={mockCallBack}
        />
      );

      const searchInput = container.find(".data-table-search input");
      const mockedEvent = { target: { value: "search-term" } };
      expect(searchInput.exists()).toBeTruthy();
      searchInput.simulate("change", mockedEvent);
      await new Promise(resolve =>
        setTimeout(() => {
          expect(mockCallBack).toHaveBeenCalledTimes(1);
          resolve();
        }, 1000)
      );
    });

    test("invalid type", async () => {
      const rows = generateRows(0);
      const func = () => {
        const container = shallow(
          <DataTable
            config={{}}
            columns={columns}
            rows={rows}
            visibleRows={50}
            rowHeight={rowHeight}
            onSearch={"wrong-value"}
          />
        );
      };

      expect(func).toThrowError(/Invalid prop `onSearch`/);
    });

    test("missing func does not render", async () => {
      const rows = generateRows(0);
      const container = mount(
        <DataTable
          config={{}}
          columns={columns}
          rows={rows}
          visibleRows={50}
          rowHeight={rowHeight}
        />
      );

      const searchInput = container.find(".data-table-search input");
      expect(searchInput.exists()).toBe(false);
    });
  });

  describe("onSelectionChange", () => {
    test("global", () => {
      const rows = generateRows(0);
      const mockCallBack = jest.fn(x => x);
      const container = mount(
        <DataTable
          config={{}}
          columns={columns}
          rows={rows}
          visibleRows={50}
          rowHeight={rowHeight}
          onSelectionChange={mockCallBack}
        />
      );

      const checkbox = container.find(
        ".table-head .table-head-column .checkbox"
      );
      const mockedEvent = { target: { checked: true } };
      checkbox.simulate("change", mockedEvent);
      expect(mockCallBack).toHaveBeenCalledTimes(1);
      expect(mockCallBack.mock.results[0].value.length).toBe(rows.length);
    });
    test("single", () => {
      const rows = generateRows(0);
      const mockCallBack = jest.fn(x => x);
      const container = mount(
        <DataTable
          config={{}}
          columns={columns}
          rows={rows}
          visibleRows={50}
          rowHeight={rowHeight}
          onSelectionChange={mockCallBack}
        />
      );

      const checkbox = container.find(".table-row .checkbox");
      const mockedEvent = { target: { checked: true } };
      checkbox.at(0).simulate("change", mockedEvent);
      expect(mockCallBack).toHaveBeenCalledTimes(1);
      expect(mockCallBack.mock.results[0].value[0]).toBe(rows[0].id);
    });
  });

  test("onRowClick", () => {
    const rows = generateRows(0);
    const mockCallBack = jest.fn(x => x);
    const container = mount(
      <DataTable
        config={{}}
        columns={columns}
        rows={rows}
        visibleRows={50}
        rowHeight={rowHeight}
        onRowClick={mockCallBack}
      />
    );

    const row = container.find(".table-row");
    row.at(0).simulate("click");
    expect(mockCallBack).toHaveBeenCalledTimes(1);
    expect(mockCallBack.mock.results[0].value).toBe(rows[0]);
  });

  test("onLoadMore", async () => {
    const rows = generateRows(0);
    const mockCallBack = jest.fn();
    const container = mount(
      <DataTable
        config={{}}
        columns={columns}
        rows={rows}
        visibleRows={50}
        rowHeight={rowHeight}
        onLoadMore={pageNumber => {
          mockCallBack();
          return loadRows(pageNumber);
        }}
      />
    );

    expect(mockCallBack).toHaveBeenCalledTimes(0);
    const table = container.find("table").at(0);
    table.getDOMNode().dispatchEvent(new Event("scroll"));

    await new Promise(resolve =>
      setTimeout(() => {
        expect(mockCallBack).toHaveBeenCalledTimes(1);
        expect(container.find(TableRow).length).toBe(50);
        resolve();
      }, 1000)
    );
  });
});
