module.exports = {
  apps : [{
    name: "taekdondomanager",
    script: "./src/server.js",
    instances: "taekdondomanager",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}