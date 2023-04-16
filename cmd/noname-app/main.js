require("../../config/module-alias");
const app = require("@server/cmd/noname-app/app/root");

function main() {
  app.Execute();
}

main();
