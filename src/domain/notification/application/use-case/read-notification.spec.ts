import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { SendNotificationUseCase } from "./send-notificarion";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notification-repository";
import { ReadNotificationUseCase } from "./read-notification";
import { makeNotification } from "@test/factories/make-notification";
import { NotAllowedError } from "@/core/errors/not-allowed-error";

let inMemoryNotificationRepository: InMemoryNotificationsRepository;
let sut: ReadNotificationUseCase;

describe("Send Notification", () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationsRepository();
    sut = new ReadNotificationUseCase(inMemoryNotificationRepository);
  });

  it("should be able to read a notification", async () => {
    const notificarion = makeNotification();

    await inMemoryNotificationRepository.create(notificarion);

    const result = await sut.execute({
      recipientId: notificarion.recipientId.toString(),
      notificationId: notificarion.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryNotificationRepository.items[0]?.readAt).toEqual(
      expect.any(Date),
    );
  });

  it("should be not able to read a notification from another user", async () => {
    const notification = makeNotification(
      {
        recipientId: new UniqueEntityID("recipient-1"),
      },
      new UniqueEntityID("notification-1"),
    );

    await inMemoryNotificationRepository.create(notification);

    const result = await sut.execute({
      recipientId: "recipient-2",
      notificationId: notification.id.toString(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
