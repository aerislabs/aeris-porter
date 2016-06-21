import {Model} from 'objection';
import Profile from './Profile';
import Group from './Group';
import Role from './Role';

class User extends Model {

  static tableName = 'User';

  static jsonSchema = {
    'id': { type: 'integer' },
    'uuid': { type: 'uuid' },
    'name': { type: 'string' },
    'email': { type: 'email' },
    'hash': { type: 'string' },
    'hash_type': { type: 'integer' },
    'active': { type: 'boolean' },
    'banned': { type: 'boolean' },
    'data': {
      type: 'object',
      properties: {
      }
    },
    'created_at': { type: 'date-time' },
    'updated_at': { type: 'date-time' }
  }

  static relationMappings = {
    profiles: {
      relation: Model.HasManyRelation,
      modelClass: Profile,
      join: {
        from: 'User.id',
        to: 'Profile.owner_id'
      }
    },
    groups: {
      relation: Model.ManyToManyRelation,
      modelClass: Group,
      join: {
        from: 'User.id',
        through: {
          from: 'User_Group.user_id',
          to: 'User_Group.group_id'
        },
        to: 'Group.id'
      }
    },
    roles: {
      relation: Model.ManyToManyRelation,
      modelClass: Role,
      join: {
        from: 'User.id',
        through: {
          from: 'User_Role.user_id',
          to: 'User_Role.role_id'
        },
        to: 'Role.id'
      }
    }
  }

}

export default User;
