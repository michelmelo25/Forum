import { Answer } from "../entities/answer";

/**
 * @typedef {object} Answer
 * @property {string} id - O identificador único da resposta.
 * @property {string} content - O conteúdo do texto da resposta.
 * @property {string} questionId - identificador único da pergunta.
 */

export interface AnswerRepository {
  /**
   * Cria e salva uma nova resposta no banco de dados.
   * @param {Answer} answer - O objeto da resposta a ser criada.
   * @returns {Promise<void>} Uma promessa que se resolve quando a operação termina.
   */
  creste(answer: Answer): Promise<void>;
}
