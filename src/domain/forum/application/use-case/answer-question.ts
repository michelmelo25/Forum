import { UniqueEntityID } from "@/core/entities/unique-entity-id";

import type { AnswerRepository } from "../repositories/answer-repository";
import { Answer } from "../../enterprise/entities/answer";

interface AnswerQuestionUseCaseRequest {
  intructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswerRepository) {}

  async execute({
    intructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(intructorId),
      questionId: new UniqueEntityID(questionId),
    });

    await this.answersRepository.create(answer);

    return answer;
  }
}
