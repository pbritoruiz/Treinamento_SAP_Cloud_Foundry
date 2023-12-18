const cfenv = require("cfenv");
const axios = require("axios");

const cfEnvFile = require("../config/CF_ENV.json");

const service = {
    configure: () => {
        service.appEnv = cfenv.getAppEnv();
        service.cfServices = service.appEnv.getServices();

        service.destinationService = service.appEnv.getService("NotificationProcessingService-dest");
        service.connectivityService = service.appEnv.getService("NotificationProcessingService-conn");

        service.clientId = service.destinationService.credentials.clientid;
        service.clientSecret = service.destinationService.credentials.clientsecret;
    },
    getDestination: async (destinationName) => {
        let accessToken = await service.getAccessToken(service.destinationService.credentials.url,
                                                       service.clientId,
                                                       service.clientSecret);

        let destination = await service.getDestinationConfiguration(destinationName, accessToken);

        return destination;
    },
    getAccessToken: async (url, clientId, clientSecret) => {
        let response = await axios.get(url + "/oauth/token", 
        {
            params: {
                "response_type": "token",
                "grant_type": "client_credentials"
            },
            auth: {
                "username": clientId,
                "password": clientSecret
            }
        });

        return response.data.access_token;
    },
    getDestinationConfiguration: async (destinationName, accessToken) => {
        let response = await axios.get(service.destinationService.credentials.uri + 
                                        "/destination-configuration/v1/destinations/" + destinationName, {
                                            "headers": {
                                                "Authorization": "Bearer " + accessToken
                                            }
                                        });

        return response.data;
    }
};

module.exports = service;