const token = "tokenStr"
const USERID="userId"
export function saveToken(tokenStr) {
	uni.setStorageSync(token, tokenStr);
}
export function getToken() {
	return uni.getStorageSync(token);
}

export function saveUserId(id){
	uni.setStorageSync(USERID,id)
}
export function getUserId() {
	return uni.getStorageSync(USERID);
}

export function clearToken() {
	uni.removeStorage({
		key: token
	});
	uni.removeStorage({
		key: USERID
	});
}
