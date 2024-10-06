import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Stadium } from "../../stadium/model/stadium.model";

interface IMediaCreationAttr {
  stadium_id: number;
  media_type: string;
  media_url: string;
  description: string;
}

@Table({ tableName: "media", timestamps: true })
export class Media extends Model<Media, IMediaCreationAttr> {
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
    values: ["photo", "video"],
    allowNull: false,
  })
  media_type: string;

  @Column({
    type: DataType.STRING,
  })
  media_url: string;

  @Column({
    type: DataType.TEXT,
  })
  description: string;

  @BelongsTo(() => Stadium)
  stadium: Stadium;
}
