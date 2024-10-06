import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Stadium } from "../../stadium/model/stadium.model";

interface IStadiumStatusCreationAttr {
  name: string;
  description: string;
}

@Table({ tableName: "stadium_status", timestamps: true })
export class StadiumStatus extends Model<
  StadiumStatus,
  IStadiumStatusCreationAttr
> {
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

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @HasMany(() => Stadium)
  stadiums: Stadium[];
}
