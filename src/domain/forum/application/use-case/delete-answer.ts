import { left, right, type Either } from "@/core/either";
import type { AnswerRepository } from "../repositories/answer-repository";
import { ResourceNotFouldError } from "./errors/resource-not-fould-error";
import { NotAllowedError } from "./errors/not-allowed-error";

interface DeleteAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

type DeleteAnswerUseCaseResponse = Either<
  ResourceNotFouldError | NotAllowedError,
  {}
>;

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const Answer = await this.answerRepository.findById(answerId);

    if (!Answer) {
      return left(new ResourceNotFouldError());
    }

    if (authorId !== Answer.authorId.toString()) {
      return left(new NotAllowedError());
    }

    await this.answerRepository.delete(Answer);

    return right({});
  }
}
