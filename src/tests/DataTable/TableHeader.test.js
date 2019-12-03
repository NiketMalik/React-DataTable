import React from "react";
import ReactDOM from "react-dom";
import TableHead from "components/DataTable/TableHead";
import renderer from "react-test-renderer";
import { act } from "react-dom/test-utils";

let container;
beforeEach(() => {
    container = document.createElement("tbody");
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

const defaultColumns = [
    {
        id: "column_1",
        label: "Column 1",
        numeric: false,
        width: "50%",
    },
    {
        id: "column_2",
        label: "Column 2",
        numeric: false,
        width: "50%",
    },
];

const numericColumns = defaultColumns.map(column => ({
    ...column,
    numeric: true,
}));
const tableHeadProps = {
    columns: defaultColumns,
    isSelectAll: false,
    isSticky: false,
};

describe("TableHead", () => {
    test("Renders without crashing", () => {
        const component = renderer.create(<TableHead {...tableHeadProps} />);

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("isSticky", () => {
        document.body.removeChild(container);
        container = null;
        container = document.createElement("div");
        document.body.appendChild(container);

        act(() => {
            ReactDOM.render(
                <TableHead {...tableHeadProps} isSticky={true} />,
                container
            );
        });

        const tableHeadWrapper = container.querySelector(".table-head-sticky");
        expect(tableHeadWrapper).not.toBeNull();
    });

    test("numeric column", () => {
        act(() => {
            ReactDOM.render(
                <TableHead
                    {...{ ...tableHeadProps, columns: numericColumns }}
                />,
                container
            );
        });

        const TableHeadColumn = container.querySelector(
            ".table-head-column_is-numeric"
        );
        const TableHeadColumnsAll = container.querySelectorAll(
            ".table-head-column_is-numeric"
        );
        expect(TableHeadColumn).not.toBeNull();
        expect(TableHeadColumnsAll.length).toBe(2);
    });

    test("onSelectionChange", () => {
        let selectionChange = false;
        act(() => {
            ReactDOM.render(
                <TableHead
                    {...tableHeadProps}
                    onSelectionChange={checked => (selectionChange = checked)}
                />,
                container
            );
        });

        const checkbox = container.querySelector(".checkbox");
        expect(selectionChange).toBe(false);

        act(() => {
            checkbox.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        expect(selectionChange).toBe(true);
    });
});
