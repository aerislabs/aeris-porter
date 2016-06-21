import {Model} from 'objection';
import User from './Profile';

class Invitation extends Model {

  static tableName = "Invitation";

  static jsonSchema = {
    'id': { type: 'integer' },
    'code': { type: 'string' },
    'claimed': { type: 'boolean' },
    'data': {
      type: 'object',
      properties: {
      }
    },
    'created_at': { type: 'date-time' },
    'updated_at': { type: 'date-time' }
  }

  static relationMappings = {
    created_by: {
      relation: Model.HasManyRelation,
      modelClass: User,
      join: {
        from: 'Invitation.created_by',
        to: 'User.id'
      }
    },
    claimed_by: {
      relation: Model.HasManyRelation,
      modelClass: User,
      join: {
        from: 'Invitation.claimed_by',
        to: 'User.id'
      }
    }
  }

}

export default Invitation;
