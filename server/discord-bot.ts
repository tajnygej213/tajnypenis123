import { Client, GatewayIntentBits, Events } from "discord.js";
import { registerDiscordCommands, registerSlashCommands } from "./discord-commands";

let connectionSettings: any;
let cachedClient: Client | null = null;

async function getAccessToken() {
  // First try env var (for Railway/production)
  const envToken = process.env.DISCORD_TOKEN;
  if (envToken) {
    return envToken;
  }

  // Fallback: try Replit Connectors (for Replit development)
  if (
    connectionSettings &&
    connectionSettings.settings.expires_at &&
    new Date(connectionSettings.settings.expires_at).getTime() > Date.now()
  ) {
    return connectionSettings.settings.access_token;
  }

  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? "repl " + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
      ? "depl " + process.env.WEB_REPL_RENEWAL
      : null;

  if (!xReplitToken) {
    console.warn("[Discord] DISCORD_TOKEN env var or Replit connection not found - bot will be disabled");
    return null;
  }

  try {
    connectionSettings = await fetch(
      "https://" +
        hostname +
        "/api/v2/connection?include_secrets=true&connector_names=discord",
      {
        headers: {
          Accept: "application/json",
          X_REPLIT_TOKEN: xReplitToken,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => data.items?.[0]);

    const accessToken =
      connectionSettings?.settings?.access_token ||
      connectionSettings?.settings?.oauth?.credentials?.access_token;

    if (!connectionSettings || !accessToken) {
      console.warn("[Discord] not properly configured via Replit connector");
      return null;
    }
    return accessToken;
  } catch (error) {
    console.error("Error getting Discord token:", error);
    return null;
  }
}

export async function getDiscordClient() {
  try {
    const token = await getAccessToken();
    if (!token) {
      console.error("No Discord token available");
      return null;
    }

    const client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
      ],
    });

    await client.login(token);
    return client;
  } catch (error) {
    console.error("Error creating Discord client:", error);
    return null;
  }
}

export async function startDiscordBot() {
  try {
    const token = await getAccessToken();
    if (!token) {
      console.error("No Discord token available for bot start");
      return null;
    }

    const client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
      ],
    });

    client.on(Events.ClientReady, async () => {
      console.log(`✅ Discord bot logged in as ${client.user?.tag}`);

      // Register slash commands
      const guildId = process.env.DISCORD_GUILD_ID;
      const clientId = client.user?.id;

      if (guildId && clientId) {
        await registerSlashCommands(token, clientId, guildId);
      }
    });

    // Register command handlers
    registerDiscordCommands(client);

    await client.login(token);
    return client;
  } catch (error) {
    console.error("Error starting Discord bot:", error);
    return null;
  }
}

export async function grantDiscordRole(
  userId: string,
  guildId: string,
  roleId: string
): Promise<boolean> {
  try {
    const client = await getDiscordClient();
    if (!client) {
      console.error("Discord client not available");
      return false;
    }

    const guild = await client.guilds.fetch(guildId);
    const member = await guild.members.fetch(userId);
    await member.roles.add(roleId);

    await client.destroy();
    return true;
  } catch (error) {
    console.error("Error granting Discord role:", error);
    return false;
  }
}

export async function removeDiscordRole(
  userId: string,
  guildId: string,
  roleId: string
): Promise<boolean> {
  try {
    const client = await getDiscordClient();
    if (!client) {
      console.error("Discord client not available");
      return false;
    }

    const guild = await client.guilds.fetch(guildId);
    const member = await guild.members.fetch(userId);
    await member.roles.remove(roleId);

    await client.destroy();
    return true;
  } catch (error) {
    console.error("Error removing Discord role:", error);
    return false;
  }
}
