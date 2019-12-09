import React from "react";
import ReactDOM from "react-dom";
import TableRow from "components/DataTable/TableRow";
import { shallow } from "enzyme";

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
        const func = () => {
            const container = shallow(
                <TableRow config={rowConfig} row={row} />
            );
        };

        expect(func).not.toThrow(TypeError);
    });

    describe("options failure", () => {
        describe("row", () => {
            test("overall", () => {
                const func = () => {
                    const container = shallow(<TableRow config={rowConfig} />);
                };

                expect(func).toThrowError(
                    /Invalid prop `row` supplied to `TableRow`/
                );
            });

            test("id", () => {
                const func = () => {
                    const container = shallow(
                        <TableRow config={rowConfig} row={{}} />
                    );
                };

                expect(func).toThrowError(
                    /Missing prop `row\[id\]` supplied to `TableRow`/
                );
            });

            test("row column accepts element", () => {
                const func = () => {
                    const container = shallow(
                        <TableRow
                            config={rowConfig}
                            row={{
                                id: "row_1",
                                colum_1: <b>Loreum Ipsum</b>,
                            }}
                        />
                    );
                };

                expect(func).not.toThrow(TypeError);
            });
        });

        describe("config", () => {
            test("overall", () => {
                const func = () => {
                    const container = shallow(<TableRow row={row} />);
                };

                expect(func).toThrowError(
                    /The prop `config` is marked as required in `TableRow`/
                );
            });

            test("keys", () => {
                const func = () => {
                    const container = shallow(
                        <TableRow
                            row={row}
                            config={{
                                numeric: [false, false],
                                rowHeight: 50,
                                width: ["50%", "50%"],
                                rowStartIndex: 0,
                            }}
                        />
                    );
                };

                expect(func).toThrowError(
                    /The prop `config.keys` is marked as required in `TableRow`/
                );
            });
        });
    });

    test("onClick", () => {
        const mockCallBack = jest.fn();
        const container = shallow(
            <TableRow config={rowConfig} row={row} onClick={mockCallBack} />
        );

        const tr = container.find("tr");
        tr.at(0).simulate("click");
        expect(mockCallBack).toHaveBeenCalledTimes(1);
    });

    describe("checkbox", () => {
        test("onClick", () => {
            const mockCallBack = jest.fn();
            const container = shallow(
                <TableRow config={rowConfig} row={row} />
            );

            const checkbox = container.find(".checkbox");
            checkbox.at(0).simulate("click", {
                stopPropagation: mockCallBack,
            });
            expect(mockCallBack).toHaveBeenCalledTimes(1);
        });
        test("onSelectionChange", () => {
            const mockCallBack = jest.fn();
            const container = shallow(
                <TableRow
                    config={rowConfig}
                    row={row}
                    onSelectionChange={mockCallBack}
                />
            );

            const checkbox = container.find(".checkbox");
            const mockedEvent = { target: { checked: false } };
            checkbox.at(0).simulate("change", mockedEvent);
            expect(mockCallBack).toHaveBeenCalledTimes(1);
        });
    });
});
