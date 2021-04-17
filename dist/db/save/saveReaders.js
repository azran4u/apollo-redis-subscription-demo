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
exports.saveReaders = void 0;
const injector_1 = require("../../utils/injector");
const utils_1 = require("../../utils");
const connection_1 = require("../connection");
function saveReaders(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = injector_1.Injector.getInstance()
            .getService(connection_1.Database)
            .getClient();
        const queryText = `
      insert into schema1.reader(id, name, when_read) VALUES($1, $2, $3)
        on conflict ON CONSTRAINT readerIdPrimaryKey DO UPDATE
           SET id = EXCLUDED.id, name = EXCLUDED.name, when_read = EXCLUDED.when_read
      `;
        try {
            yield client.query("BEGIN");
            for (const reader of data.values()) {
                yield client.query(queryText, [reader.id, reader.name, reader.whenRead]);
            }
            yield client.query("COMMIT");
        }
        catch (error) {
            yield client.query("ROLLBACK");
            utils_1.logger.error(`saveReaders failed ${error}`);
            throw error;
        }
    });
}
exports.saveReaders = saveReaders;
//# sourceMappingURL=saveReaders.js.map