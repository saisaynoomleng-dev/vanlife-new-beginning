import { defineField, defineType } from 'sanity';
import { FaShuttleVan } from 'react-icons/fa';
import { formatCurrency, formatTitle } from '@/lib/formatter';

export const vanType = defineType({
  name: 'van',
  title: 'Vans',
  icon: FaShuttleVan,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Van Name',
      type: 'string',
      validation: (rule) =>
        rule
          .required()
          .min(10)
          .info(`Van Name must have at least 10 characters`),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (rule) =>
        rule.required().info(`Required to genearate a page on the website`),
    }),
    defineField({
      name: 'type',
      title: 'Van Type',
      type: 'string',
      options: {
        list: [
          { title: 'Simple', value: 'simple' },
          { title: 'Luxury', value: 'luxury' },
          { title: 'Rugged', value: 'rugged' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required().info(`Van type is required`),
    }),
    defineField({
      name: 'pricePerDay',
      title: 'Rent per Day',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Van Description',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Image',
      type: 'blockImage',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      price: 'pricePerDay',
      image: 'mainImage',
      type: 'type',
    },
    prepare({ name, price, image, type }) {
      const nameFormatted = name ? formatTitle(name) : 'Name not provided';
      const priceFormatted = price
        ? formatCurrency(price)
        : 'Price not provided';
      const typeFormatted = type ? formatTitle(type) : 'Type not provided';

      return {
        title: nameFormatted,
        subtitle: `Price: ${priceFormatted} | Type: ${typeFormatted}`,
        media: image || FaShuttleVan,
      };
    },
  },
});
