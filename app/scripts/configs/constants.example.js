angular.module('bizmerkApp')
  .constant('Config',{
    'apiUrl': '',
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
