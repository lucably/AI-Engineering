function validateOrderId(args: unknown): number {
  if (typeof args !== "object" || args === null) {
    throw new Error("Argumentos inválidos");
  }

  const orderId = (args as Record<string, unknown>).orderId;

  if (
    typeof orderId !== "number" ||
    !Number.isInteger(orderId) ||
    orderId <= 0
  ) {
    throw new Error("orderId inválido");
  }

  return orderId;
}

function validateUserId(args: unknown): number {
  if (typeof args !== "object" || args === null) {
    throw new Error("Argumentos inválidos");
  }

  const userId = (args as Record<string, unknown>).userId;

  if (
    typeof userId !== "number" ||
    !Number.isInteger(userId) ||
    userId <= 0
  ) {
    throw new Error("userId inválido");
  }

  return userId;
}

export {
    validateOrderId,
    validateUserId
}