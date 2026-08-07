import { UniqueEntityID } from "@/core/entities/unique-entity-id";

import type { AnswerRepository } from "../repositories/answer-repository";
import { Answer } from "../../enterprise/entities/answer";

interface AnswerQuestionUseCaseRequest {
  intructorId: string;
  questionId: string;
  content: string;
}

interface AnswerQuestionUseCaseResponse {
  answer: Answer;
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswerRepository) {}

  async execute({
    intructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(intructorId),
      questionId: new UniqueEntityID(questionId),
    });

    await this.answersRepository.create(answer);

    return { answer };
  }
}
