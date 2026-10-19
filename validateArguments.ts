function validateOrderId(args: unknown): boolean {
  if (typeof args !== "object" || args === null) {
    return false;
  }

  const orderId = (args as Record<string, unknown>).orderId;

  return (
    typeof orderId === "number" &&
    Number.isInteger(orderId) &&
    orderId > 0
  );
}

function validateUserId(args: unknown): boolean {
  if (typeof args !== "object" || args === null) {
    return false;
  }

  const userId = (args as Record<string, unknown>).userId;

  return (
    typeof userId === "number" &&
    Number.isInteger(userId) &&
    userId > 0
  );
}

export {
    validateOrderId,
    validateUserId
}