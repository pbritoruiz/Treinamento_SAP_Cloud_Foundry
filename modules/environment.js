const fs = require("fs");

service = {
    readEnvironmentVariable: (envVar) => {
        let value = process.env[envVar];

        if (!value)
            value = fs.readFileSync("./config/" + envVar + ".json");

        return JSON.parse(value);
    }
};

module.exports = service;