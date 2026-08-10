import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import type { QuestionsRepository } from "../repositories/question-repository";
import type { AnswerRepository } from "../repositories/answer-repository";

interface DeleteAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const Answer = await this.answerRepository.findById(answerId);

    if (!Answer) {
      throw new Error("Answer not found.");
    }

    if (authorId !== Answer.authorId.toString()) {
      throw new Error("Not allowed.");
    }

    await this.answerRepository.delete(Answer);

    return {};
  }
}
