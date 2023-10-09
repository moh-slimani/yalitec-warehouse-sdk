import {Store, StoreCreateInput, StoreUpdateInput} from '../types/Store'
import {endpoints} from "../config/server";
import {Response} from "../types/Response";
import {FetchOptions} from "../types/global";

export default class StoreDatasource {
    private readonly fetch: <T>(endpoint: string, options?: FetchOptions) => Promise<Response<T>>;

    constructor(fetch: <T>(endpoint: string, options?: FetchOptions) => Promise<Response<T>>) {
        this.fetch = fetch;
    }

    async all(seller_id?: string, page?: number) {


        let endpoint = endpoints.stores.index;
        let urlSearchParams = new URLSearchParams();

        if (seller_id) {
            urlSearchParams.append('seller_id', seller_id)
        }

        if (page) {
            urlSearchParams.append('page', page.toString())
        }

        if (urlSearchParams.size) {
            endpoint += '?' + urlSearchParams;
        }

        return await this.fetch<Store>(endpoint);
    }

    async find(id: number) {
        return await this.fetch<Store>(endpoints.stores.show(id));
    }

    async create(input: StoreCreateInput) {
        return await this.fetch<Store>(endpoints.stores.create, {
            method: 'POST',
            body: JSON.stringify(input)
        });
    }

    async update(id: number, input: StoreUpdateInput) {
        return await this.fetch<Store>(endpoints.stores.update(id), {
            method: 'PUT',
            body: JSON.stringify(input)
        });
    }
}
