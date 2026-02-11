import { relations, sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/pg-core';

export const createdAt = t
  .timestamp('created_at', { withTimezone: true, mode: 'date' })
  .notNull()
  .defaultNow();

export const updatedAt = t
  .timestamp('updated_at', { withTimezone: true, mode: 'date' })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

export const userRoles = t.pgEnum('userRole', ['admin', 'customer']);

export const paymentStatus = t.pgEnum('paymentStatus', [
  'pending',
  'paid',
  'cancelled',
]);

export const bookingStatus = t.pgEnum('bookingStatus', [
  'confirmed',
  'pending',
  'cancelled',
]);

export const UserTable = t.pgTable('users', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  name: t.varchar('name', { length: 255 }).notNull(),
  email: t.varchar('email', { length: 255 }).notNull(),
  clerkUserId: t.varchar('clerk_user_id', { length: 255 }).notNull().unique(),
  imageUrl: t.varchar('image_url', { length: 255 }),
  role: userRoles('role').default('customer').notNull(),
  isActive: t.boolean('is_active').default(true).notNull(),
  createdAt,
  updatedAt,
});

export const VanTable = t.pgTable('vans', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  name: t.varchar('name', { length: 255 }).notNull(),
  sanityId: t.varchar('sanity_id', { length: 255 }).notNull().unique(),
  sanitySlug: t.varchar('sanity_slug', { length: 255 }).notNull(),
  pricePerDayInCents: t.integer('price_per_day_in_cents').notNull(),
  isAvailable: t.boolean('is_available').notNull().default(true),
  isDeleted: t.boolean('is_deleted').default(false),
  createdAt,
  updatedAt,
});

export const BookingTable = t.pgTable(
  'bookings',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    userId: t
      .uuid('user_id')
      .references(() => UserTable.id, { onDelete: 'cascade' })
      .notNull(),
    vanId: t
      .uuid('van_id')
      .references(() => VanTable.id, { onDelete: 'no action' })
      .notNull(),
    rentStart: t.timestamp('rent_start').notNull(),
    rentEnd: t.timestamp('rent_end').notNull(),
    pricePerDayInCentsSnapshot: t
      .integer('price_per_day_in_cents_snapshot')
      .notNull(),
    stripeCheckoutSessionId: t.varchar('stripe_checkout_session_id'),
    paymentStatus: paymentStatus('payment_status').notNull().default('pending'),
    bookingStatus: bookingStatus('booking_status').notNull().default('pending'),
    totalPriceInCents: t.integer('total_price_in_cents').notNull(),
    createdAt,
    updatedAt,
  },
  (table) => [
    t.check('date_check', sql`${table.rentEnd} > ${table.rentStart}`),
  ],
);

export const AddressTable = t.pgTable('addresses', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  userId: t
    .uuid('user_id')
    .references(() => UserTable.id, { onDelete: 'cascade' })
    .notNull()
    .unique(),
  address1: t.varchar('address1', { length: 255 }).notNull(),
  address2: t.varchar('address2', { length: 255 }),
  city: t.varchar('city', { length: 255 }).notNull(),
  zip: t.varchar('zip', { length: 255 }).notNull(),
  state: t.varchar('state', { length: 255 }).notNull(),
  country: t.varchar('country', { length: 255 }).notNull(),
  createdAt,
  updatedAt,
});

export const ReviewTable = t.pgTable('reviews', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  userId: t
    .uuid('user_id')
    .references(() => UserTable.id, { onDelete: 'cascade' })
    .notNull(),
  vanId: t
    .uuid('van_id')
    .references(() => VanTable.id, { onDelete: 'no action' })
    .notNull(),
  reviewAt: t
    .timestamp('review_at', { withTimezone: true, mode: 'date' })
    .notNull()
    .defaultNow(),
  title: t.varchar('title', { length: 255 }).notNull(),
  body: t.text('body').notNull(),
  createdAt,
  updatedAt,
});

export const NewsletterSubscriptionTable = t.pgTable(
  'newsletter_subscriptions',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    email: t.varchar('email', { length: 255 }).notNull().unique(),
    createdAt,
    updatedAt,
  },
);

export const ContactTable = t.pgTable('contacts', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  name: t.varchar('name', { length: 255 }).notNull(),
  email: t.varchar('email', { length: 255 }).notNull(),
  phone: t.varchar('phone', { length: 255 }).notNull(),
  subject: t.text('subject').notNull(),
  message: t.text('message').notNull(),
  createdAt,
  updatedAt,
});

// Relations
export const UserTableRelations = relations(UserTable, ({ one, many }) => ({
  address: one(AddressTable),
  bookings: many(BookingTable),
  reviews: many(ReviewTable),
}));

export const VanTableRelations = relations(VanTable, ({ many }) => ({
  bookings: many(BookingTable),
  reviews: many(ReviewTable),
}));

export const AddressTableRelations = relations(AddressTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [AddressTable.userId],
    references: [UserTable.id],
  }),
}));

export const BookingTableRelations = relations(BookingTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [BookingTable.userId],
    references: [UserTable.id],
  }),
  van: one(VanTable, {
    fields: [BookingTable.vanId],
    references: [VanTable.id],
  }),
}));

export const ReviewTableRelations = relations(ReviewTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [ReviewTable.userId],
    references: [UserTable.id],
  }),
  van: one(VanTable, {
    fields: [ReviewTable.vanId],
    references: [VanTable.id],
  }),
}));
