import { NbPasswordAuthStrategy, NbAuthJWTToken } from '@nebular/auth';
import { environment } from '../../environments/environment';

export const socialLinks = [
  {
    url: '',
    target: '_blank',
    icon: 'github',
  },
  {
    url: '',
    target: '_blank',
    icon: 'facebook',
  },
  {
    url: '',
    target: '_blank',
    icon: 'twitter',
  },
];

export const authOptions = {
  strategies: [
    NbPasswordAuthStrategy.setup({
      name: 'email',
      baseEndpoint: environment.apiUrl,
      token: {
        class: NbAuthJWTToken,
        key: 'accessToken', //where to look for the token. 
      },
      login: {
        endpoint: '/auth/login',
        method: 'post',
      },
      register: {
        endpoint: '/auth/sign-up',
        method  : 'post',
      },
      logout: {
        endpoint: '/auth/sign-out',
        method  : 'post',
      },
      requestPass: {
        endpoint: '/auth/request-pass',
        method  : 'post',
      },
      resetPass: {
        endpoint: '/auth/reset-pass',
        method  : 'post',
      },
    }),
  ],
  forms: {
    login: {
      socialLinks: socialLinks,
    },
    register: {
      socialLinks: socialLinks,
    },
  },
};