"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userType = void 0;
const apollo_server_1 = require("apollo-server");
const userType = apollo_server_1.gql `
	type User {
		id: String
		name: String
	}
`;
exports.userType = userType;
//# sourceMappingURL=user.type.js.map