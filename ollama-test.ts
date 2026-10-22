import ollama from "ollama";

async function main() {
  const response = await ollama.chat({
    model: "qwen3:4b",
    messages: [
      {
        role: "user",
        content: "Explique em uma frase o que é uma API REST.",
      },
    ],
  });

  console.log(response.message.content);
}

main().catch(console.error);