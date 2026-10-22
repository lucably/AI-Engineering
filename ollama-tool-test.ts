import ollama from "ollama";

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
  const response = await ollama.chat({
    model: "qwen3:4b",
    messages: [
      {
        role: "system",
        content:
          "Quando o usuário perguntar sobre o status de um pedido, use a ferramenta get_order.",
      },
      {
        role: "user",
        content: "Qual é o status do meu pedido 123?",
      },
    ],
    tools,
  });

  console.log(
    JSON.stringify(response.message.tool_calls ?? [], null, 2),
  );
}


main().catch(console.error);

// para testar -> npx tsx ollama-tool-test.ts