import { Channel, ChannelData, Client } from "../../internal";

export interface GuildChannelData extends ChannelData {
    name: string;
    guildID: string;
    position: number;
    permissionOverwrites: PermissionOverwrite[];
    parentID?: string;
}

export interface PermissionOverwrite {
    id: string;
    type: PermissionType;
    allow: string;
    deny: string;
}

export type PermissionType = typeof PERMISSION_TYPE_ROLE | typeof PERMISSION_TYPE_MEMBER;
export const PERMISSION_TYPE_ROLE = 0;
export const PERMISSION_TYPE_MEMBER = 1;

export default class GuildChannel extends Channel {

    /**
     * Name
     *
     * The channel's name
     */
    name: string;

    /**
     * Guild ID
     *
     * The ID of the guild this channel is in
     */
    guildID: string;

    /**
     * Position
     *
     * The position of this channel
     */
    position: number;

    /**
     * Permission Overwrites
     *
     * The permission overwrites of this channel
     */
    permissionOverwrites: PermissionOverwrite[];

    /**
     * Parent ID
     *
     * The ID of this channel's parent channel
     */
    parentID?: string;

    /**
     * Guild Channel
     *
     * @param client The client
     * @param guildChannelData Options to initialize this guild channel with
     * @param guildChannelData.name The channel's name
     * @param guildChannelData.guildID The ID of the guild this channel is in
     * @param guildChannelData.position The position of this channel
     * @param guildChannelData.permissionOverwrites The permission overwrites of this channel
     * @param guildChannelData.parentID The ID of this channel's parent channel
     */
    constructor(client: Client, guildChannelData: GuildChannelData) {

        // Super
        super(client, guildChannelData);

        // Set data
        this.name = guildChannelData.name;
        this.guildID = guildChannelData.guildID;
        this.position = guildChannelData.position;
        this.permissionOverwrites = guildChannelData.permissionOverwrites;
        this.parentID = guildChannelData.parentID;
    }
}