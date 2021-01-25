import { counterResolver } from "./counter/resolvers/counter.resolver";
import { userResolver } from "./user/resolvers/user.resolver";

const resolvers = [userResolver, counterResolver];

export default resolvers;
