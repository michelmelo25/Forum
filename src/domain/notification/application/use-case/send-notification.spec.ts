import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { SendNotificationUseCase } from "./send-notificarion";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notification-repository";

let inMemoryNotificationRepository: InMemoryNotificationsRepository;
let sut: SendNotificationUseCase;

describe("Send Notification", () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationsRepository();
    sut = new SendNotificationUseCase(inMemoryNotificationRepository);
  });

  it("should be able to send a notification", async () => {
    const result = await sut.execute({
      recipientId: "1",
      title: "Nova Notificacao",
      content: "Conteudo da Notificacao",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryNotificationRepository.items[0]).toEqual(
      result.value?.notification,
    );
  });
});
