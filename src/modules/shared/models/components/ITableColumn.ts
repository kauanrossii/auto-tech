import IBaseDisplayEnum from "./IBaseDisplayEnum";
import { ColumnType } from "../../../../data/enums/ColumnType";

export default interface ITableColumn {
    type: ColumnType;
    name: string;
    enum?: readonly IBaseDisplayEnum[]
};
