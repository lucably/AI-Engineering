import { ToolCall } from "./interface";
import { executeTool } from "./tool";


async function main() {
  const toolCallGetStock: ToolCall = {
    name: "get_stock",
    arguments: {
      orderId: 123,
    },
  };

  const toolCallGetOrder: ToolCall = {
    name: "get_order",
    arguments: {
      orderId: 123,
    },
  };

  const result = await executeTool(toolCallGetStock);
  const result2 = await executeTool(toolCallGetOrder);

  console.log("Resultado:", result);
  console.log("Resultado2:", result2);
}

// executar -> npx tsx main.ts
main();