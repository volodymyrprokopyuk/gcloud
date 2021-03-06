import {createServer, plugins} from "restify";
import {formatHtml} from "util/formatter";
import {closeServer} from "util/middleware";
import {addHomeRoute} from "route/home/util/routing";

const serverConfg = {formatters: {"text/html": formatHtml("view")}};

const server = createServer(serverConfg);

server.use(plugins.queryParser());
server.use(plugins.bodyParser());

addHomeRoute(server, "");

process.on("SIGTERM", closeServer(server));

server.listen(process.env.IDP_PORT, () => console.log(`Listening on ${server.url}`));
