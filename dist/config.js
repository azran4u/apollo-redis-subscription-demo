"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.READ_REPLICA_1_DB_CONFIG = exports.PRIMARY_DB_CONFIG = void 0;
const COMMON_DB_CONFIG = {
    user: "eyala@live-query-poc",
    host: "",
    database: "live_query_poc",
    password: "aA123456",
    port: 5432,
};
exports.PRIMARY_DB_CONFIG = Object.assign(Object.assign({}, COMMON_DB_CONFIG), { host: "live-query-poc.postgres.database.azure.com" || process.env.PRIMARY_DB_HOST });
exports.READ_REPLICA_1_DB_CONFIG = Object.assign(Object.assign({}, COMMON_DB_CONFIG), { host: "live-query-poc.postgres.database.azure.com" ||
        process.env.READ_REPLICA_1_DB_HOST });
//# sourceMappingURL=config.js.map