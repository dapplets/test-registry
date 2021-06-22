import { Client } from 'discord.js';

export async function getAnnouncements() {
    const client = new Client();
    await client.login(process.env.DISCORD_BOT_KEY as string);
    const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL_ID as string) as any;
    const rawMessages = await channel.messages.fetch({ limit: 10 }) as any[];
    
    const messages = rawMessages.map(({ id, content, createdTimestamp }) => ({
        content, 
        timestamp: new Date(createdTimestamp).toISOString()
    }));

    return messages;
}