import * as dotenv from "dotenv";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { CallbackHandler } from "langfuse-langchain";

dotenv.config();

const prompt = PromptTemplate.fromTemplate(`Tell me a joke about {param}`);

const llm = new ChatOpenAI({modelName: "gpt-4-turbo", verbose: true});

const parser = new JsonOutputParser();
const chain = prompt.pipe(llm).pipe(parser).withConfig({ runName: "getRelatedQuestions" });

chain.name = "getRelatedQuestions";

await chain.invoke({ param: "a black cat"}, { callbacks: [new CallbackHandler({flushAt: 1})] });


