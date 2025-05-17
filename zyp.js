const { Client, GatewayIntentBits, ChannelType } = require("discord.js");
const { joinVoiceChannel, VoiceConnectionStatus } = require("@discordjs/voice");

const BOT_TOKEN = process.env.TOKEN;
const VOICE_CHANNEL_ID = process.env.CHANNEL_ID;

if (!BOT_TOKEN || !VOICE_CHANNEL_ID) {
  console.error("TOKEN veya CHANNEL_ID ortam değişkenleri eksik!");
  process.exit(1);
}

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

let voiceConnectionInstance = null;

async function attemptVoiceJoin() {
  try {
    const voiceChannel = await bot.channels.fetch(VOICE_CHANNEL_ID);
    if (!voiceChannel || voiceChannel.type !== ChannelType.GuildVoice) {
      console.warn("Belirtilen kanal ses kanalı değil veya bulunamadı.");
      return;
    }
    if (voiceConnectionInstance) voiceConnectionInstance.destroy();

    voiceConnectionInstance = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      selfMute: false,
      selfDeaf: false,
    });

    voiceConnectionInstance.on(VoiceConnectionStatus.Ready, () => {
      console.log(`Ses kanalına başarıyla bağlanıldı: ${voiceChannel.name}`);
    });

    voiceConnectionInstance.on(VoiceConnectionStatus.Disconnected, () => {
      console.log("Ses bağlantısı kesildi, 3 saniye sonra tekrar bağlanılıyor...");
      setTimeout(attemptVoiceJoin, 3000);
    });

  } catch (error) {
    console.error("Ses kanalına bağlanma hatası:", error);
    setTimeout(attemptVoiceJoin, 5000);
  }
}

bot.once("ready", async () => {
  console.log(`${bot.user.tag} aktif!`);
  try {
    await bot.user.setPresence({
      activities: [{ name: "zyp", type: 0 }], 
      status: "dnd",
    });
    console.log("Durum başarıyla ayarlandı.");
  } catch (err) {
    console.warn("Durum ayarlanırken hata oluştu:", err);
  }

  attemptVoiceJoin();
});

bot.login(BOT_TOKEN).catch(err => {
  console.error("Bot giriş yapamadı:", err);
});
