import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Stadium } from "../../stadium/model/stadium.model";

interface IWorkingTimeCreationAttr {
  stadium_id: number;
  day_of_week: string;
  opening_time: string;
  closing_time: string;
  price_per_hour: number; // i don't know whether it's normal to add price here. but okay.
}

@Table({ tableName: "working_time", timestamps: true })
export class WorkingTime extends Model<WorkingTime, IWorkingTimeCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Stadium)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stadium_id: number;

  @Column({
    type: DataType.ENUM,
    values: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    allowNull: false,
  })
  day_of_week: string;

  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  opening_time: string;

  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  closing_time: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price_per_hour: number;

  @BelongsTo(() => Stadium)
  stadium: Stadium;
}
