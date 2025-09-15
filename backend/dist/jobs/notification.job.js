"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const firebase_1 = __importDefault(require("../firebase"));
const token_1 = __importDefault(require("../models/token"));
const notificationMessages = [
    "📚 Ready for a quick study boost? Let’s go!",
    "⏰ Your AI buddy is waiting to help you today!",
    "💡 Time to sharpen your mind—just 10 mins of study!",
    "🔥 A little focus now, big rewards later!",
    "📖 Open your books, your future self will thank you!",
    "🚀 Let’s crush one more topic today!",
    "🎯 Stay consistent, you’re doing amazing!",
    "🧠 Exercise your brain, one chapter at a time!",
    "✨ Your progress is adding up—keep it going!",
    "🌱 Growth happens a little every day, study time!",
    "📈 Keep leveling up, champion!",
    "⚡ Quick revision now = easier tests later!",
    "🎓 Step closer to your goals today!",
    "💪 You’ve got this—let’s start small!",
    "🔑 One topic today = confidence tomorrow!",
    "📅 Don’t break the streak, 5 mins study now!",
    "🎶 Study vibes on! Let’s do this!",
    "📔 Notes are waiting to be reviewed!",
    "🌟 Build your skills brick by brick!",
    "💭 A focused mind is unstoppable!",
    "🕒 Even a short study session counts!",
    "📕 Knowledge is your superpower, unlock it!",
    "🚴 Small effort today, big results tomorrow!",
    "🏆 Keep hustling, you're closer than you think!",
    "🌞 Morning brain boost: review one topic!",
    "🌙 Night owl? Let’s revise before bed!",
    "🎉 Consistency beats motivation every time!",
    "🌍 The world is yours, keep learning!",
    "⚙️ Sharpen your tools, master your craft!",
    "📌 10 minutes of study now > 0 later!",
];
async function sendNotificationToToken(token) {
    try {
        const randomMessage = notificationMessages[Math.floor(Math.random() * notificationMessages.length)];
        await firebase_1.default.messaging().send({
            token,
            notification: {
                title: "📢 Study Reminder",
                body: randomMessage || "Time for a quick study boost! 📚",
            },
        });
        console.log(`✅ Notification sent to ${token}`);
    }
    catch (error) {
        console.error(`❌ Failed for ${token}`, error);
    }
}
// Cron job: every day at 8 PM
node_cron_1.default.schedule("0 20 * * *", async () => {
    //cron.schedule("*/10 * * * * *", async () => {
    console.log("⏰ Running daily notification job...");
    const tokens = await token_1.default.find({});
    for (const user of tokens) {
        await sendNotificationToToken(user.token);
    }
});
//# sourceMappingURL=notification.job.js.map