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

main();


/*

Como o modelo sabe quais ferramentas existem?
Precisamos fornecer ao modelo uma descrição das ferramentas disponíveis. Em APIs de modelos que oferecem tool calling ou function calling, normalmente enviamos informações como:
- Nome da ferramenta.
- Descrição do que ela faz.
- Parâmetros esperados.
- Tipos e restrições dos parâmetros.

Por exemplo, uma descrição conceitual de get_order seria:

const getOrderDefinition = {
  name: "get_order",
  description: "Consulta um pedido pelo seu identificador.",
  parameters: {
    orderId: "number",
  },
};

*/