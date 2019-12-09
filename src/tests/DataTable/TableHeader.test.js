import React from "react";
import ReactDOM from "react-dom";
import TableHead from "components/DataTable/TableHead";
import { shallow, mount } from "enzyme";

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
        const func = () => {
            const container = shallow(<TableHead {...tableHeadProps} />);
        };

        expect(func).not.toThrow(TypeError);
    });

    test("isSticky", () => {
        const container = mount(
            <TableHead {...tableHeadProps} isSticky={true} />
        );

        const tableHeadWrapper = container.find(".table-head-sticky");
        expect(tableHeadWrapper.exists()).toBeTruthy();
    });

    test("numeric column", () => {
        const container = shallow(
            <TableHead {...{ ...tableHeadProps, columns: numericColumns }} />
        );
        const TableHeadColumn = container.find(".table-head-column_is-numeric");
        const TableHeadColumnsAll = container.find(
            ".table-head-column_is-numeric"
        );

        expect(TableHeadColumn.exists()).toBeTruthy();
        expect(TableHeadColumnsAll.length).toBe(2);
    });

    test("onSelectionChange", () => {
        const mockCallBack = jest.fn();
        const container = shallow(
            <TableHead {...tableHeadProps} onSelectionChange={mockCallBack} />
        );

        const checkbox = container.find(".checkbox");
        const mockedEvent = { target: { checked: false } };
        checkbox.at(0).simulate("change", mockedEvent);
        expect(mockCallBack).toHaveBeenCalledTimes(1);
    });

    describe("options failure", () => {
        describe("columns", () => {
            test("overall", () => {
                const func = () => {
                    const container = shallow(
                        <TableHead isSelectAll={false} isSticky={false} />
                    );
                };

                expect(func).toThrowError(
                    /The prop `columns` is marked as required in `TableHead`/
                );
            });

            test("id", () => {
                const func = () => {
                    const container = shallow(
                        <TableHead
                            columns={[
                                {
                                    label: "Column 1",
                                },
                            ]}
                            isSelectAll={false}
                            isSticky={false}
                        />
                    );
                };

                expect(func).toThrowError(
                    /The prop `columns\[0\].id` is marked as required in `TableHead`/
                );
            });

            describe("label", () => {
                test("missing value", () => {
                    const func = () => {
                        const container = shallow(
                            <TableHead
                                columns={[
                                    {
                                        id: "column_1",
                                    },
                                ]}
                                isSelectAll={false}
                                isSticky={false}
                            />
                        );
                    };

                    expect(func).toThrowError(
                        /The prop `columns\[0\].label` is marked as required in `TableHead`/
                    );
                });

                test("accepts string", () => {
                    const func = () => {
                        const container = shallow(
                            <TableHead
                                columns={[
                                    {
                                        id: "column_1",
                                        label: <b>Column 1</b>,
                                    },
                                ]}
                                isSelectAll={false}
                                isSticky={false}
                            />
                        );
                    };

                    expect(func).not.toThrow(TypeError);
                });
            });
        });

        test("isSticky", () => {
            const func = () => {
                const container = shallow(
                    <TableHead columns={defaultColumns} isSelectAll={false} />
                );
            };

            expect(func).toThrowError(
                /The prop `isSticky` is marked as required in `TableHead`/
            );
        });
    });
});
