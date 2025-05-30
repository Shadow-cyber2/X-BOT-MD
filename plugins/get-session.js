const { cmd } = require('../command');
const { runtime } = require('../lib/functions');
const config = require('../config');

cmd({
    pattern: "getsession",
    alias: ["sessionid"],
    use: '.getsession',
    desc: "Check bot's response time.",
    category: "system",
    react: "⚡",
    filename: __filename
}, async (conn, mek, m, { from, quoted, isOwner, sender, reply }) => {
    try {
        if (!isOwner) return reply("*You are not permitted to USe this command!*");
        const start = new Date().getTime();

        const reactionEmojis = ['🔥', '⚡', '🚀', '💨', '🎯', '🎉', '🌟', '💥', '🕐', '🔹'];
        const textEmojis = ['💎', '🏆', '⚡️', '🚀', '🎶', '🌠', '🌀', '🔱', '🛡️', '✨'];

        const reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
        let textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];

        // Ensure reaction and text emojis are different
        while (textEmoji === reactionEmoji) {
            textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
        }

        // Send reaction using conn.sendMessage()
        await conn.sendMessage(from, {
            react: { text: textEmoji, key: mek.key }
        });

        const end = new Date().getTime();
        const responseTime = (end - start) / 1000;
        const uptime = runtime(process.uptime());
        const startTime = new Date(Date.now() - process.uptime() * 1000);
        
        const text = `${config.SESSION_ID}`;

        // ارسال تصویر همراه با متن
        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/yv8zy4.jpg" },  // آدرس تصویر دلخواه خود را وارد کنید
            caption: text
        }, { quoted: mek });

        await reply(`Response Time: ${responseTime} seconds\n\nUptime: ${uptime}`);

    } catch (e) {
        console.error("Error in ping command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
