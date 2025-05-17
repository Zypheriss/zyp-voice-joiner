 **Öylesine yapılmış olan üstünde fazla durmadığım botları çoklu şekilde ses kanalına sokan bir alt yapı**

# ecosystem.config 

**Şimdi buradan tokenleri falan giriyoruz botların bağlanacağı kanal id sini   name kısımları botların pm2 üzerinde göstericeği isimdir**

**script de yazan zyp.js botun ana dosyasıdır eğer ki ana dosyanın adını değiştirip ecosystem.config den güncellemezseniz bot hata alır**

# kurulum

**npm install pm2 -g**

**pm2 start all** tüm botları çalıştırırsın ( pm2 start all ile çalışmazsa botlar bunu dene pm2 start ecosystem.config.js )

**pm2 list** bot log işte ne olmuş falan filan görürsün

**pm2 stop all** tüm botları kapatır

**pm2 delete all** tüm çalışan process leri siler yani örnek vermem gerekirse bir slashlı botunuz var ve eski botunuzda slashlar kaldı silinmiyor yeni botunuzun slashları eski botunuzda kayıtlı olan slashlar ile karıştı birleşti pm2 delete all yaparak bunları temizlersin pm2 delete yaptıktan sonra pm2 start all yapmayı unutma 

**zyp.js nin adını değiştirdiğiniz de atıyorum 123.js yaptınız aynı şeyi ecosystem.config de Script yazan yeri de 123.js yapmanız lazımdır**

# Bu bot sadece örnek v1 sürümdür Yakın zamanda otomasyonlu Komutlu bir bot paylaşılacaktır 

# https://discord.gg/8dSDAk2fVx
