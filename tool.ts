import { ToolCall } from './interface';
import { getStock, getOrder } from './services';

type ToolArguments = Record<string, unknown>;

//Valida os parametros que irao vir das funcoes
function validateOrderId(args: ToolArguments): string | null {
  if (!Number.isInteger(args.orderId)) {
    return "orderId deve ser um número inteiro.";
  }

  if ((args.orderId as number) <= 0) {
    return "orderId deve ser maior que zero.";
  }

  return null;
}

// catálogo de ferramentas disponíveis.
const toolRegistry = {
  get_stock: {
    execute: getStock,
    validate: validateOrderId,
  },
  get_order: {
    execute: getOrder,
    validate: validateOrderId,
  },
};

// Pega as chaves para validacao das funcoes registradas
type ToolName = keyof typeof toolRegistry;

async function executeTool(toolCall: ToolCall) {
  if (!Object.hasOwn(toolRegistry, toolCall.name)) {
    throw new Error(
      `Ferramenta desconhecida: ${toolCall.name}`,
    );
  }

  const toolName = toolCall.name as ToolName;
  const tool = toolRegistry[toolName];

  const validationError = tool.validate(
    toolCall.arguments,
  );

  if (validationError) {
    throw new Error(validationError);
  }

  const orderId = toolCall.arguments.orderId as number;

  return tool.execute(orderId);
}

export {
  executeTool
}