const s4HANADataReader = require("./S4HANADataReader");
const msTeamsSender = require("./MSTeamsDataSender");

service = {
    execute: async () => {
        console.log("Lendo dados do S/4HANA");
        let data = await s4HANADataReader.getData("SalesOrderSet", "LifecycleStatus eq 'P'", 5);

        if (data.length == 0)
            console.log("Nenhuma Ordem em Processamento encontrada.");
        else {
            console.log("Enviando " + data.length + " Notificações de Ordens em Processamento");

            for (let i in data) {
                let record = data[i];

                let message = "Ordem de Venda [" + record["SalesOrderID"] + 
                                "] do cliente [" + record["CustomerName"] +
                                "] no valor de [" + record["GrossAmount"] +
                                "] continua em Processamento";

                msTeamsSender.sendMessage(message);
            }
        }
    }
};

module.exports = service;