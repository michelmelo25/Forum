import { InMemoryQuestionsRepository } from "@test/repositories/in-memory-questions-repository";
import { GetQuestionBySlug } from "./get-question-by-slug";
import { makeQuestion } from "@test/factories/make-question";
import { Slug } from "../../enterprise/entities/value-objects/slug";

let inMemoryQuestionRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlug;

describe("Get Question By Slug", () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlug(inMemoryQuestionRepository);
  });

  it("should be able to get a question by slug", async () => {
    const newQuestion = makeQuestion({ slug: Slug.create("example-question") });

    await inMemoryQuestionRepository.create(newQuestion);

    const result = await sut.execute({
      slug: "example-question",
    });

    expect(result.isRight()).toBe(true);
    if (result.isRight())
      expect(result.value.question.title).toEqual(newQuestion.title);
  });
});
