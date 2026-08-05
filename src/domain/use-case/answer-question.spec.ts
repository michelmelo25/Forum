import { expect, test } from "vitest";
import { AnswerQuestionUseCase } from "./answer-question";
import type { AnswerRepository } from "../repositories/answer-repository";
import type { Answer } from "../entities/answer";

const fakeAnswerRepository: AnswerRepository = {
  creste: async (answer: Answer) => {
    return;
  },
};

test("create an answer", async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository);

  const answer = await answerQuestion.execute({
    intructorId: "1",
    questionId: "1",
    content: "Nova Resposta",
  });

  expect(answer.content).toEqual("Nova Resposta");
});
