const BASE_SITE_URL = 'https://www.forearmworldwide.com/';

require('dotenv').config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    title: `Himanshu Dhar Title`,
    // eslint-disable-next-line max-len
    description: `Himanshu Dhar Description`,
    author: {
      name: 'Himanshu Dhar',
    },
    organization: {
      name: 'Forearm Worldwide',
      url: BASE_SITE_URL,
      logo:
        'https://res.cloudinary.com/dharhim/image/upload/v1617608620/forearm_tjdqfp.jpg',
    },
    seo: {
      title: `Himanshu Dhar title`,
      description: `Himanshu Dhar descrtiption`,
      image:
        'https://res.cloudinary.com/dharhim/image/upload/v1617608620/forearm_tjdqfp.jpg',
    },
    social: {
      twitter: 'cloudhar',
      fbAppID: 'RebuildingBlack',
      instagram: 'himalayanporter',
      github: 'https://github.com/',
      contact: 'himanshu.dhar@gmail.com',
      bugs: 'himanshu.dhar@gmail.com',
      image:
        'https://res.cloudinary.com/dharhim/image/upload/v1617608620/forearm_tjdqfp.jpg',
    },
    logo: {
      src: '#',
      alt: 'Rebuild Black Business',
    },
    image: 'https://res.cloudinary.com/dharhim/image/arm_tjdqfp.jpg',
    logoText: 'Himanshu111 ',
    siteUrl: BASE_SITE_URL,
    menuLinks: [
      {
        name: 'About',
        slug: '/about',
      },
      {
        name: 'Watch',
        slug: '/watch',
      },
      {
        name: 'Businesses',
        slug: '/businesses',
      },
      {
        name: 'NGOs',
        slug: '/allies',
      },
      {
        name: 'Volunteers',
        slug: '/fundraisers',
      },
    ],
    photoCreditLinks: [
      {
        photographer: 'Himanshu Dhar',
        url: 'https://www.instagram.com/himalayanporter',
        pagePathname: '/',
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Himanshu Dhar`,
        icon: `src/images/favicon.png`,
        short_name: `Himanshu Dhar`,
        start_url: `/`,
        background_color: `#f46036`, // theme orange
        theme_color: `#f46036`, // theme orange
        display: `standalone`,
      },
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.GATSBY_AIRTABLE_API_KEY, // pulls in from your .env file
        tables: [
          {
            baseId: process.env.GATSBY_AIRTABLE_BASE_ID, // note that this is not a secret, just an id
            tableName: `Businesses`,
            tableView: `Approved`, // optional
            queryName: `Businesses`,
            separateNodeType: true,
            separateMapType: true,
            defaultValues: {
              Business_Description: '',
              Donation_Link: '',
            },
          },
          {
            baseId: process.env.GATSBY_AIRTABLE_BASE_ID, // note that this is not a secret, just an id
            tableName: `Allies`,
            tableView: `Approved`, // optional
            queryName: `Allies`,
            separateNodeType: true,
            separateMapType: true,
            defaultValues: {
              First_Name: '',
              Last_Name: '',
              City: '',
              State: '',
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-chakra-ui',
      options: {
        isUsingColorMode: false,
        isResettingCSS: true,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: process.env.GOOGLE_ANALYTICS_PROPERTY_ID,
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Defers execution of google analytics script after page load
        defer: false,
      },
    },
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: process.env.FACEBOOK_PIXEL_ID,
        environment: process.env.NODE_ENV,
        enabled: (() =>
          ['production', 'staging'].indexOf(process.env.NODE_ENV) !== -1)(),
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sentry',
      options: {
        dsn: process.env.SENTRY_DSN,
        environment: process.env.NODE_ENV,
        enabled: (() =>
          ['production', 'staging'].indexOf(process.env.NODE_ENV) !== -1)(),
      },
    },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-netlify',
  ],
};
