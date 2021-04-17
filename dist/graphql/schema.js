"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const counter_schema_1 = require("../counter/schema/counter.schema");
const user_schema_1 = require("../user/schema/user.schema");
const schemas = graphql_tools_1.mergeSchemas({
    schemas: [user_schema_1.userSchema, counter_schema_1.counterSchema],
});
exports.default = schemas;
//# sourceMappingURL=schema.js.map