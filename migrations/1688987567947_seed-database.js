/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createExtension('uuid-ossp', { ifNotExists: true });

  pgm.createType('membership_type', ['Premium', 'Normal'], {
    ifNotExists: true,
  });

  pgm.createTable('user', {
    user_id: {
      type: 'uuid',
      notNull: true,
      default: pgm.func('uuid_generate_v4()'),
      primaryKey: true,
    },
    username: { type: 'varchar(255)', notNull: true },
    password: { type: 'varchar(255)', notNull: true },
    email: { type: 'varchar(255)', notNull: true },
    fullname: { type: 'varchar(255)', notNull: true },
    membership: { type: 'membership_type', notNull: true },
    refresh_token: { type: 'varchar(1000)', notNull: false },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: false,
    },
  });

  pgm.createTable('category', {
    category_id: {
      type: 'uuid',
      notNull: true,
      default: pgm.func('uuid_generate_v4()'),
      primaryKey: true,
    },
    name: { type: 'varchar(255)', notNull: true },
    description: { type: 'varchar(1000)', notNull: true },
    activated: { type: 'boolean', notNull: true },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: false,
    },
  });

  pgm.createType('post_status', ['Draft', 'Published', 'Pending Review'], {
    ifNotExists: true,
  });
  pgm.createType('post_label', ['Premium', 'Normal'], { ifNotExists: true });

  pgm.createTable('post', {
    post_id: {
      type: 'uuid',
      notNull: true,
      default: pgm.func('uuid_generate_v4()'),
      primaryKey: true,
    },
    category_id: {
      type: 'uuid',
      notNull: true,
      references: 'category',
      onDelete: 'cascade',
    },
    title: { type: 'varchar(255)', notNull: true },
    body: { type: 'varchar(1000)', notNull: true },
    status: {
      type: 'post_status',
      notNull: true,
    },
    label: { type: 'post_label', notNull: true },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: false,
    },
  });

  pgm.createTable('payment', {
    payment_id: {
      type: 'varchar(100)',
      notNull: true,
      primaryKey: true,
    },
    user_id: {
      type: 'uuid',
      notNull: true,
      references: 'user',
      onDelete: 'cascade',
    },
    amount: { type: 'double', notNull: true },
    payment_method: { type: 'varchar(50)', notNull: true },
    status: { type: 'varchar(50)', notNull: true },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: false,
    },
  });
};

exports.down = (pgm) => {};
