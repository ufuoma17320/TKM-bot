const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT00wSUlnUDFVSEM4S1p0WUMvcGlJUURXaEsycUZqRUgybThvMU9hWTBHdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoianhYZFBtZWEwQ2x3eFl4THAxbUpPTVNJY2k4ek10YTlmdHJob0o4cDVoQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwR3AyMUlKZHdxVEI4RmZ6Mkh6UEorRnFOa2Vmd1JpeTJ1cHFOZkt5djNRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0VkxNakxBMUJxWlR5L2V2OGtkb3dLM0tvTTJaL1loNDVaK1VVN2tobWhzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndKNDJqMXdseFg3OW14WkJEemJ1bitiTTdnTldlK3Fjd2dRRjMyMWhwRzA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9mWmIzT0pUQm9TWWIza1FUb1J2VkxwTUN5bFE5cThyczg3MHZRNS9JaEE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0lNYXA5N3orY0xYdUEyUDNUeTNHdXUzSkZ6cDQra1hnbGVJMzFoM1ltbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYXZySnVXK090Q3ZlQnM5RkNRakVIcFBDYkhZY2xDcUNWQkErMnZBWTB3TT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikc0Zlg0cmJBajdlTGtlRi9DRi9iVFN6WEFndmJDaUJQN2h2d3lsdUdjbEtLZktvYzN6MHlYT2REcERLTExlQmRqYzg4aEpLWEtoQysvY3hHKzdIOWpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg3LCJhZHZTZWNyZXRLZXkiOiJRcFdrZ1JDWjlJYngveG9hVlRmZTE0cm4rYjAzK2FHMWp3M1JJQ1hkQnRBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgxODQ2NzAyMjlAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMjZDNkM5NzU3RjYzRUU1NTNCN0VFQTgxQjIyNTdGNzMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyMTE5NzEwMX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiY2NxbkZPSXFUUWVkVTJsRHNGaG90dyIsInBob25lSWQiOiJkM2YzYjZiYi0zODdjLTQyNGUtOWEyZC1mZTg4NDkxZjI3N2QiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVVg4cnJnQ1BNZE12cUxublBYanlHQklNbGNnPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRsaFQwQllZRzROSHphOGcrZmNvKzh3c2E1bz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJXUEo3V0REOSIsIm1lIjp7ImlkIjoiMjM0ODE4NDY3MDIyOTo3QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCdmJHwnZi28J2Yq/CdmLbwnZi18J2YtPCdmLYg8J2YmvCdmLDwnZiz8J2YpPCdmKbwnZiz8J2YpvCdmLMifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xyZXNHTVFuc1RkdEFZWUJpQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjZnamowUVdLcEpWRnd1TFVibUhQVzIzZUFJSmxIMDlYYzZRZnlqVDBQRjA9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjBxbmxsUU9GVi9hbFZnOXZ3dGI5NWo1dmtJVnJmbmsxd1dHVnp5STFZQ2k2ODJsUWhRTHIzeWJ4TVRkSlRnWCtvOS9mc3NoT05wVE1tUXBBOWhKNEJnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJlRSt2RTR0a3lUSUp4aGkvaHZ3WVM4M1h6OGhDcVhwUzYyamRkS1l0VVNRT25jSGxPclZha2dJZ3lEYUtTdXpGajhTRk5PSUo2TXVYdkVOaU5ZbXhpdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgxODQ2NzAyMjk6N0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJlb0k0OUVGaXFTVlJjTGkxRzVoejF0dDNnQ0NaUjlQVjNPa0g4bzA5RHhkIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxMTk3MDk4LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU1YOSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "254728842688",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
