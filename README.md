# React DataTable

[![code cov](https://codecov.io/gh/NiketMalik/React-DataTable/branch/master/graph/badge.svg)](https://codecov.io/gh/NiketMalik/React-DataTable)
[![CircleCI](https://circleci.com/gh/NiketMalik/React-DataTable.svg?style=shield)](https://circleci.com/gh/NiketMalik/React-DataTable)

## DataTable

| Property          | Type     | Required? | Description                                                      |
| :---------------- | :------- | :-------: | :--------------------------------------------------------------- |
| className         | String   |     ✓     | Classname for the data table root.                               |
| config            | Object   |     ✓     | DataTable configuration. [Learn more](#TableHeadConfig)          |  |
| columns           | Array    |     ✓     | Header columns. [Learn more](#HeaderColumn)                      |
| rows              | Array    |     ✓     | Rows to be rendered. [Learn more](#Row)                          |
| rowHeight         | Number   |     ✓     | Height of each row, should be a whole number greater than 0.     |
| visibleRows       | Number   |     ✓     | Number of visible rows, should be a whole number greater than 0. |
| onLoadMore        | Function |           | Callback responsible for load more action.                       |
| onRowClick        | Function |           | Callback responsible for row click action.                       |
| onSelectionChange | Function |           | Callback responsible for row check/uncheck action.               |

## TableHeadConfig

| Property | Type     | Required? | Description                         |
| :------- | :------- | :-------: | :---------------------------------- |
| isSticky | Function |           | Wether the header is sticky or not. |

## TableHead

| Property          | Type     | Required? | Description                                        |
| :---------------- | :------- | :-------: | :------------------------------------------------- |
| columns           | Array    |     ✓     | Header columns. [Learn more](#HeaderColumn)        |
| isSelectAll       | Boolean  |           | Checks the global selection.                       |
| isSticky          | Function |     ✓     | Wether the header is sticky or not.                |
| onSelectionChange | Function |           | Callback responsible for row check/uncheck action. |

#### HeaderColumn

| Property | Type    | Required? | Description                         |
| :------- | :------ | :-------: | :---------------------------------- |
| id       | String  |     ✓     | Unique column id                    |
| label    | String  |     ✓     | Content of the column.              |
| numeric  | boolean |           | Is column numeric (left aligned).   |
| width    | String  |           | Width of cach column in the header. |

## TableRow

| Property          | Type     | Required? | Description                                        |
| :---------------- | :------- | :-------: | :------------------------------------------------- |
| config            | Object   |     ✓     | Row configuration. [Learn more](#RowConfig)        |
| row               | Object   |     ✓     | Row data. [Learn more](#Row)                       |
| onClick           | Function |           | Callback responsible for row click action.         |
| onSelectionChange | Function |           | Callback responsible for row check/uncheck action. |

#### Row

| Property               | Type                  | Required? | Description                  |
| :--------------------- | :-------------------- | :-------: | :--------------------------- |
| id                     | String                |     ✓     | Unique row id                |
| selected               | Bool                  |           | To check or uncheck the row. |
| {column_data_property} | String\|React.Element |           | Column data to be populated. |

#### RowConfig

| Property      | Type           | Required? | Description                              |
| :------------ | :------------- | :-------: | :--------------------------------------- |
| keys          | Array<String>  |     ✓     | Column ids in sorted order.              |
| width         | Array<String>  |     ✓     | Width of each column in the row.         |
| numeric       | Array<boolean> |     ✓     | Is column numeric (left aligned).        |
| rowHeight     | Number         |     ✓     | Height of the row to be computed in px . |
| rowStartIndex | Number         |     ✓     | Top positioning offset.                  |
