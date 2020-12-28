// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  // jest and cypress have conflicting types, like expect. Second tsconfig fixes that for VSCode, but there are type errors while compiling for e2e - so we need to replace the tsconfig
  // https://github.com/vuejs/vue-cli/issues/1350#issuecomment-532051326
  chainWebpack: config => {
    const options = JSON.parse(process.env.npm_config_argv).original;
    if (options.some(el => el.includes("e2e"))) {
      config.plugin("fork-ts-checker").tap(args => {
        if (args[0].typescript) {
          args[0].typescript.configFile = path.resolve(
            process.env.PWD,
            "./tests/e2e/tsconfig.json"
          );
        }
        return args;
      });
      if (options.some(el => el.includes("headless"))) {
        config.plugins.delete("fork-ts-checker");
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
            @import "@/scss/_variables.scss";
          `
      }
    }
  }
};
