const axios = require("axios");
const environment = require("./environment");
const cloudResourceService = require("./CloudResourceService");

const service = {
    getData: async (oDataServiceName, filter, top) => {
        let s4HANAConfig = environment.readEnvironmentVariable("S4HANA_ENV");
        let oDataService = s4HANAConfig.providers.oDataServices[oDataServiceName];

        cloudResourceService.configure();
        let destination = await cloudResourceService.getDestination(s4HANAConfig.destination);

        let data = await service.readData(s4HANAConfig, oDataServiceName, destination, filter, top);

        return data;
    },
    readData: async (s4HANAConfig, oDataServiceName, destination, filter, top) => {
        let url = destination.destinationConfiguration.URL +
                    s4HANAConfig.providers.oDataServices[oDataServiceName];

        let response = await axios.get(url, {
            headers: {  
                "Authorization": destination.authTokens[0].type + " " + destination.authTokens[0].value 
            },
            params: {
                "$filter": filter,
                "$top": top
            }
        });

        return response.data.d.results;
    }
};

module.exports = service;