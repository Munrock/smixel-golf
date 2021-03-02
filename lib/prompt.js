
const textPrompt = async function (msg, responderIds, defaultResponse) {

    try {
        //filters valid responses - ones from the target user
        const filter = response => {
            return responderIds.includes(response.author.id);
        };
        //listen to messages until one passes the filter
        const validResponse = await msg.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] });
        //return qualifying message content
        return validResponse.first().content;
    } catch (e) {
        console.error(e);
        return defaultResponse;
    }
}

module.exports = textPrompt;