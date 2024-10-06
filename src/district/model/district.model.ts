import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Region } from "../../region/model/region.model";
import { Stadium } from "../../stadium/model/stadium.model";

interface IDistrictCreationAttr {
  name: string;
  region_id: number;
}

@Table({ tableName: "district", timestamps: false })
export class District extends Model<District, IDistrictCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  region_id: number;

  @BelongsTo(() => Region)
  region: Region;

  @HasMany(() => Stadium)
  stadiums: Stadium[];
}
