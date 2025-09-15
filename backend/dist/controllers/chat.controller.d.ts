import { Request, Response } from "express";
/**
 * START CHAT WITH MESSAGE (Like ChatGPT)
 * Purpose: Create chat and send first message in one action
 * Research Value: Natural conversation flow analysis
 */
export declare const startChatWithMessage: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
/**
 * GET ALL USER CHATS
 * Purpose: Retrieve chat history for a student
 * Research Value: Analyze conversation patterns and academic engagement
 */
export declare const getUserChats: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
/**
 * GET MOST RECENT ACTIVE CHAT
 * Purpose: Load the last active chat when user opens app (like ChatGPT)
 * Research Value: Track user engagement patterns
 */
export declare const getMostRecentChat: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
/**
 * GET SPECIFIC CHAT WITH MESSAGES
 * Purpose: Retrieve a complete conversation with all messages
 * Research Value: Analyze detailed conversation flow and AI interaction patterns
 */
export declare const getChatById: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
/**
 * ADD MESSAGE TO CHAT
 * Purpose: Store user message only (always user role)
 * Research Value: Capture student questions and academic interests
 * Note: Auto-updates title if still using auto-generated one
 */
export declare const addMessage: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
/**
 * SEND MESSAGE WITH AI RESPONSE
 * Purpose: Add user message and automatically generate AI response
 * Research Value: Capture complete conversation flow for academic research
 * Note: This creates the ChatGPT-like experience for students
 */
export declare const sendMessageWithAI: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
/**
 * UPDATE CHAT TITLE
 * Purpose: Allow students to organize their conversations
 * Research Value: Track how students categorize their academic discussions
 Maybe if we want it to be manual later
export const updateChat = asyncHandler(async (req: Request, res: Response) => {
    const { chatId } = req.params;
    const { title } = req.body;
    const userId = (req as any).user._id;

    // Validate chat ID
    if (!chatId) {
        throw new ApiError(400, "Chat ID is required");
    }
    
    if (!Types.ObjectId.isValid(chatId)) {
        throw new ApiError(400, "Invalid chat ID format");
    }

    // Find and verify chat ownership
    const chat = await Chat.findOne({
        _id: new Types.ObjectId(chatId),
        userId: new Types.ObjectId(userId),
        isActive: true
    });

    if (!chat) {
        throw new ApiError(404, "Chat not found or access denied");
    }

    // Update title if provided
    if (title !== undefined) chat.title = title;

    await chat.save();

    return res.status(200).json({
        success: true,
        message: "Chat updated successfully",
        data: {
            chatId: chat._id,
            title: chat.title,
            updatedAt: chat.updatedAt
        }
    });
});
*/
/**
 * DELETE CHAT (TIME-RESTRICTED)
 * Purpose: Allow students to delete chats only within 15 minutes of creation
 * Research Value: Protect research data while allowing immediate mistake correction
 */
export declare const deleteChat: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
/**
 * DELETE MESSAGE (TIME-RESTRICTED)
 * Purpose: Allow students to delete individual messages only within 15 minutes
 * Research Value: Protect message data while allowing immediate mistake correction
 */
export declare const deleteMessage: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
/**
 * MARK CHAT AS CURRENTLY ACTIVE
 * Purpose: Track which chat user is currently viewing (like ChatGPT's selected chat)
 * Research Value: Analyze user navigation patterns
 */
export declare const setActiveChat: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
/**
 * AUTO-ARCHIVE OLD CHATS
 * Purpose: Automatically mark old inactive chats as inactive for better organization
 * Research Value: Track chat lifecycle and user engagement patterns
 */
export declare const autoArchiveOldChats: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
/**
 * MARK CHAT AS INACTIVE (Manual Archive)
 * Purpose: Allow users to archive chats without deleting them
 * Research Value: Study user organization behavior
 */
export declare const archiveChat: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
/**
 * RESTORE ARCHIVED CHAT
 * Purpose: Allow users to restore archived chats
 * Research Value: Track chat restoration patterns
 */
export declare const restoreChat: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
//# sourceMappingURL=chat.controller.d.ts.map