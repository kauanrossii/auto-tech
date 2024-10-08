import ITableColumn from "./ITableColumn";

export default interface ITableRow {
    key: string;
    columns: ITableColumn[];
};
