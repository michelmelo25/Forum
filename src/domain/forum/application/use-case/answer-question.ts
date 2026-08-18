import { UniqueEntityID } from "@/core/entities/unique-entity-id";

import type { AnswerRepository } from "../repositories/answer-repository";
import { Answer } from "../../enterprise/entities/answer";
import { right, type Either } from "@/core/either";

interface AnswerQuestionUseCaseRequest {
  intructorId: string;
  questionId: string;
  content: string;
}

type AnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer;
  }
>;

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

    return right({ answer });
  }
}
