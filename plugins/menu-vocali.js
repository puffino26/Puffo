import 'os';
import 'util';
import 'human-readable';
import '@whiskeysockets/baileys';
import 'fs';
import 'perf_hooks';

let handler = async (message, { conn, usedPrefix }) => {
  const senderName = await conn.getName(message.sender);
  const targetJid = message.quoted
    ? message.quoted.sender
    : message.mentionedJid && message.mentionedJid[0]
    ? message.mentionedJid[0]
    : message.fromMe
    ? conn.user.jid
    : message.sender;

  // Immagine del profilo di chi usa il comando 😜
  const profilePicUrl = (await conn.profilePictureUrl(targetJid, "image").catch(() => null)) || "./src/avatar_contact.png";
  let profilePicBuffer;
  if (profilePicUrl !== "./src/avatar_contact.png") {
    profilePicBuffer = await (await fetch(profilePicUrl)).buffer();
  } else {
    profilePicBuffer = await (await fetch("https://qu.ax/cSqEs.jpg")).buffer();
  }

  const botName = global.db.data.nomedelbot || " ꙰ 𝟥𝟥𝟥 ꙰ 𝔹𝕆𝕋 ꙰ ";
  
  // Comandi con formattazione stilizzata
  const commandList = `
✨ *𝐌𝐞𝐧𝐮 𝐕𝐨𝐜𝐚𝐥𝐢* ✨
────────────────────────
➤ ${usedPrefix}𝐦𝐚𝐫𝐭𝐞𝐥𝐥𝐚𝐫𝐞
➤ ${usedPrefix}𝐨𝐫𝐠𝐚𝐬𝐦𝐢
➤ ${usedPrefix}𝐟𝐫𝐞𝐞𝐬𝐭𝐲𝐥𝐞
➤ ${usedPrefix}𝐚
➤ ${usedPrefix}𝐦𝐚𝐫𝐭𝐢𝐧 𝐠𝐚𝐫𝐢𝐱
➤ ${usedPrefix}𝐡𝐨𝐥𝐚

────────────────────────
 ꙰ 𝟥𝟥𝟥 ꙰ 𝔹𝕆𝕋 ꙰   -  𝐕𝐞𝐫𝐬𝐢𝐨𝐧𝐞: ${vs}
`.trim();

  // Versione Origin Bot
  await conn.sendMessage(message.chat, {
    text: commandList,
    contextInfo: {
      mentionedJid: conn.parseMention(wm),
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363341274693350@newsletter',
        serverMessageId: '',
        newsletterName: botName
      },
      externalAdReply: {
        title: senderName,
        body: `𝐕𝐞𝐫𝐬𝐢𝐨𝐧𝐞 𝐁𝐨𝐭: ${vs}`,
        mediaType: 1,
        renderLargerThumbnail: false,
        previewType: "PHOTO",
        thumbnail: profilePicBuffer,
        sourceUrl: 'ok'
      }
    }
  });
};

handler.help = ["menu"];
handler.tags = ['menu'];
handler.command = /^(menuvocali)$/i;

export default handler;

// Formattazione del tempo (per Youns non esiste, lui è immortale)
function clockString(milliseconds) {
  let hours = Math.floor(milliseconds / 3600000);
  let minutes = Math.floor(milliseconds / 60000) % 60;
  let seconds = Math.floor(milliseconds / 1000) % 60;

  console.log({ ms: milliseconds, h: hours, m: minutes, s: seconds });
  
  return [hours, minutes, seconds].map(timeUnit => timeUnit.toString().padStart(2, '0')).join(':');
}
