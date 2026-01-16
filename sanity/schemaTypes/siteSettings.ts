import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'Cranks Bike Shop',
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
          initialValue: '02 9417 3776',
        }),
        defineField({
          name: 'email',
          title: 'Email Address',
          type: 'string',
          initialValue: 'sales@cranks.com.au',
        }),
        defineField({
          name: 'address',
          title: 'Address',
          type: 'text',
          rows: 2,
          initialValue: '123 Bike Street\nSydney NSW 2000',
        }),
      ],
    }),
    defineField({
      name: 'businessHours',
      title: 'Business Hours',
      type: 'object',
      fields: [
        defineField({
          name: 'weekdays',
          title: 'Weekdays',
          type: 'string',
          initialValue: 'Mon-Fri: 9:00 AM - 6:00 PM',
        }),
        defineField({
          name: 'saturday',
          title: 'Saturday',
          type: 'string',
          initialValue: 'Sat: 9:00 AM - 5:00 PM',
        }),
        defineField({
          name: 'sunday',
          title: 'Sunday',
          type: 'string',
          initialValue: 'Sun: 10:00 AM - 4:00 PM',
        }),
      ],
    }),
    defineField({
      name: 'headerMessage',
      title: 'Header Message',
      type: 'string',
      description: 'Message shown in top header bar',
      initialValue: 'Free service within first 3 months',
    }),
    defineField({
      name: 'navigation',
      title: 'Main Navigation',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Menu Title',
              type: 'string',
            }),
            defineField({
              name: 'href',
              title: 'Link',
              type: 'string',
            }),
            defineField({
              name: 'hasDropdown',
              title: 'Has Dropdown',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'dropdownItems',
              title: 'Dropdown Items',
              type: 'array',
              hidden: ({ parent }) => !parent?.hasDropdown,
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Item Title',
                      type: 'string',
                    }),
                    defineField({
                      name: 'href',
                      title: 'Link',
                      type: 'string',
                    }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
      initialValue: [
        { title: 'Shop', href: '/shop', hasDropdown: false },
        { 
          title: 'Bikes', 
          href: '/bikes', 
          hasDropdown: true,
          dropdownItems: [
            { title: 'Mountain Bikes', href: '/shop?category=Mountain%20Bikes' },
            { title: 'Road Bikes', href: '/shop?category=Road%20Bikes' },
            { title: 'E-Bikes', href: '/shop?category=E-Bikes' },
          ]
        },
        { 
          title: 'Parts', 
          href: '/parts', 
          hasDropdown: true,
          dropdownItems: [
            { title: 'Drivetrain', href: '/shop?category=Drivetrain' },
            { title: 'Brakes', href: '/shop?category=Brakes' },
            { title: 'Wheels', href: '/shop?category=Wheels' },
          ]
        },
        { 
          title: 'Accessories', 
          href: '/accessories', 
          hasDropdown: true,
          dropdownItems: [
            { title: 'Helmets', href: '/shop?category=Helmets' },
            { title: 'Clothing', href: '/shop?category=Clothing' },
            { title: 'Tools', href: '/shop?category=Tools' },
          ]
        },
        { title: 'Services', href: '/our-services', hasDropdown: false },
        { title: 'About', href: '/about-us', hasDropdown: false },
        { title: 'Contact', href: '/contact', hasDropdown: false },
      ],
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        defineField({
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter URL',
          type: 'url',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Site Settings',
        subtitle: 'Global site configuration',
      }
    },
  },
})