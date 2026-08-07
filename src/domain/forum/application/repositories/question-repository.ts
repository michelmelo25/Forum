import type { Question } from "../../enterprise/entities/question";

export interface QuestionsRepository {
  /**
   * Cria e salva uma nova resposta no banco de dados.
   * @param {Question} question - O objeto da resposta a ser criada.
   * @returns {Promise<void>} Uma promessa que se resolve quando a operação termina.
   */
  create(question: Question): Promise<void>;
  /**
   * Busca um pergunto com base em sua Slug
   * @param {String} slug - Slug de uma pergunta
   * @returns {Promise<Question>} Uma promessa que se resolve quando a operação termina.
   */
  findBySlug(slug: string): Promise<Question | null>;
}
