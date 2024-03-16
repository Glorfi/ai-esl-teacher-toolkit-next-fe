const isProduction = process.env.NODE_ENV === 'production';

const host = window.location.hostname;

export const API_PATH = {
  BASE: isProduction
    ? 'https://eslteachertoolkitbe.vercel.app/api'
    : `http://${host}:5050/api`,
  SIGN_UP: '/auth/signup',
  SIGN_IN: '/auth/signin',
  CURRENT_USER: '/users/me',
  EXERCISES: '/exercises',
  SENTENCES: '/sentences',
  EXERCISES_GENERATE: '/exercises/generate',
};
