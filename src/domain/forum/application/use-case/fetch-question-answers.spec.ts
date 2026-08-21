import { InMemoryAnswersRepository } from "@test/repositories/in-memory-answers-repository";
import { FetchQuestionAnswers } from "./fetch-question-answers";
import { makeAnswer } from "@test/factories/make-answer";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { InMemoryAnswerAttachmentsRepository } from "@test/repositories/in-memory-answer-attachments-repository";

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let sut: FetchQuestionAnswers;

describe("Fetch Questions Answers", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswerRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    );
    sut = new FetchQuestionAnswers(inMemoryAnswerRepository);
  });

  it("should be able to fetch question answers", async () => {
    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: new UniqueEntityID("question-1") }),
    );
    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: new UniqueEntityID("question-1") }),
    );
    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: new UniqueEntityID("question-1") }),
    );

    const result = await sut.execute({
      questionId: "question-1",
      page: 1,
    });

    expect(result.value?.answers).toHaveLength(3);
  });

  it("should be able to fetch paginated question answers", async () => {
    for (let i = 1; i <= 25; i++) {
      await inMemoryAnswerRepository.create(
        makeAnswer({ questionId: new UniqueEntityID("question-1") }),
      );
    }

    const result = await sut.execute({
      questionId: "question-1",
      page: 2,
    });

    expect(result.value?.answers).toHaveLength(5);
  });
});
