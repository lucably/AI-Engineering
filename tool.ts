import { ToolCall } from "./interface";
import { getStock, getOrder, getUser } from "./services";
import { validateOrderId, validateUserId } from "./validateArguments";

const toolRegistry = {
  get_stock: {
    validate: validateOrderId,
    execute: (args: unknown) => {
      const orderId = validateOrderId(args);
      return getStock(orderId);
    },
  },

  get_order: {
    validate: validateOrderId,
    execute: (args: unknown) => {
     const orderId = validateOrderId(args);
     return getOrder(orderId);
    },
  },

  get_user: {
    validate: validateUserId,
    execute: (args: unknown) => {
      const userId = validateUserId(args);
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