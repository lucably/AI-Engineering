import { ToolCall, ToolPermission } from "./interface";
import { getStock, getOrder, getUser } from "./services";
import { userSchema, orderSchema } from "./validateArguments";

const toolPermissions = {
  get_stock: "read",
  get_order: "read",
  cancel_order: "write",
} as const;

const toolRegistry = {
  get_stock: {
    permission: "read",
    execute: (args: unknown) => {
      const { orderId } = orderSchema.parse(args);
      return getStock(orderId);
    },
  },

  get_order: {
    permission: "read",
    execute: (args: unknown) => {
     const { orderId } = orderSchema.parse(args);
     return getOrder(orderId);
    },
  },

  get_user: {
    permission: "read",
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

    if (tool.permission === "write" && !toolCall.approved) {
      throw new Error("Ação não autorizada");
    }

    return await tool.execute(toolCall.arguments);
  } catch (error) {
    console.error("Erro ao executar ferramenta:", error);
    throw error;
  }
}

export {
  executeTool
}