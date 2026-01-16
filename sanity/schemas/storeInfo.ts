import { defineField, defineType } from 'sanity'

export const storeInfo = defineType({
  name: 'storeInfo',
  title: 'Store Information',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Store Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        {
          name: 'street',
          title: 'Street Address',
          type: 'string',
        },
        {
          name: 'city',
          title: 'City',
          type: 'string',
        },
        {
          name: 'state',
          title: 'State/Province',
          type: 'string',
        },
        {
          name: 'postalCode',
          title: 'Postal Code',
          type: 'string',
        },
        {
          name: 'country',
          title: 'Country',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: Rule => Rule.email(),
    }),
    defineField({
      name: 'hours',
      title: 'Opening Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'day',
              title: 'Day',
              type: 'string',
              options: {
                list: [
                  { title: 'Monday', value: 'monday' },
                  { title: 'Tuesday', value: 'tuesday' },
                  { title: 'Wednesday', value: 'wednesday' },
                  { title: 'Thursday', value: 'thursday' },
                  { title: 'Friday', value: 'friday' },
                  { title: 'Saturday', value: 'saturday' },
                  { title: 'Sunday', value: 'sunday' },
                ],
              },
            },
            {
              name: 'open',
              title: 'Opening Time',
              type: 'string',
              description: 'e.g., "9:00 AM"',
            },
            {
              name: 'close',
              title: 'Closing Time',
              type: 'string',
              description: 'e.g., "6:00 PM"',
            },
            {
              name: 'closed',
              title: 'Closed',
              type: 'boolean',
              description: 'Check if store is closed this day',
            },
          ],
          preview: {
            select: {
              day: 'day',
              open: 'open',
              close: 'close',
              closed: 'closed',
            },
            prepare(selection) {
              const { day, open, close, closed } = selection
              const dayFormatted = day?.charAt(0).toUpperCase() + day?.slice(1)
              if (closed) {
                return {
                  title: `${dayFormatted}: Closed`,
                }
              }
              return {
                title: `${dayFormatted}: ${open} - ${close}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        },
        {
          name: 'twitter',
          title: 'Twitter URL',
          type: 'url',
        },
        {
          name: 'youtube',
          title: 'YouTube URL',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'additionalInfo',
      title: 'Additional Information',
      type: 'object',
      fields: [
        {
          name: 'freeShippingThreshold',
          title: 'Free Shipping Threshold',
          type: 'number',
          description: 'Minimum order amount for free shipping',
        },
        {
          name: 'clickAndCollect',
          title: 'Click & Collect Available',
          type: 'boolean',
          description: 'Whether click & collect service is available',
        },
        {
          name: 'bikeRepairs',
          title: 'Bike Repairs Available',
          type: 'boolean',
          description: 'Whether bike repair services are offered',
        },
        {
          name: 'specialMessage',
          title: 'Special Message',
          type: 'text',
          description: 'Special announcement or message to display on site',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'address.city',
    },
  },
})