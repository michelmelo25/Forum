import type { Question } from "../../enterprise/entities/question";

export interface QuestionsRepository {
  /**
   * Cria e salva uma nova resposta no banco de dados.
   * @param {Question} question - O objeto da resposta a ser criada.
   * @returns {Promise<void>} Uma promessa que se resolve quando a operação termina.
   */
  create(question: Question): Promise<void>;
}
