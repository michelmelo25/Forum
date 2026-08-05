import type { Slug } from "./value-objects/slug";
import { Entity } from "../../core/entities/entity";
import type { UniqueEntityID } from "../../core/entities/unique-entity-id";
import type { Optional } from "../../core/types/optional";

interface QuestionProps {
  authorId: UniqueEntityID;
  bestAnswerId: UniqueEntityID;
  title: string;
  slug: Slug;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
  /**
   * Cria uma pesguna
   *
   * @param props
   * @param id
   * @returns question
   *
   * @example
   * ```typescript
   * Question.create(
   * {authorId: UniqueEntityID,
  bestAnswerId: UniqueEntityID,
  title: string,
  slug: Slug,
  content: string,
  createdAt?: Date,
  updatedAt?: Date
  }, id?: UniqueEntityID,)
   * ```
   */
  static create(
    props: Optional<QuestionProps, "createdAt">,
    id?: UniqueEntityID,
  ) {
    const question = new Question(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    );

    return question;
  }
}
