
const textPrompt = async function (msg, responderIds, defaultResponse) {

    try {
        //filters valid responses - ones from the target user
        const filter = response => {
            return responderIds.includes(response.author.id);
        };
        //listen to messages until one passes the filter
        const validResponse = await msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] });
        //return qualifying message content
        const content = validResponse.first().content;
        //return content, or default if content is . or "
        return (content==`"`)?defaultResponse:content;
    } catch (e) {
        console.error(e);
        return defaultResponse;
    }
}

module.exports = textPrompt;