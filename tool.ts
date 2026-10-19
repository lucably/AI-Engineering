import { ToolCall } from "./interface";
import { getStock, getOrder, getUser } from "./services";
import { validateOrderId, validateUserId } from "./validateArguments";

const toolRegistry = {
  get_stock: {
    validate: validateOrderId,
    execute: (args: unknown) => {
      if (!validateOrderId(args)) {
        throw new Error("orderId inválido");
      }

      const orderId = (
        args as { orderId: number }
      ).orderId;

      return getStock(orderId);
    },
  },

  get_order: {
    validate: validateOrderId,
    execute: (args: unknown) => {
      if (!validateOrderId(args)) {
        throw new Error("orderId inválido");
      }

      const orderId = (
        args as { orderId: number }
      ).orderId;

      return getOrder(orderId);
    },
  },

  get_user: {
    validate: validateUserId,
    execute: (args: unknown) => {
      if (!validateUserId(args)) {
        throw new Error("userId inválido");
      }

      const userId = (
        args as { userId: number }
      ).userId;

      return getUser(userId);
    },
  },
};

type ToolName = keyof typeof toolRegistry;

function isToolName(name: string): name is ToolName {
  return Object.hasOwn(toolRegistry, name);
}

async function executeTool(toolCall: ToolCall) {
  if (!isToolName(toolCall.name)) {
    throw new Error("Tool não encontrada");
  }

  const tool = toolRegistry[toolCall.name];

  return tool.execute(toolCall.arguments);
}

export {
  executeTool
}