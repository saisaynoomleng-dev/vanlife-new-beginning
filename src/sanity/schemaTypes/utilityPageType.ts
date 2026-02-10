import { defineField, defineType } from 'sanity';
import { BsCardText } from 'react-icons/bs';

export const utilityPageType = defineType({
  name: 'utilityPage',
  title: 'Utility Pages',
  icon: BsCardText,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Page Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Page Text',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
  ],
});
