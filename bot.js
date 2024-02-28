const { ActivityHandler, MessageFactory } = require('botbuilder');

class EchoBot extends ActivityHandler {
    constructor() {
        super();

        function simulateClick(c, i) {
            const event = new MouseEvent("click", {
              view: window,
              bubbles: true,
              cancelable: true,
            });
            if ( i != null){
                const cb = document.getElementById(i);
            } else if (c != null){
                const cb = document.getElementsByClassName(c);
            }
            const cancelled = !cb.dispatchEvent(event);
        }

        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            if (context.activity.text = "hellowork"){
                Window.open("https://www.hellowork.com/fr-fr/")
                simulateClick("sm:tw-ml-4", null);
                const replyText = `click reussie`;

            } else {
                const replyText = `Echo: ${ context.activity.text }`;
                await context.sendActivity(MessageFactory.text(replyText, replyText));
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            const welcomeText = 'Hello and welcome!';
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.EchoBot = EchoBot;
  