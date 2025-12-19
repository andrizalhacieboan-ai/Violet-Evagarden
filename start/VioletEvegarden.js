console.clear();
require('../setting/config');

const { 
    default: makeWASocket, 
    prepareWAMessageMedia, 
    useMultiFileAuthState, 
    DisconnectReason, 
    fetchLatestBaileysVersion, 
    makeInMemoryStore, 
    generateWAMessageFromContent, 
    generateWAMessageContent, 
    jidDecode, 
    proto, 
    relayWAMessage, 
    getContentType, 
    getAggregateVotesInPollMessage, 
    downloadContentFromMessage, 
    fetchLatestWaWebVersion, 
    InteractiveMessage, 
    makeCacheableSignalKeyStore, 
    Browsers, 
    generateForwardMessageContent,
    generateRandomMessageId,
    MessageRetryMap,
    downloadAndSaveMediaMessage,
    relayMessage,
    generateMessageID
} = require("@whiskeysockets/baileys");

const pino = require('pino');
const readline = require("readline");
const fs = require('fs');
const path = require("path");
const chalk = require("chalk");
const fetch = require('node-fetch');
const { Boom } = require('@hapi/boom');
const { color } = require('./lib/color');
const { smsg, sendGmail, formatSize, isUrl, generateMessageTag, getBuffer, getSizeMedia, runtime, fetchJson, sleep } = require('./lib/myfunction');
const axios = require('axios');

const question = (text) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => { rl.question(text, resolve) });
}

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });

const usePairingCode = true;

const sessionPath = path.join(__dirname, "session");

if (fs.existsSync(sessionPath)) {
  const credsPath = path.join(sessionPath, "creds.json");

    
  // Jika folder kosong ATAU file creds.json tidak ada ATAU gagal parsing
  let invalid = false;
  if (!fs.existsSync(credsPath)) {
    invalid = true;
  } else {
    try {
      const creds = JSON.parse(fs.readFileSync(credsPath));
      if (!creds || !creds.registered) invalid = true;
    } catch (e) {
      invalid = true;
    }
  }

  // Jika invalid, hapus folder
  if (invalid) {
    deleteFolderRecursive(sessionPath);
  }
}

const manualPassword = 'violetv1';
const costumcode = 'VIOLETV1';

console.log(chalk.cyan.bold(`Base`));


async function reostart() {
  const { state, saveCreds } = await useMultiFileAuthState("session");

  // Inisialisasi reo
  const reo = makeWASocket({
    
    printQRInTerminal: false,
    syncFullHistory: true,
    markOnlineOnConnect: true,
    connectTimeoutMs: 60000,
    defaultQueryTimeoutMs: 0,
    keepAliveIntervalMs: 10000,
    generateHighQualityLinkPreview: true,
    patchMessageBeforeSending: (message) => {
      const requiresPatch = !!(
        message.buttonsMessage ||
        message.templateMessage ||
        message.listMessage
      );
      if (requiresPatch) {
        message = {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadataVersion: 2,
                deviceListMetadata: {},
              },
              ...message,
            },
          },
        };
      }
      return message;
    },
    version: (await (await fetch('https://raw.githubusercontent.com/WhiskeySockets/Baileys/master/src/Defaults/baileys-version.json')).json()).version,
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    logger: pino({
      level: 'fatal'
    }),
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, pino().child({
        level: 'silent',
        stream: 'store'
      })),
    }
  });

  // Bind store after initializing reo
  store.bind(reo.ev);

  // Handle pairing
async function handlePairing(reo) {
  const usePairingCode = true;

  if (usePairingCode && !reo.user && !reo.authState.creds.registered) {
    const inputPassword = await question(chalk.blue('\nINPUT PASWORD,BUYER GUA PASTI TAU:\n'));

    if (inputPassword !== manualPassword) {
      console.log(chalk.red.bold('\n❌ Password salah! Sistem dimatikan...'));
      process.exit();
    }

    console.log(chalk.green('\n✅ Password Benar,You Buyer Gua!'));
    await sleep(500)

    let waNumber = await question(chalk.blue(`ENTER PHONE NUMBER >\n`));
    waNumber = waNumber.replace(/[^0-9]/g, "");
    
    const code = await reo.requestPairingCode(waNumber, costumcode);

    console.log(chalk.green.bold(`\n✅ Kode Pairing Anda: ${code}`));
    console.log(chalk.red('Gunakan kode atau pairing tersebut di WhatsApp anda untuk menyambungkan bot.\n'));
  }
}
  // Panggil fungsi handlePairing
  await handlePairing(reo);



