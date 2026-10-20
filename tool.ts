import { ToolCall } from "./interface";
import { getStock, getOrder, getUser } from "./services";
import { userSchema, orderSchema } from "./validateArguments";

const toolPermissions = {
  get_stock: "read",
  get_order: "read",
  cancel_order: "write",
} as const;

const toolRegistry = {
  get_stock: {
    execute: (args: unknown) => {
      const { orderId } = orderSchema.parse(args);
      return getStock(orderId);
    },
  },

  get_order: {
    execute: (args: unknown) => {
     const { orderId } = orderSchema.parse(args);
     return getOrder(orderId);
    },
  },

  get_user: {
    execute: (args: unknown) => {
      const { userId } = userSchema.parse(args);
      return getUser(userId);
    },
  },
};

type ToolName = keyof typeof toolRegistry;

function isToolName(name: string): name is ToolName {
  return Object.hasOwn(toolRegistry, name);
}

async function executeTool(toolCall: ToolCall) {
  try {
    if (!isToolName(toolCall.name)) {
      throw new Error("Tool não encontrada");
    }

    const tool = toolRegistry[toolCall.name];

    return await tool.execute(toolCall.arguments);
  } catch (error) {
    console.error("Erro ao executar ferramenta:", error);
    throw error;
  }
}

export {
  executeTool
}