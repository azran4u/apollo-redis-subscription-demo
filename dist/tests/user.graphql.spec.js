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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_testing_1 = require("apollo-server-testing");
const user_controller_1 = require("../user/controller/user.controller");
const sinon_1 = __importDefault(require("sinon"));
const chai_1 = require("chai");
const apolloServer_1 = require("../graphql/apolloServer");
function aUser(id) {
    return {
        id,
        name: `name-${id}`,
    };
}
describe(`Grpahql API testing`, () => {
    const users = [aUser('1'), aUser('2')];
    beforeEach(function () { });
    afterEach(function () { });
    it('fetch all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const userControllerGetAllStub = sinon_1.default.stub(user_controller_1.UserController, 'getAll');
        userControllerGetAllStub.returns(Promise.resolve(users));
        const { query } = apollo_server_testing_1.createTestClient(apolloServer_1.apolloServer);
        const GET_ALL_USERS = apollo_server_express_1.gql `
      query q1 {
        getAllUsers {
          id
          name
        }
      }
    `;
        const res = yield query({ query: GET_ALL_USERS, variables: {} });
        chai_1.expect(res.data.getAllUsers).to.eql(users);
        chai_1.expect(userControllerGetAllStub.calledOnce).to.be.true;
        userControllerGetAllStub.restore();
    }));
    it('create user', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = aUser('1');
        const userControllerAddUserStub = sinon_1.default.stub(user_controller_1.UserController, 'create');
        userControllerAddUserStub.returns(Promise.resolve(mockUser));
        const { query } = apollo_server_testing_1.createTestClient(apolloServer_1.apolloServer);
        const ADD_USER = apollo_server_express_1.gql `
      mutation m1($name: String!) {
        addUser(name: $name) {
          id
          name
        }
      }
    `;
        const res = yield query({
            query: ADD_USER,
            variables: { name: mockUser.name },
        });
        chai_1.expect(res.data.addUser).to.eql(mockUser);
        chai_1.expect(userControllerAddUserStub.calledOnce).to.be.true;
        userControllerAddUserStub.restore();
    }));
});
//# sourceMappingURL=user.graphql.spec.js.map