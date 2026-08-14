import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { pt_BR, Faker } from "@faker-js/faker";
import {
  AnswerComment,
  type AnswerCommentProps,
} from "@/domain/forum/enterprise/entities/answer-comment";

export function makeAnswerComment(
  override: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityID,
) {
  const fake = new Faker({ locale: [pt_BR] });

  const answerComment = AnswerComment.create(
    {
      authorId: new UniqueEntityID(),
      answerId: new UniqueEntityID(),
      content: fake.lorem.text(),
      ...override,
    },
    id,
  );

  return answerComment;
}
