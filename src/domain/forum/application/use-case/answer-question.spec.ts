import { InMemoryAnswersRepository } from "@test/repositories/in-memory-answers-repository";
import { AnswerQuestionUseCase } from "./answer-question";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe("Create Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it("should be able to create an answer", async () => {
    const { answer } = await sut.execute({
      intructorId: "1",
      questionId: "1",
      content: "Conteudo da Resposta",
    });

    expect(answer.id).toBeTruthy();
    expect(answer.content).toEqual("Conteudo da Resposta");
    expect(inMemoryAnswersRepository.items[0]?.id).toEqual(answer.id);
  });
});
