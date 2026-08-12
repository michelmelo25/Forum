import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { Question } from "../../enterprise/entities/question";

export interface QuestionsRepository {
  /**
   * Busca um pergunto com base em sua Slug
   * @param {String} slug - Slug de uma pergunta
   * @returns {Promise<Question>} Uma promessa que se resolve quando a operação termina.
   */
  findBySlug(slug: string): Promise<Question | null>;

  findById(id: string): Promise<Question | null>;

  findManyRecent(params: PaginationParams): Promise<Question[]>;

  save(question: Question): Promise<void>;
  /**
   * Cria e salva uma nova resposta no banco de dados.
   * @param {Question} question - O objeto da resposta a ser criada.
   * @returns {Promise<void>} Uma promessa que se resolve quando a operação termina.
   */
  create(question: Question): Promise<void>;

  delete(question: Question): Promise<void>;
}
