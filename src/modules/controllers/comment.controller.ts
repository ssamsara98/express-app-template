import expressAsyncHandler from 'express-async-handler';
import { HideCommentDto, UpdateCommentDto } from '~/modules/dto/comment.dto';
import { CommentService, commentService } from '~/modules/services/comment.service';

type CommentControllerId = {
  commentId: string;
};

export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  updateComment = expressAsyncHandler<CommentControllerId, any, UpdateCommentDto>(
    async (req, res) => {
      await this.commentService.updateComment(
        req.user?.id!,
        parseInt(req.params.commentId),
        req.body,
      );
      res.status(204).json();
    },
  );

  hideComment = expressAsyncHandler<CommentControllerId, any, HideCommentDto>(async (req, res) => {
    await this.commentService.hideComment(req.user?.id!, parseInt(req.params.commentId), req.body);
    res.status(204).json();
  });

  deleteComment = expressAsyncHandler<CommentControllerId>(async (req, res) => {
    await this.commentService.deleteComment(req.user?.id!, parseInt(req.params.commentId));
    res.status(204).json();
  });
}

export const commentController = new CommentController(commentService);
