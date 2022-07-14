import type { InferQueryOutput } from "./trpc/client";

export type Preview = {preview: true, text: string, author: {id: number, username: string}};
export type MessageType = InferQueryOutput<'getMessages'>[number];