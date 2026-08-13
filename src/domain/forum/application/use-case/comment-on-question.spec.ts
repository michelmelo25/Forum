import { InMemoryQuestioncommentsRepository } from "@test/repositories/in-memory-question-comments-repository";

import { InMemoryQuestionsRepository } from "@test/repositories/in-memory-questions-repository";
import { CommentOnQuestionUseCase } from "./comment-on-question";
import { makeQuestion } from "@test/factories/make-question";

let inMemoryQuestionRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestioncommentsRepository;
let sut: CommentOnQuestionUseCase;

describe("Comment on Question", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionsRepository();
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestioncommentsRepository();
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionCommentsRepository,
    );
  });

  it("should be able to comment on question", async () => {
    const question = makeQuestion();
    inMemoryQuestionRepository.create(question);

    await sut.execute({
      authorId: question.authorId.toString(),
      questionId: question.id.toString(),
      content: "Comentario teste",
    });

    expect(inMemoryQuestionCommentsRepository.items[0]?.content).toEqual(
      "Comentario teste",
    );
  });
});
