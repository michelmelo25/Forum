import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { pt_BR, Faker } from "@faker-js/faker";
import {
  QuestionComment,
  type QuestionCommentProps,
} from "@/domain/forum/enterprise/entities/question-comment";

export function makeQuestionComment(
  override: Partial<QuestionCommentProps> = {},
  id?: UniqueEntityID,
) {
  const fake = new Faker({ locale: [pt_BR] });

  const questionComment = QuestionComment.create(
    {
      authorId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      content: fake.lorem.text(),
      ...override,
    },
    id,
  );

  return questionComment;
}
