
import ollama, { type Message } from "ollama";
import { executeTool } from "./tool";

const tools = [
  {
    type: "function" as const,
    function: {
      name: "get_order",
      description: "Consulta o status de um pedido pelo seu identificador.",
      parameters: {
        type: "object" as const,
        properties: {
          orderId: {
            type: "integer" as const,
            description: "Identificador numérico do pedido.",
          },
        },
        required: ["orderId"],
      },
    },
  },
];

async function main() {
  const messages: Message[] = [
    {
      role: "system",
      content:
        "Quando perguntarem sobre o status de um pedido, use get_order e responda com base no resultado.",
    },
    {
      role: "user",
      content: "Qual é o status do meu pedido 123?",
    },
  ];

  // 1. O modelo analisa a pergunta e pode solicitar uma ferramenta.
  const response = await ollama.chat({
    model: "qwen3:4b",
    messages,
    tools,
  });

  // Guardamos a resposta do modelo, incluindo a solicitação da ferramenta.
  messages.push(response.message);
  console.log('response.message: ', response.message)

  const toolCalls = response.message.tool_calls ?? [];

  // 2. Nossa aplicação executa cada ferramenta solicitada.
  for (const call of toolCalls) {
    const result = await executeTool({
      name: call.function.name,
      arguments: call.function.arguments,
    });

    // 3. Devolvemos o resultado para o modelo.
    messages.push({
      role: "tool",
      tool_name: call.function.name,
      content: JSON.stringify(result),
    });
  }

  // 4. O modelo recebe o resultado e formula a resposta final.
  const finalResponse = await ollama.chat({
    model: "qwen3:4b",
    messages,
    tools,
  });

  console.log("\n\n\nResposta final:", finalResponse.message.content);
}

main().catch((error: unknown) => {
  console.error("\n\n\nErro na execução:", error);
});
