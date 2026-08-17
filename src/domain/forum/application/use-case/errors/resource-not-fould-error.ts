import type { UseCaseError } from "@/core/errors/use-case-error";

export class ResourceNotFouldError extends Error implements UseCaseError {
  constructor() {
    super("Resoulce not fould");
  }
}
