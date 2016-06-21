import {Model} from 'objection';

class Role extends Model {

  static tableName = "Role";

  static jsonSchema = {
    'id': { type: 'integer' },
    'role': { type: 'string' },
    'level': { type: 'integer' },
    'data': {
      type: 'object',
      properties: {
      }
    },
    'created_at': { type: 'date-time' },
    'updated_at': { type: 'date-time' }
  }

}

export default Role;
