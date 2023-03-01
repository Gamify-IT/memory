const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: "/minigames/memory",
  transpileDependencies: true,
  devServer: {
    port: 8000
  }
});