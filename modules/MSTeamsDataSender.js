const axios = require("axios");

const environment = require("./environment");

const service = {
    sendMessage: (message) => {
        let msTeamsConfig = environment.readEnvironmentVariable("MSTEAMS_ENV");

        let data = {
            "text": message + ". Enviado por " + msTeamsConfig.Sender
        };

        axios.post(msTeamsConfig.Webhook, data, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
};

module.exports = service;