import { Client, FetchQueue, Guild, GuildResolvable, Member, User, UserResolvable } from "../../../internal";
import getRoute from "../../../util/getRoute";
import parseMember from "../events/parseMember";
import { RawMemberData } from "../events/rawMemberData";

export default async function getGuildMember(client: Client, guildResolvable: GuildResolvable, userResolvable: UserResolvable): Promise<Member> {

    // Resolve objects
    const guildID: string = Guild.resolveID(guildResolvable);
    const userID: string = User.resolveID(userResolvable);

    // Define fetch data
    const path: string = `/guilds/${guildID}/members/${userID}`;
    const method: string = "GET";
    const route: string = getRoute(path, method);

    // Get fetch queue
    const fetchQueue: FetchQueue = client._getFetchQueue(route);

    // Add to fetch queue
    const result: RawMemberData = await fetchQueue.request({
        path,
        method
    });

    // Parse member
    const member: Member = parseMember(client, result, guildID);

    // Return
    return member;
}