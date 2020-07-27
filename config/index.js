/**
 * ip地址或域名
 */
const ipAddress = 'http://101.201.149.120:8767'
/**
 * 针对不同平台的baseUrl
 */
const getBaseUrl = () => {
	return ipAddress 
}
export default {
	/**
	 * 针对不同平台的baseUrl
	 */
	baseUrl: getBaseUrl()
}
