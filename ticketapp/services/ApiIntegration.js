import axios from 'axios'

const cons = axios.get('https://api.sympla.com.br/public/v3/events', {
  headers: {
    's_token': '690a46314f75c6ef612bb7f8e361d01eddcd87c1a0cc2fbac1f6fa8f5b9acb28'
  }
});