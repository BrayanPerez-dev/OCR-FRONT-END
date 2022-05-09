import axios from 'axios';

export default axios.create({
	baseURL: 'https://intellityc-scanner-server.herokuapp.com/api/',
	headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});
