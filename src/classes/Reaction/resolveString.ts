import { Emoji, Reaction, ReactionEmojiResolvable } from "../../internal";

export default function resolveString(reactionEmojiResolvable: ReactionEmojiResolvable): string {

    // Reaction
    if (reactionEmojiResolvable instanceof Reaction) return reactionEmojiResolvable.emoji.id ? `${reactionEmojiResolvable.emoji.name}:${reactionEmojiResolvable.emoji.id}` : (reactionEmojiResolvable.emoji.name as string);

    // Emoji
    else if (reactionEmojiResolvable instanceof Emoji) return `${reactionEmojiResolvable.name}:${reactionEmojiResolvable.id}`;

    // Emoji string
    else return reactionEmojiResolvable;
}