import axios from 'axios';
import base64 from 'base-64';

// eslint-disable-next-line no-undef
Microblink.SDK.SetRecognizers(['MRTD']);
// eslint-disable-next-line no-undef
Microblink.SDK.SetAuthorization(
	'Bearer ' +
		base64.encode(
			'ae811e60137642bb89b4f8e5b4ccb1c2' +
				':' +
				'c5423535-3a23-48b2-918e-e0aebb81d16d'
		)
);

export default axios.create({
	baseURL: 'https://api.microblink.com/v1/recognizers/',
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		Authorization:
			'Bearer YWU4MTFlNjAxMzc2NDJiYjg5YjRmOGU1YjRjY2IxYzI6YzU0MjM1MzUtM2EyMy00OGIyLTkxOGUtZTBhZWJiODFkMTZk',
	},
});
