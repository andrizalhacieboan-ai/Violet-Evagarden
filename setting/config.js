const fs = require('fs')

global.owner = "628xxxx" // nomor owner
global.footer = "ⓒ ANDRI STORE"
global.namabot = "Violet Evegarden" // nama bot lu
global.status = true
global.namaowner = "ANDRI STORE"
global.idsaluran = "120363420593019978@newsletter"
global.namasaluran = "ANDRI STORE INFORMASI"
global.linksaluran = "https://whatsapp.com/channel/0029VbBBPQvD8SDsMDyM8V0v" // link saluran lu
global.imgmenu = "https://files.catbox.moe/5a7xoe.jpg" // JANGAN DI GANTI NNTI ERROR
global.packname = "By andri store"
global.author = "By andri store"

//======[ Setting Event ]======//
global.lol = "";
global.msg = {
    owner: "[❌ 𝗔𝗞𝗦𝗘𝗦 𝗗𝗜 𝗧𝗢𝗟𝗔𝗞]\nFitur ini khusus owner‼️",
    premium: "[❌ 𝗔𝗞𝗦𝗘𝗦 𝗗𝗜 𝗧𝗢𝗟𝗔𝗞]\nFitur ini khusus premium‼️",
    admin: "[❌ 𝗔𝗞𝗦𝗘𝗦 𝗗𝗜 𝗧𝗢𝗟𝗔𝗞]\nFitur ini hanya bisa digunakan oleh *Admin Grup*!",
    adminbot: "Bot harus jadi admin dulu kak 🗿",
    group: "[❌ 𝗔𝗞𝗦𝗘𝗦 𝗗𝗜 𝗧𝗢𝗟𝗔𝗞]\n Fitur ini hanya bisa digunakan di dalam *Grup*!",
    priv: "[❌ 𝗔𝗞𝗦𝗘𝗦 𝗗𝗜 𝗧𝗢𝗟𝗔𝗞]\nFitur ini hanya bisa digunakan di *chat pribadi*!",
    bot: "[❌ 𝗔𝗞𝗦𝗘𝗦 𝗗𝗜 𝗧𝗢𝗟𝗔𝗞]\n Fitur ini hanya untuk digunakan oleh *bot* itu sendiri."
}
global.autoTyping = false // ubah jadi false kalau mau matikan auto typing

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})
