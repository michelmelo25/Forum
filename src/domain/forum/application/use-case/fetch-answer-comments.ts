import { AnswerComment } from "../../enterprise/entities/answer-comment";
import type { AnswerCommentsRepository } from "../repositories/answer-comments-repository";

interface FetchAnswerCommentsUseCaseRequest {
  answerId: string;
  page: number;
}

interface FetchAnswerCommentsUseCaseResponse {
  answerComments: AnswerComment[];
}

export class FetchAnswerCommentsUseCase {
  constructor(private answercommentRepository: AnswerCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments =
      await this.answercommentRepository.findManyByAnswerId(answerId, {
        page,
      });

    return {
      answerComments,
    };
  }
}
