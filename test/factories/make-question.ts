import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import {
  Question,
  type QuestionProps,
} from "@/domain/forum/enterprise/entities/question";
import { pt_BR, Faker } from "@faker-js/faker";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug";

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityID,
) {
  const fake = new Faker({ locale: [pt_BR] });

  const question = Question.create(
    {
      authorId: new UniqueEntityID(),
      title: fake.lorem.sentence(),
      content: fake.lorem.text(),
      ...override,
    },
    id,
  );

  return question;
}
