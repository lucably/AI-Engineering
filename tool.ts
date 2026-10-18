import { ToolCall } from './interface';
import { getStock, getOrder } from './services';

async function executeTool(toolCall: ToolCall) {
  switch (toolCall.name) {
    case "get_stock": {
      const productOrderId = toolCall.arguments.orderId;

      if (
        typeof productOrderId !== "number" ||
        !Number.isInteger(productOrderId) ||
        productOrderId <= 0
      ) {
        throw new Error("productOrderId inválido");
      }

      return getStock(productOrderId);
    }

    case "get_order": {
        const orderId = toolCall.arguments.orderId;

        if (
            typeof orderId !== "number" ||
            !Number.isInteger(orderId) ||
            orderId <= 0
        ) {
            throw new Error("orderId inválido");
        }

        return getOrder(orderId)
    }

    default:
      throw new Error("Ferramenta não permitida");
  }
}


export {
    executeTool
}