# Microsoft Silver Lining Chatbot Challenge

Here you can find the Bot Framework Composer project folder create during the Hackathon, and also the source code for the web service used by the bot itself to gather real data.

## Where can I try it?

We've deployed our bot to Microsoft Teams, and you can find it here:

[![Bot on Teams](https://lh3.googleusercontent.com/jKU64njy8urP89V1O63eJxMtvWjDGETPlHVIhDv9WZAYzsSxRWyWZkUlBJZj_HbkHA=s180)](https://teams.microsoft.com/l/chat/0/0?users=28:f3defb1e-38a1-4cec-b937-92d1c6d6bb8d)


## What does this bot do?

This bot helps its users to plan travels across Europe during the COVID19. Specifically, it checks if borders are open, if you need to wear masks or adopt a specific security behaviour in your destination country.

You can use the bot in two ways:

- Quick Menu: this mode allows you to get quick answers to specific questions;
- Personalized Guide: this mode starts a dialogue with the bot, who will ask for more questions and then summarizes the important information you need to know;

## Technologies

We build the bot using the graphical programming interface provided by the Bot Framework Composer, and we integrated the bot with our web service, accessible via HTTP. Our web service is written in JavaScript and it's published on Cloudflare workers.

## Where do we get the data from?

We collect the data from differente sources. The main ones are:

- [Re-open EU](https://reopen.europa.eu): this website provides informations about borders, documents and restrictions;
- [COVID19 API](https://covid19api.com): from here we collect and compare the number of cases of infections;
- [Travel Advisory](https://www.travel-advisory.info/data-api): to provide a score of danger of the destination country.
