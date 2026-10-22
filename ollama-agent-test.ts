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
  {
    type: "function" as const,
    function: {
      name: "get_stock",
      description: "Consulta o estoque de um pedido pelo seu identificador.",
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
        content: `
            Você é um assistente de atendimento ao cliente.

            REGRAS GERAIS:
            - Responda sempre em português brasileiro (pt-BR).
            - Seja claro, educado e objetivo.
            - Não invente informações.
            - Baseie suas respostas nos resultados das ferramentas quando elas forem utilizadas.
            - Se não tiver informações suficientes para responder, informe isso ao usuário.

            USO DE FERRAMENTAS:
            - Use get_order para consultar o status de um pedido.
            - Use get_stock para consultar o estoque de um produto.
            - Quando a pergunta exigir as duas informações, utilize as duas ferramentas.
            - Não invente resultados de consultas que não foram executadas.
        `,
    },
    // Teste chamando uma tool na pergunta.
    // {
    //   role: "user",
    //   content: "Qual é o status do meu pedido 123?",
    // },
    // Teste para quando não mandar uma tool na pergunta.
    // {
    //   role: "user",
    //   content: "Olá! Como você pode me ajudar?",
    // },
    {
      role: "user",
      content: "Consulte o pedido 123 e verifique o estoque do pedido 123.",
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

  // Caso nenhuma tool seja chamada, responde apenas a pergunta solicitada.
  if (toolCalls.length === 0) {
    console.log("\n\n\nResposta final:", response.message.content);
    return;
  }

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
