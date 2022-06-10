import cloudApi from './http-cloudapi';

export const sendImagesToApiCloudCombined = data => {
	return cloudApi.post('blinkid-combined', data).then(res => {
		return res.data;
	});
};
