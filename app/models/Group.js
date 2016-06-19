import {Model} from 'objection';
import User from './Profile';

class Group extends Model {

  static tableName = 'Group';

  static jsonSchema = {
    'id': { type: 'integer' },
    'visible': { type: 'boolean' },
    'data': {
      type: 'object',
      properties: {
      }
    },
    'created_at': { type: 'date-time' },
    'updated_at': { type: 'date-time' }
  }

  static relationMappings = {
    owner: {
      relation: Model.HasManyRelation,
      modelClass: User,
      join: {
        from: 'Group.owner_id',
        to: 'User.id'
      }
    },
    users: {
      relation: Model.ManyToManyRelation,
      modelClass: User,
      join: {
        from: 'Group.id',
        through: {
          from: 'User_Group.group_id',
          to: 'User_Group.user_id'
        },
        to: 'User.id'
      }
    }
  }

}

export default Group;
