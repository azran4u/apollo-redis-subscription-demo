import { ApolloServer } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import { userSchema } from '../user/schema/user.schema';
import { UserController } from '../user/controller/user.controller';
import { User } from '../user/user.model';
import sinon from 'sinon';
import { expect } from 'chai';

function aUser(id: string): User {
  return {
    id,
    name: `name-${id}`,
  };
}

describe(`Grpahql API testing`, () => {
  const users: User[] = [aUser('1'), aUser('2')];
  let userControllerGetAllStub;

  beforeEach(function () {
    userControllerGetAllStub = sinon.stub(UserController, 'getAll');
  });

  afterEach(function () {
    userControllerGetAllStub.restore();
  });

  it('fetch all users', async () => {
    userControllerGetAllStub.returns(Promise.resolve(users));

    const server = new ApolloServer({
      schema: userSchema,
    });

    const { query } = createTestClient(server);

    const res = await query({ query: 'getAllUsers', variables: {} });

    expect(res).to.eq(users);
  });
});
