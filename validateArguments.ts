import { z } from "zod";

// Zod começa a fazer as validações e ai nao precisamos mais das funcoes validateOrderId, validateUserId.

// 1. Defina o padrão de ID do seu sistema uma única vez
const idSchema = z.number().int().positive();

// 2. Reutilize onde precisar
const orderSchema = z.object({
  orderId: idSchema,
});

const userSchema = z.object({
  userId: idSchema,
});


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
    orderSchema,
    userSchema
}