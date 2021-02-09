import { Client, User } from "../../../internal";
import { RawUserData } from "./rawUserData";

export default function parseUser(client: Client, rawData: RawUserData): User {

    // Parse user
    const user: User = new User(client, {
        id: rawData.id,
        username: rawData.username,
        discriminator: rawData.discriminator,
        avatar: rawData.avatar || undefined,
        bot: rawData.bot,
        system: rawData.system,
        publicFlags: rawData.public_flags || 0
    });

    // Return
    return user;
}