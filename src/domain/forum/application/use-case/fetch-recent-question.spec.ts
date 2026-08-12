import { InMemoryQuestionsRepository } from "@test/repositories/in-memory-questions-repository";
import { makeQuestion } from "@test/factories/make-question";
import { FetchRecentQuestion } from "./fetch-recent-question";

let inMemoryQuestionRepository: InMemoryQuestionsRepository;
let sut: FetchRecentQuestion;

describe("Fetch Recent Questions", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionsRepository();
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

    const { questions } = await sut.execute({
      page: 1,
    });

    expect(questions).toEqual([
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

    const { questions } = await sut.execute({
      page: 2,
    });

    expect(questions).toHaveLength(5);
  });
});
