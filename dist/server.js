"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const app_1 = require("./app");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const PORT = 8080;
    const { httpServer, apolloServer } = yield app_1.startExpressServer();
    httpServer.listen(PORT, () => {
        utils_1.logger.info(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
        utils_1.logger.info(`🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`);
    });
}))();
//# sourceMappingURL=server.js.map