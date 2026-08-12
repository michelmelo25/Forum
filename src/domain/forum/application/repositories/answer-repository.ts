import type { PaginationParams } from "@/core/repositories/pagination-params";
import { Answer } from "../../enterprise/entities/answer";

export interface AnswerRepository {
  findById(id: string): Promise<Answer | null>;
  /**
   * Cria e salva uma nova resposta no banco de dados.
   * @param {Answer} answer - O objeto da resposta a ser criada.
   * @returns {Promise<void>} Uma promessa que se resolve quando a operação termina.
   */
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]>;
  create(answer: Answer): Promise<void>;
  save(answer: Answer): Promise<void>;
  delete(answer: Answer): Promise<void>;
}
