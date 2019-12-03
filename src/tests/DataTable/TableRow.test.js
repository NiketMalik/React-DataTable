import React from "react";
import ReactDOM from "react-dom";
import TableRow from "components/DataTable/TableRow";
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

const rowConfig = {
    keys: ["column_1", "column_2"],
    numeric: [false, false],
    rowHeight: 50,
    width: ["50%", "50%"],
    rowStartIndex: 0,
};

const row = {
    id: `id_1`,
    colum_1: "Loreum Ipsum",
    colum_2: "Loreum Ipsum",
};

describe("TableRow", () => {
    test("Renders without crashing", () => {
        const component = renderer.create(
            <TableRow config={rowConfig} row={row} />
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test("onClick", () => {
        let clicked = false;
        act(() => {
            ReactDOM.render(
                <TableRow
                    config={rowConfig}
                    row={row}
                    onClick={_ => (clicked = !clicked)}
                />,
                container
            );
        });

        const tr = container.querySelector("tr");
        expect(clicked).toBe(false);

        act(() => {
            tr.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        expect(clicked).toBe(true);
    });

    test("onSelectionChange", () => {
        let selectionChange = false;
        act(() => {
            ReactDOM.render(
                <TableRow
                    config={rowConfig}
                    row={row}
                    onSelectionChange={checked => (selectionChange = checked)}
                />,
                container
            );
        });

        const checkbox = container.querySelector("tr .checkbox");
        expect(selectionChange).toBe(false);

        act(() => {
            checkbox.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        expect(selectionChange).toBe(true);
    });
});
