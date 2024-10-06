import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/model/user.model";
import { Stadium } from "../../stadium/model/stadium.model";

interface ICommentCreationAttr {
  user_id: number;
  stadium_id: number;
  content: string;
}

@Table({ tableName: "comment", timestamps: true })
export class Comment extends Model<Comment, ICommentCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  user_id: number;

  @ForeignKey(() => Stadium)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  stadium_id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Stadium)
  stadium: Stadium;
}
