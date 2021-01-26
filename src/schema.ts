import { mergeSchemas } from "graphql-tools";
import { counterSchema } from "./counter/schema/counter.schema";
import { userSchema } from "./user/schema/user.schema";

const schemas = mergeSchemas({
  schemas: [userSchema, counterSchema],
});

export default schemas;
