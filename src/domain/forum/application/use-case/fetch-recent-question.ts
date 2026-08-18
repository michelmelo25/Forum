import { right, type Either } from "@/core/either";
import { Question } from "../../enterprise/entities/question";
import type { QuestionsRepository } from "../repositories/question-repository";

interface FetchRecentQuestionRequest {
  page: number;
}

type FetchRecentQuestionResponse = Either<
  null,
  {
    questions: Question[];
  }
>;

export class FetchRecentQuestion {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionRequest): Promise<FetchRecentQuestionResponse> {
    const questions = await this.questionRepository.findManyRecent({ page });

    return right({
      questions,
    });
  }
}
