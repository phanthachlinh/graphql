const { RESTDataSource } = require('apollo-datasource-rest');

export default class UserAPI extends RESTDataSource {
	constructor(baseUrl: string) {
		super();
		this.baseURL = baseUrl;
	}

	async getUsers() {
		return await this.get(this.baseURL);
	}
	async validateUser(username: string, password: string) {
		return await this.get(this.baseURL + `/validate?username=${username}&password=${password}`);
	}
}
