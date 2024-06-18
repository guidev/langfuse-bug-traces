import * as dotenv from "dotenv";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import {StringOutputParser} from "@langchain/core/output_parsers";
import {CallbackHandler, Langfuse} from "langfuse-langchain";

dotenv.config();

const prompt = PromptTemplate.fromTemplate(`Tell me a joke about {param}`);

const llm = new ChatOpenAI({modelName: "gpt-4-turbo", verbose: true});

const parser = new StringOutputParser();
const chain = prompt.pipe(llm).pipe(parser).withConfig({ runName: "getRelatedQuestions" });

chain.name = "getRelatedQuestions";

const langfuse = new Langfuse();

const trace = langfuse.trace({
    name: "getRelatedQuestions",
});

const langfuseHandler = new CallbackHandler({
    root: trace,
    flushAt: 1
});

await chain.invoke({ param: "a black cat"}, { callbacks: [langfuseHandler] });


