import type { Answer } from "../../enterprise/entities/answer";
import type { AnswerRepository } from "../repositories/answer-repository";

interface FetchQuestionAnswersRequest {
  questionId: string;
  page: number;
}

interface FetchQuestionAnswersResponse {
  answers: Answer[];
}

export class FetchQuestionAnswers {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionAnswersRequest): Promise<FetchQuestionAnswersResponse> {
    const answers = await this.answerRepository.findManyByQuestionId(
      questionId,
      { page },
    );

    return {
      answers,
    };
  }
}