reo.ev.on("messages.upsert", async (chatUpdate, msg) => {
 try {
const mek = chatUpdate.messages[0]
if (!mek.message) return
mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
if (mek.key && mek.key.remoteJid === 'status@broadcast') return
if (!reo.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
if (mek.key.id.startsWith('FatihArridho_')) return;
const m = smsg(reo, mek, store)
require("./Violet")(reo, m, chatUpdate, store)
 } catch (err) {
 console.log(err)
 }
});

    reo.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {};
            return decode.user && decode.server && decode.user + '@' + decode.server || jid;
        } else return jid;
    };

    reo.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = reo.decodeJid(contact.id);
            if (store && store.contacts) store.contacts[id] = { id, name: contact.notify };
        }
    });
    
    global.idch1 = '120363420593019978@newsletter' // KUNTUL
    global.idch2 = '120363422721110414@newsletter'
  reo.public = global.status;  
    
          


    reo.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === 'close') {
        const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
        console.log(color('╔═━━「 🔌 CONNECTION CLOSED 」━━═╗', 'blue'));
        console.log(color(`⟡ Reason: ${DisconnectReason[reason] || 'Unknown'}`, 'yellow'));
        console.log(color('╚═━━━━━━━━━━━━━━━━━━━━━━━━━━━━━══╝', 'blue'));

        switch (reason) {
            case DisconnectReason.badSession:
                console.log(color('✖ Bad session file. Delete session and scan again.', 'red'));
                process.exit();
                break;
            case DisconnectReason.connectionClosed:
                console.log(color('✖ Connection closed. Reconnecting...', 'orange'));
                process.exit();
                break;
            case DisconnectReason.connectionLost:
                console.log(color('✖ Connection lost. Trying to reconnect...', 'magenta'));
                process.exit();
                break;
            case DisconnectReason.connectionReplaced:
                console.log(color('✖ Session replaced. Another instance is open.', 'red'));
                await reo.logout();
                break;
            case DisconnectReason.loggedOut:
                console.log(color('✖ Logged out. Please scan again.', 'red'));
                await reo.logout();
                break;
            case DisconnectReason.restartRequired:
                console.log(color('↻ Restart required. Restarting bot...', 'cyan'));
                await reostart();
                break;
            case DisconnectReason.timedOut:
                console.log(color('⌛ Timed out. Reconnecting...', 'orange'));
                await reostart();
                break;
            default:
                console.log(color('✖ Unknown disconnect reason. Exiting...', 'red'));
                process.exit();
        }

    } else if (connection === 'connecting') {
        console.log(color('\n╭── 「  🔵 CONNECTING... 」───', 'blue'));
        console.log(color('│ Sedang menghubungkan ke WhatsApp...', 'white'));
        console.log(color('╰─────────────────────────────', 'blue'));
    } else if (connection === 'open') {
        await reo.newsletterFollow(global.idch1);   
        await reo.newsletterFollow(global.idch2);   
                           
        
        console.log(color('\n╭── 「 🟢 CONNECTED 」───', 'green'));
        console.log(color('│ Bot berhasil tersambung ke WhatsApp', 'white'));
        console.log(color('╰──────────────────────────────\n', 'green'));
    }
});

    reo.sendText = (jid, text, quoted = '', options) => reo.sendMessage(jid, { text: text, ...options }, { quoted });
    
    reo.downloadMediaMessage = async (message) => {
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
return buffer
    } 
    
    reo.ev.on('creds.update', saveCreds);
    return reo;
}

reostart();

let file = require.resolve(__filename);
require('fs').watchFile(file, () => {
    require('fs').unwatchFile(file);
    console.log('\x1b[0;32m' + __filename + ' \x1b[1;32mupdated!\x1b[0m');
    delete require.cache[file];
    require(file);
});
