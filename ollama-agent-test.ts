import ollama, { type Message } from "ollama";
import { executeTool } from "./tool";

const MAX_ROUNDS = 5;

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

  for (let round = 0; round < MAX_ROUNDS; round++) {

    // O modelo analisa a pergunta e pode solicitar uma ferramenta.
    const response = await ollama.chat({
      model: "qwen3:4b",
      messages,
      tools,
    });

    // Guardamos a resposta do modelo, incluindo a solicitação da ferramenta.
    messages.push(response.message);
    console.log("response.message: ", response.message);

    const toolCalls = response.message.tool_calls ?? [];

    /* 
        Quando o Ollama solicita uma ou mais ferramentas, o código não entra no if (toolCalls.length === 0), pois o array toolCalls contém 
        as ferramentas solicitadas.

        Em seguida, o código entra no for interno, executa cada ferramenta por meio de executeTool() e adiciona os resultados ao array messages 
        usando messages.push().

        Na próxima rodada, o histórico atualizado é enviado novamente ao Ollama. O modelo analisa os resultados e pode solicitar outras ferramentas 
        ou produzir uma resposta final.

        Quando o Ollama retorna uma resposta sem novas solicitações de ferramentas, toolCalls fica vazio. Nesse momento, o código entra no if, 
        imprime a resposta final e encerra a execução com return.

        A diferença essencial: executar uma ferramenta não esvazia automaticamente toolCalls. Esse array pertence à resposta atual do Ollama; 
        a cada nova rodada, ele é criado novamente a partir da nova resposta do modelo.
    */
    if (toolCalls.length === 0) {
      console.log("Resposta final:", response.message.content);
      return;
    }

    // Executa as ferramentas solicitadas pelo modelo.
    for (const call of toolCalls) {
      // result => possui a resposta da API.
      const result = await executeTool({
        name: call.function.name,
        arguments: call.function.arguments,
      });

      // Guardamos a resposta do modelo.
      messages.push({
        role: "tool",
        tool_name: call.function.name,
        content: JSON.stringify(result),
      });
    }
  }

  // Só chega aqui se esgotar todas as rodadas.
  throw new Error("O agente atingiu o limite de rodadas.");
}

main().catch((error: unknown) => {
  console.error("\n\n\nErro na execução:", error);
});
