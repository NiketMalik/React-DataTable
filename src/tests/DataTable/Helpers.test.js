import {
  GreaterThanZeroPropValidator,
  TableRowPropValidator,
} from "components/DataTable/helpers";

describe("Helpers", () => {
  describe("TableRowPropValidator", () => {
    test("success", () => {
      const func = () => {
        const mock = TableRowPropValidator(
          { row: { id: "id_1" } },
          "row",
          "DummyComponent"
        );
      };

      expect(func).not.toThrow(TypeError);
    });

    describe("id", () => {
      test("missing", () => {
        const func = () => {
          const mock = TableRowPropValidator(
            { row: {} },
            "row",
            "DummyComponent"
          );
        };

        expect(func).toThrowError(TypeError);
      });
      test("invalid", () => {
        const func = () => {
          const mock = TableRowPropValidator(
            { row: { id: 1 } },
            "row",
            "DummyComponent"
          );
        };

        expect(func).toThrowError(TypeError);
      });
    });

    test("selected", () => {
      const func = () => {
        const mock = TableRowPropValidator(
          { row: { id: "id_1", selected: "wrong-value" } },
          "row",
          "DummyComponent"
        );
      };

      expect(func).toThrowError(TypeError);
    });

    test("invalid column", () => {
      const func = () => {
        const mock = TableRowPropValidator(
          { row: { id: "id_1", column: {} } },
          "row",
          "DummyComponent"
        );
      };

      expect(func).toThrowError(TypeError);
    });
  });
  describe("GreaterThanZeroPropValidator", () => {
    test("success", () => {
      const func = () => {
        const mock = GreaterThanZeroPropValidator(
          { key: "1" },
          "key",
          "DummyComponent"
        );
      };

      expect(func).not.toThrow(TypeError);
    });

    test("missing key", () => {
      const func = () => {
        const mock = GreaterThanZeroPropValidator({}, "key", "DummyComponent");
      };

      expect(func).toThrowError(
        /Invalid prop `key` supplied to `DummyComponent`/
      );
    });

    test("invalid key", () => {
      const func = () => {
        const mock = GreaterThanZeroPropValidator(
          { key: "dummy-value" },
          "key",
          "DummyComponent"
        );
      };

      expect(func).toThrowError(
        /Invalid prop `key` supplied to `DummyComponent`/
      );
    });

    test("key value zero", () => {
      const func = () => {
        const mock = GreaterThanZeroPropValidator(
          { key: 0 },
          "key",
          "DummyComponent"
        );
      };

      expect(func).toThrowError(
        /Invalid prop `key` supplied to `DummyComponent`/
      );
    });
  });
});
