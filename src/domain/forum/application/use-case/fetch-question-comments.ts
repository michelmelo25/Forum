import { QuestionComment } from "../../enterprise/entities/question-comment";
import type { QuestionCommentsRepository } from "../repositories/question-comments-repository";

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string;
  page: number;
}

interface FetchQuestionCommentsUseCaseResponse {
  questionComments: QuestionComment[];
}

export class FetchQuestionCommentsUseCase {
  constructor(private questioncommentRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questioncommentRepository.findManyByQuestionId(questionId, {
        page,
      });

    return {
      questionComments,
    };
  }
}
