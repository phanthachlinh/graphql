const { RESTDataSource } = require('apollo-datasource-rest');

export default class ClientAPI extends RESTDataSource {
	constructor(baseUrl: string) {
		super();
		this.baseURL = baseUrl;
	}

	async getClients(searchTerm: string) {
		return await this.post(this.baseURL);
	}

}
