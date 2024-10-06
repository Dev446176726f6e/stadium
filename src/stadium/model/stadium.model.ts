import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Category } from "../../categories/model/category.model";
import { Region } from "../../region/model/region.model";
import { District } from "../../district/model/district.model";
import { WorkingTime } from "../../working_times/model/working_time.model";
import { StadiumStatus } from "../../stadium_status/model/stadium_status.model";
import { Comment } from "../../comments/model/comment.model";
import { Media } from "../../media/model/media.model";

interface IStadiumCreationAttr {
  name: string;
  category_id: number;
  owner_id: number;
  capacity: number;
  surface_type: string;
  roof_type: string;
  address: string;
  location: string[];
  // should i add country_id.
  region_id: number;
  district_id: number;
  working_time_id: number;
  built_year: number;
  contact_details: string;
  status_id: string;
}

@Table({ tableName: "stadium", timestamps: true })
export class Stadium extends Model<Stadium, IStadiumCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  category_id: number;

  // foreign key- do i need to add.
  @Column({
    type: DataType.BIGINT,
  })
  owner_id: number;

  @Column({
    type: DataType.INTEGER,
  })
  capacity: number;

  @Column({
    type: DataType.ENUM,
    values: ["natural_grass", "artificial_turf", "hybrid_grass"],
  })
  surface_type: string;

  @Column({
    type: DataType.ENUM,
    values: ["open", "closed", "retractable"],
  })
  roof_type: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  location: { lat: number; long: number };

  @ForeignKey(() => Region)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  region_id: number;

  @ForeignKey(() => District)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  district_id: number;

  @ForeignKey(() => WorkingTime)
  @Column({
    type: DataType.INTEGER,
  })
  working_time_id: number;

  @Column({
    type: DataType.INTEGER,
  })
  built_year: number;

  @Column({
    type: DataType.STRING,
    comment: "You can add number, and name if you want.",
  })
  contact_details: string;

  @ForeignKey(() => StadiumStatus)
  @Column({
    type: DataType.INTEGER,
  })
  status_id: number;

  @HasMany(() => WorkingTime)
  working_times: WorkingTime[];

  @BelongsTo(() => Category)
  category: Category;

  @BelongsTo(() => Region)
  region: Region;

  @BelongsTo(() => District)
  district: District;

  @BelongsTo(() => StadiumStatus)
  status: StadiumStatus;

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => Media)
  media: Media[];
}
