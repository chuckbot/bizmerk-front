angular.module('bizmerkApp')
  .constant('Config',{
    'apiUrl': 'http://localhost:8080/',
    'apiEndpoints': {
      'campaings': '/campaings',
      'confirmation': '/confirmation',
      'showme': '/showme',
      'updateme': '/updateme',
      'users': '/users',
      'recovery': {
        'post': '/postemail',
        'reset': '/reset'
      },
      'contacts': '/contacts',
    },
    'tokenName': 'Bizmerk_Token',
    'prefixToken': 'Bizmerk'
  });
