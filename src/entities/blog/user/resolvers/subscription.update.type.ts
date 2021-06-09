import { AgeRange } from '../../../../model/ageRange';
import { Ids, UserWithAgeUpdate } from '../user.model';

export interface UsersChangesSubscriptionPayload {
  usersChanges: {
    updated: UserWithAgeUpdate[];
    deleted: UserWithAgeUpdate[];
  };
}

export interface UsersChangesSubscriptionFilter {
  filter: { ids: Ids; age: AgeRange };
}
