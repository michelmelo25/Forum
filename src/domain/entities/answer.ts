import { randomUUID } from "node:crypto";

interface AnswerProps {
  content: string;
  authorId: string;
  questionId: string;
}

/**
 * Propriedades necessárias para criar uma resposta.
 * @typedef {object} AnswerProps
 * @property {string} content - O conteúdo em texto da resposta.
 * @property {string} authorId - O ID do autor da resposta.
 * @property {string} questionId - O ID da pergunta associada.
 */

export class Answer {
  public id: string;
  public content: string;
  public authorId: string;
  public questionId: string;

  /**
   * Cria uma instância de uma resposta.
   * @param {AnswerProps} props - As propriedades de conteúdo e relacionamentos.
   * @param {string} [id] - ID opcional. Se omitido, um UUID será gerado automaticamente.
   */
  constructor(props: AnswerProps, id?: string) {
    this.content = props.content;
    this.authorId = props.authorId;
    this.questionId = props.questionId;
    this.id = id ?? randomUUID();
  }
}
