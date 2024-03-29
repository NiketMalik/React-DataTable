import React from "react";

/**
 * TableRows data validator
 * @param {!Object<?any>} propValue
 * @param {string} propName
 * @param {string} componentName
 */
function TableRowPropValidator(propValue, propName, componentName) {
  if (propValue[propName] instanceof Object === false) {
    throw new TypeError(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`
    );
  }

  const propKeys = Object.keys(propValue[propName]);
  if (!propKeys.includes("id")) {
    throw new TypeError(
      `Missing prop \`${propName}[id]\` supplied to \`${componentName}\`. Validation failed.`
    );
  }

  propKeys.forEach(key => {
    if (key === "id" && typeof propValue[propName][key] !== "string") {
      throw new TypeError(
        `Invalid prop \`${propName}[${key}]\` supplied to \`${componentName}\`. Validation failed.`
      );
    } else if (
      key === "selected" &&
      typeof propValue[propName][key] !== "boolean"
    ) {
      throw new TypeError(
        `Invalid prop \`${propName}[${key}]\` supplied to \`${componentName}\`. Validation failed.`
      );
    } else if (
      !(
        typeof propValue[propName][key] === "string" ||
        !isNaN(Number(propValue[propName][key])) ||
        React.isValidElement(propValue[propName][key])
      )
    ) {
      throw new TypeError(
        `Invalid prop \`${propName}[${key}]\` supplied to \`${componentName}\`. Validation failed.`
      );
    }
  });
}

/**
 * Ensures that the prop is a a natural number.
 * @param {!Object<?any>} props
 * @param {string} propName
 * @param {string} componentName
 */
function GreaterThanZeroPropValidator(props, propName, componentName) {
  if (
    Number(props[propName]) !== props[propName] ||
    props[propName] % 1 !== 0 ||
    props[propName] === 0
  ) {
    throw new Error(
      "Invalid prop `" +
        propName +
        "` supplied to" +
        " `" +
        componentName +
        "`. Validation failed."
    );
  }
}

/**
 * Debounce event
 * @param {Function} func
 * @param {number} timeFrame
 * @returns {Function}
 */
function debounce(func, timeFrame) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      func.apply(context, args);
    }, timeFrame);
  };
}

export { GreaterThanZeroPropValidator, TableRowPropValidator, debounce };
