'use strict';

module.exports = {
  url: 'https://kingso.netlify.com',
  title: 'Kingso\'s blog',
  subtitle: 'Kingso\'s blog',
  copyright: '© All rights reserved.',
  disqusShortname: 'kingsoblog',
  postsPerPage: 5,
  googleAnalyticsId: 'UA-147952200-1',
  menu: [
    {
      label: 'All',
      path: '/'
    },
    {
      label: 'About me',
      path: '/pages/about'
    },
    {
      label: 'Posts',
      path: '/posts/',
      sub_menu: [
        {
          label: 'Javascript',
          path: '/javascript/',
        },
        {
          label: 'React',
          path: '/react/',
        },
        {
          label: 'HTML/CSS',
          path: '/html_css/',
        },
        {
          label: 'DB',
          path: '/db/',
        },
        {
          label: 'IOS',
          path: '/ios/',
        },
        {
          label: 'Error',
          path: '/error/',
        },
        {
          label: 'TIL',
          path: '/til/',
        },
      ]
    },
    {
      label: 'Tags',
      path: '/tags',
    },
  ],
  author: {
    name: 'Kingso',
    photo: '/photo.jpg',
    bio: '각자의 방식대로',
    contacts: {
      email: 'cks678928@gmail.com',
      telegram: '#',
      twitter: '#',
      github: '#',
      rss: 'rss.xml',
      vkontakte: '#'
    }
  }
};
