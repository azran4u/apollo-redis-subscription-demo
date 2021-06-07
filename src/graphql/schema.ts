import { mergeSchemas } from 'graphql-tools';
import { counterSchema } from '../entities/counter/schema/counter.schema';
import { userSchema } from '../entities/blog/user/schema/user.schema';

const schemas = mergeSchemas({
  schemas: [userSchema, counterSchema],
});

export default schemas;
