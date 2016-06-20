exports.up = function(knex, Promise) {

  return createUserTable()
    .then(createProfileTable)
    .then(createGroupTable)
    .then(createUserGroupTable)
    .then(createRoleTable)
    .then(createUserRoleTable)
    .then(createInvitationTable);

  /**
   * Creates an initial Users table.
   * @return {void}
   */
  function createUserTable() {
    return knex.schema.createTable('User', (table) => {
      table.bigIncrements('id').primary().unsigned().comment('User ID');
      table.uuid('uuid').comment('UUID for each user.');
      table.string('name').comment('Account Name.');
      table.string('email').comment('Email address.');
      table.string('hash').comment('Password Hash.');
      table.string('hash_type').defaultTo(1).comment('Password Hash Type (for migrations).');
      table.boolean('active').defaultTo(false).comment('Whether or not a user is active.');
      table.boolean('banned').defaultTo(false).comment('Whether or not a user is banned.');
      table.jsonb('data').comment('Other user metadata (prefs, etc).');
      table.timestamps();
    })
  };

  /**
   * Creates an initial Profiles table.
   * @return {void}
   */
  function createProfileTable() {
    return knex.schema.createTable('Profile', (table) => {
      table.bigIncrements('id').primary().unsigned().comment('Profile ID.');
      table.string('name').comment('Profile Name.');
      table.boolean('visible').defaultTo(false).comment('Whether or not this profile is visible to other users.');
      table.bigInteger('owner_id').unsigned().index().references('id').inTable('User').comment('The User who owns this profile.');
      table.jsonb('data').comment('Profile metadata and fields.');
      table.timestamps();
    })
  };

  /**
   * Creates an initial Groups table.
   * @return {void}
   */
  function createGroupTable() {
    return knex.schema.createTable('Group', (table) => {
      table.bigIncrements('id').primary().unsigned().comment('Group ID.');
      table.boolean('visible').defaultTo(false).comment('Whether or not this group is visible to other users.');
      table.bigInteger('owner_id').unsigned().index().references('id').inTable('User').comment('The User who owns this group.');
      table.jsonb('data').comment('Group metadata and fields.');
      table.timestamps();
    })
  };

  /**
   * Creates an initial Users<=>Groups table.
   * @return {void}
   */
  function createUserGroupTable() {
    return knex.schema.createTable('User_Group', (table) => {
      table.bigIncrements('id').primary().unsigned();
      table.bigInteger('user_id').unsigned().index().references('id').inTable('User').comment('User.');
      table.bigInteger('group_id').unsigned().index().references('id').inTable('Group').comment('Group.');
      table.timestamps();
    });
  };

  /**
   * Creates an initial Roles table.
   * @return {void}
   */
  function createRoleTable() {
    return knex.schema.createTable('Role', (table) => {
      table.bigIncrements('id').primary().unsigned().comment('Role ID.');
      table.string('role').comment('What this role entails.');
      table.integer('level').comment('The level to which this role applies.');
      table.jsonb('data').comment('Role data.');
    })
  };

  /**
   * Creates an initial Users<=>Roles table.
   * @return {void}
   */
  function createUserRoleTable() {
    return knex.schema.createTable('User_Role', (table) => {
      table.bigIncrements('id').primary().unsigned();
      table.bigInteger('user_id').unsigned().index().references('id').inTable('User').comment('User.');
      table.bigInteger('role_id').unsigned().index().references('id').inTable('Role').comment('Role.');
      table.timestamps();
    });
  };

  /**
   * Creates an initial Invitations table.
   * @return {void}
   */
  function createInvitationTable() {
    return knex.schema.createTable('Invitation', (table) => {
      table.bigIncrements('id').primary().unsigned().comment('Invitation ID.');
      table.string('code').comment('Invitation code.');
      table.boolean('claimed').defaultTo(false).comment('Whether or not this invitation has been claimed.');
      table.bigInteger('created_by').unsigned().index().references('id').inTable('User');
      table.bigInteger('claimed_by').unsigned().index().references('id').inTable('User');
      table.jsonb('data').comment('Invitation metadata.');
      table.timestamps();
    })
  };

};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('Profile')
    .dropTableIfExists('Invitation')
    .dropTableIfExists('User_Role')
    .dropTableIfExists('Role')
    .dropTableIfExists('User_Group')
    .dropTableIfExists('Group')
    .dropTableIfExists('User')
};
