import { InMemoryAnswersRepository } from "@test/repositories/in-memory-answers-repository";
import { CommentOnAnswerUseCase } from "./comment-on-answer";
import { makeAnswer } from "@test/factories/make-answer";
import { InMemoryAnswercommentsRepository } from "@test/repositories/in-memory-answer-comments-repository";

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let inMemoryAnswercommentsRepository: InMemoryAnswercommentsRepository;
let sut: CommentOnAnswerUseCase;

describe("Comment on Answer", () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository();
    inMemoryAnswercommentsRepository = new InMemoryAnswercommentsRepository();
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswercommentsRepository,
    );
  });

  it("should be able to comment on answer", async () => {
    const answer = makeAnswer();
    inMemoryAnswerRepository.create(answer);

    await sut.execute({
      authorId: answer.authorId.toString(),
      answerId: answer.id.toString(),
      content: "Comentario teste",
    });

    expect(inMemoryAnswercommentsRepository.items[0]?.content).toEqual(
      "Comentario teste",
    );
  });
});
