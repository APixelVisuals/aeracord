import { Interaction, InteractionData } from "../../internal";

export default function updateObject(interaction: Interaction, interactionData: InteractionData) {

    // Unmark as deleted
    if (interaction.deleted) interaction._unmarkAsDeleted();

    // Set data
    interaction.id = interactionData.id;
    interaction.type = interactionData.type;
    interaction.token = interactionData.token;
    interaction.applicationID = interactionData.applicationID;
    interaction.data = interactionData.data;
    interaction.guildID = interactionData.guildID;
    interaction.channelID = interactionData.channelID;
    interaction.member = interactionData.member;
    interaction.permissions = interactionData.permissions;
    interaction.user = interactionData.user;
}