const isProduction = process.env.NODE_ENV === 'production';

//const host = window ? window.location.hostname : 'localhost';

export const API_PATH = {
  BASE: isProduction ? 'https://eslteachertoolkitbe.vercel.app/api' : `http://localhost:5050/api`,
  SIGN_UP: '/auth/signup',
  SIGN_IN: '/auth/signin',
  MAGIC_AUTH: '/auth/magic',
  MAGIC_VERIFICATION: '/auth/magic/verify',
  CURRENT_USER: '/users/me',
  EXERCISES: '/exercises',
  EXERCISES_TOPICS: '/exercises/topics',
  EXERCISES_GENERATE: '/exercises/generate',
  SENTENCES: '/sentences',
  TOPICS: '/topics',
  TOPICS_AUTOCOMPLETE: '/topics/autocomplete?name=',
};


// const host = window ? window.location.hostname : 'localhost';

// export const API_PATH = {
//   BASE: isProduction ? 'https://eslteachertoolkitbe.vercel.app/api' : `http://${host}:5050/api`,