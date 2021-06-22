import { Client } from 'discord.js';

export async function getAnnouncements() {
    const client = new Client();
    await client.login(process.env.DISCORD_BOT_KEY as string);
    const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL_ID as string) as any;
    const rawMessages = await channel.messages.fetch({ limit: 12 }) as any[];
    
    const messages = rawMessages.map((x) => ({
        authorUsername: x.author.username,
        content: x.content, 
        timestamp: new Date(x.createdTimestamp).toISOString(),
        link: `https://discord.com/channels/${x.channel.guild.id}/${x.channel.id}/${x.id}`
    }));

    return messages;
}