export const authSettings = {
    guest: {
    },
    user: {
      parent: 'guest',
        view: ['current-user'],
        edit: ['current-user'],
    },
    moderator: {
      parent: 'user',
        view: ['current-user', 'users'],
        edit: ['current-user', 'users'],
    },
    admin: {
      parent: 'moderator',
        view: ['current-user', 'users'],
        edit: ['current-user', 'users'],
    },
  };