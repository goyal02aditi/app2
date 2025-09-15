import OpenAI from 'openai';
/**
 * Generate AI response for academic chat
 * @param messages - Array of conversation messages
 * @param userId - User ID for logging/research purposes
 * @returns AI response text
 */
export declare function generateAIResponse(messages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
}>, userId?: string): Promise<string>;
/**
 * Generate AI response with streaming (for real-time chat experience)
 * @param messages - Array of conversation messages
 * @param userId - User ID for logging
 * @returns Stream of AI response chunks
 */
export declare function generateAIResponseStream(messages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
}>, userId?: string): Promise<OpenAI.Chat.Completions.ChatCompletion & {
    _request_id?: string | null;
}>;
/**
 * Validate OpenAI configuration
 * @returns Configuration status and details
 */
export declare function validateOpenAIConfig(): {
    hasApiKey: boolean;
    model: string;
    temperature: number;
    systemPrompt: string;
    configured: boolean;
};
//# sourceMappingURL=openai.service.d.ts.map