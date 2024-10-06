import { Injectable } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Comment } from "./model/comment.model";

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment) private commentModel: typeof Comment) {}

  async create(createCommentDto: CreateCommentDto) {
    const new_comment = await this.commentModel.create(createCommentDto);
    return new_comment;
  }

  findAll() {
    return this.commentModel.findAll();
  }

  findOne(id: number) {
    return this.commentModel.findByPk(id);
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const updated_comment = await this.commentModel.update(updateCommentDto, {
      where: { id },
      returning: true,
    });
    return updated_comment[1][0];
  }

  remove(id: number) {
    return this.commentModel.destroy({ where: { id } });
  }
}
