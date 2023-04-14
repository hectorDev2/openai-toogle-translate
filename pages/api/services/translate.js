import { Configuration, OpenAIApi } from "openai";

const apiKey = process.env.VITE_API_KEY_OPEN_IA;

const configuration = new Configuration({
  apiKey,
});

const openai = new OpenAIApi(configuration);

export async function translate(fromLanguage, toLanguage, text) {
  const messages = [
    {
      role: "System",
      content:
        "You are a AI that translate text. the original language is sorrounded by `{{`and`}}`.You can also receive a {{auto}} which mean that have to detect the language.The language you translate to is a sorrounded by `[[`and`]]`",
    },
    {
      role: "User",
      content: "hola mundo {{Spanish}} [[English]]",
    },
    {
      role: "Assistant",
      content: "Hello world",
    },
    {
      role: "User",
      content: " how are you? {{auto}} [[Deutsch]]",
    },
    {
      role: "Assistant",
      content: "Ich bin gut, danke.",
    },
    {
      role: "User",
      content: "bon dia com estas? {{auto}} [[English]]",
    },
    {
      role: "Assistant",
      content: "Good morning, how are you?",
    },
  ];

  if (fromLanguage === toLanguage) return text;

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      ...messages,
      {
        role: "User",
        content: `${text} {{${fromLanguage}}} [[${toLanguage}]]`,
      },
    ],
  });

  return completion.data.choices[0].message?.content;
}
