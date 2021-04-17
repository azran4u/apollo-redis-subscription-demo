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
exports.saveBookAuthorRelation = void 0;
const injector_1 = require("../../utils/injector");
const utils_1 = require("../../utils");
const connection_1 = require("../connection");
function saveBookAuthorRelation(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = injector_1.Injector.getInstance()
            .getService(connection_1.Database)
            .getClient();
        const queryText = `insert into schema1.book_author(author_id, book_id) VALUES($1, $2)
      on conflict ON CONSTRAINT book_author_pkey DO
            UPDATE
           SET author_id = EXCLUDED.author_id, book_id = EXCLUDED.book_id`;
        try {
            yield client.query("BEGIN");
            for (const book_author of data.values()) {
                yield client.query(queryText, [book_author.a, book_author.b]);
            }
            yield client.query("COMMIT");
        }
        catch (error) {
            yield client.query("ROLLBACK");
            utils_1.logger.error(`saveBookAuthorRelation failed ${error}`);
            throw error;
        }
    });
}
exports.saveBookAuthorRelation = saveBookAuthorRelation;
//# sourceMappingURL=saveBookAuthorRelation.js.map