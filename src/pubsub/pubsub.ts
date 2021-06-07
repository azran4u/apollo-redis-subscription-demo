import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';
import { User } from '../entities/blog/user/user.model';

export const pubsub = new RedisPubSub({
  publisher: new Redis(),
  subscriber: new Redis(),
  reviver,
});

function reviver(key, value): any {
  if (key === 'userAdded') {
    const user: User = value;
    user.age += 0;
    return user;
  }
  return value;
}
