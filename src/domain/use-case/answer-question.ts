import { Answer } from "../entities/answer";
import type { AnswerRepository } from "../repositories/answer-repository";

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
    const answer = new Answer({ content, authorId: intructorId, questionId });

    await this.answersRepository.creste(answer);

    return answer;
  }
}
