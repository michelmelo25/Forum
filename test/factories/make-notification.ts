import { UniqueEntityID } from "@/core/entities/unique-entity-id";

import { pt_BR, Faker } from "@faker-js/faker";
import {
  Notification,
  NotificationProps,
} from "@/domain/notification/enterprise/entities/notification";

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityID,
) {
  const fake = new Faker({ locale: [pt_BR] });

  const notification = Notification.create(
    {
      recipientId: new UniqueEntityID(),
      title: fake.lorem.sentence(4),
      content: fake.lorem.sentence(10),
      ...override,
    },
    id,
  );

  return notification;
}
