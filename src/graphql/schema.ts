import { mergeSchemas } from 'graphql-tools';
import { counterSchema } from '../entities/counter/schema/counter.schema';
import { userSchema } from '../entities/blog/user/schema/user.schema';
import { postSchema } from '../entities/blog/post/schema/post.schema';

const schemas = mergeSchemas({
  schemas: [userSchema, counterSchema, postSchema],
});

export default schemas;
