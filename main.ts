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

  const toolCallGetUser: ToolCall = {
    name: "get_user",
    arguments: {
      userId: 1,
    },
  };

  const result = await executeTool(toolCallGetStock);
  const result2 = await executeTool(toolCallGetOrder);
  const result3 = await executeTool(toolCallGetUser);

  console.log("Resultado:", result);
  console.log("Resultado2:", result2);
  console.log("Resultado3:", result3);
}

// executar -> npx tsx main.ts
main();