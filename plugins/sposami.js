let toM = a => '@' + a.split('@')[0]; // Funzione per formattare il numero
function handler(m, { groupMetadata }) {
  if (!groupMetadata || !groupMetadata.participants) {
    return m.reply('⚠️ Non sono riuscito a ottenere i dati dei partecipanti. Assicurati che questo comando venga eseguito in un gruppo.');
  }

  let ps = groupMetadata.participants.map(v => v.id);
  if (ps.length < 2) {
    return m.reply('⚠️ Non ci sono abbastanza partecipanti nel gruppo per formare una coppia.');
  }

  let a = ps[Math.floor(Math.random() * ps.length)];
  let b;
  do {
    b = ps[Math.floor(Math.random() * ps.length)];
  } while (b === a);

  m.reply(`*${toM(a)}, dovresti frequentarti con ${toM(b)}, state bene insieme 😁*`, null, {
    mentions: [a, b]
  });
}

handler.help = ['formarpareja']; // Aiuto sul comando
handler.tags = ['main', 'fun']; // Tag del comando
handler.command = ['creacoppia']; // Alias del comando
handler.group = true; // Specifica che il comando può essere usato solo nei gruppi
export default handler;
