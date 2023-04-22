let config = {
    "mongodb" : {
        "username" : process.env.MONGODB_USERNAME,
        "password" : process.env.MONGODB_PASSWORD,
        "hostname" : process.env.MONGODB_CLUSTER_HOSTNAME
    }
}

module.exports = config;