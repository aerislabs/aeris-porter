import {Model} from 'objection';

class Profile extends Model {

  static tableName = "Profile";

  static jsonSchema = {
    'id': { type: 'integer' },
    'name': { type: 'string' },
    'visible': { type: 'boolean' },
    'data': {
      type: 'object',
      properties: {
      }
    },
    'created_at': { type: 'date-time' },
    'updated_at': { type: 'date-time' }
  }


}

export default Profile;
