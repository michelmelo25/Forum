import { InMemoryQuestionsRepository } from "@test/repositories/in-memory-questions-repository";
import { makeQuestion } from "@test/factories/make-question";
import { FetchRecentQuestion } from "./fetch-recent-question";
import { InMemoryQuestionAttachmentsRepository } from "@test/repositories/in-memory-question-attachments-repository";

let inMemoryQuestionRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: FetchRecentQuestion;

describe("Fetch Recent Questions", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    );
    sut = new FetchRecentQuestion(inMemoryQuestionRepository);
  });

  it("should be able to fetch recent questions", async () => {
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2026, 4, 20) }),
    );
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2026, 4, 19) }),
    );
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2026, 4, 25) }),
    );

    const result = await sut.execute({
      page: 1,
    });

    expect(result.value?.questions).toEqual([
      expect.objectContaining({
        props: expect.objectContaining({
          createdAt: new Date(2026, 4, 25),
        }),
      }),
      expect.objectContaining({
        props: expect.objectContaining({
          createdAt: new Date(2026, 4, 20),
        }),
      }),
      expect.objectContaining({
        props: expect.objectContaining({
          createdAt: new Date(2026, 4, 19),
        }),
      }),
    ]);
  });

  it("should be able to fetch paginated recent questions", async () => {
    for (let i = 1; i <= 25; i++) {
      await inMemoryQuestionRepository.create(makeQuestion());
    }

    const result = await sut.execute({
      page: 2,
    });

    expect(result.value?.questions).toHaveLength(5);
  });
});
