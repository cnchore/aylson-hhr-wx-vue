const STORAGE_KEY='aylson-wx-vue';
export default{
	getLocalStorage(){
		return JSON.parse(window.localStorage.getItem(STORAGE_KEY)||'[]');
	},
	setLocalStorage(values){
		window.localStorage.setItem(STORAGE_KEY,JSON.stringify(values));
	}
}