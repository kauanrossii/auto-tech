import IBaseDisplayEnum from "../enums/BaseDisplayEnum";
import { ColumnType } from "../enums/ColumnType";

export default interface ITableColumn {
    type: ColumnType;
    value: any;
    name: string;
    enum?: IBaseDisplayEnum
};
