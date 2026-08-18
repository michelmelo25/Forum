import { left, right, type Either } from "@/core/either";
import { Question } from "../../enterprise/entities/question";
import type { QuestionsRepository } from "../repositories/question-repository";
import { ResourceNotFouldError } from "./errors/resource-not-fould-error";

interface GetQuestionBySlugRequest {
  slug: string;
}

type GetQuestionBySlugResponse = Either<
  ResourceNotFouldError,
  {
    question: Question;
  }
>;

export class GetQuestionBySlug {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugRequest): Promise<GetQuestionBySlugResponse> {
    const question = await this.questionRepository.findBySlug(slug);

    if (!question) {
      return left(new ResourceNotFouldError());
    }
    return right({
      question,
    });
  }
}
