exports.up = function(knex, Promise) {

  return createUsersTable()
    .then(createProfilesTable)
    .then(createGroupsTable)
    .then(createUsersGroupsTable)
    .then(createRolesTable)
    .then(createInvitationsTable);

  /**
   * Creates an initial Users table.
   * @return {void}
   */
  function createUsersTable() {
    return knex.schema.createTable('Users', (table) => {
      table.bigIncrements('id').primary().unsigned().comment('User ID');
      table.uuid('uuid').comment('UUID for each user.');
      table.string('email').comment('Email address');
      table.string('hash').comment('Password Hash');
      table.string('hash_type').defaultTo(1).comment('Password Hash Type (for migrations)');
      table.boolean('active').defaultTo(false).comment('Whether or not a user is active');
      table.boolean('banned').defaultTo(false).comment('Whether or not a user is banned');
      table.jsonb('metadata').comment('Other user metadata (prefs, etc).');
      table.timestamps();
    })
  };

  /**
   * Creates an initial Profiles table.
   * @return {void}
   */
  function createProfilesTable() {
    return knex.schema.createTable('Profiles', (table) => {
      table.bigIncrements('id').primary().unsigned().comment('Profile ID.');
      table.boolean('visible').defaultTo(false).comment('Whether or not this profile is visible to other users.');
      table.bigInteger('owner_id').unsigned().index().references('id').inTable('Users').comment('The User who owns this profile.');
      table.jsonb('metadata').comment('Profile metadata and fields.');
      table.timestamps();
    })
  };

  /**
   * Creates an initial Groups table.
   * @return {void}
   */
  function createGroupsTable() {
    return knex.schema.createTable('Groups', (table) => {
      table.bigIncrements('id').primary().unsigned().comment('Group ID.');
      table.boolean('visible').defaultTo(false).comment('Whether or not this group is visible to other users.');
      table.bigInteger('owner_id').unsigned().index().references('id').inTable('Users').comment('The User who owns this group.');
      table.jsonb('metadata').comment('Group metadata and fields.');
      table.timestamps();
    })
  };

  /**
   * Creates an initial Users<=>Groups table.
   * @return {void}
   */
  function createUsersGroupsTable() {
    return knex.schema.createTable('Users_Groups', (table) => {
      table.bigIncrements('id').primary().unsigned().comment('Group ID.');
      table.bigInteger('group_id').unsigned().index().references('id').inTable('Groups').comment('Group.');
      table.bigInteger('user_id').unsigned().index().references('id').inTable('Users').comment('User.');
    });
  };

  /**
   * Creates an initial Roles table.
   * @return {void}
   */
  function createRolesTable() {
    return knex.schema.createTable('Roles', (table) => {
      table.bigIncrements('id').primary().unsigned().comment('Role ID.');
      table.string('role').comment('What this role entails.');
      table.integer('level').comment('The level to which this role applies.');
    })
  };

  /**
   * Creates an initial Invitations table.
   * @return {void}
   */
  function createInvitationsTable() {
    return knex.schema.createTable('Invitations', (table) => {
      table.bigIncrements('id').primary().unsigned().comment('Invitation ID.');
      table.uuid('code').comment('Invitation code.');
      table.boolean('claimed').defaultTo(false).comment('Whether or not this invitation has been claimed.');
      table.bigInteger('created_by').unsigned().index().references('id').inTable('Users');
      table.bigInteger('claimed_by').unsigned().index().references('id').inTable('Users');
      table.jsonb('metadata').comment('Invitation metadata.');
      table.timestamps();
    })
  };

};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('Profiles')
    .dropTableIfExists('Roles')
    .dropTableIfExists('Invitations')
    .dropTableIfExists('Users_Groups')
    .dropTableIfExists('Groups')
    .dropTableIfExists('Users')
};
