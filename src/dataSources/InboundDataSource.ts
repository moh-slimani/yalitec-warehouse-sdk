import {endpoints} from "../config/server";
import DataSource from "./DataSource";
import {Inbound, InboundCreateInput, InboundsFilter, InboundUpdateInput} from "../types/Inbound";

export default class InboundDataSource extends DataSource {
    async list(options: InboundsFilter) {
        // distrust the options

        const {
            page,
            sellerId,
            sellerIds,
            storeId,
            storeIds
        } = options;


        let endpoint = endpoints.inbounds.index;
        let urlSearchParams = new URLSearchParams();

        if (storeId) {
            urlSearchParams.append('store_id', storeId.toString())
        }

        if (storeIds) {
            storeIds.forEach(storeId => urlSearchParams.append('store_ids[]', storeId.toString()))
        }

        if (sellerId) {
            urlSearchParams.append('seller_id', sellerId)
        }

        if (sellerIds) {
            sellerIds.forEach(sellerId => urlSearchParams.append('seller_ids[]', sellerId))
        }

        if (page) {
            urlSearchParams.append('page', page.toString())
        }

        if (urlSearchParams.size) {
            endpoint += '?' + urlSearchParams;
        }

        return await this.fetch<Inbound[]>(endpoint);
    }

    async find(number: string) {
        return await this.fetch<Inbound>(endpoints.inbounds.show(number));
    }

    async create(input: InboundCreateInput) {
        return await this.fetch<Inbound>(endpoints.inbounds.create, {
            method: 'POST',
            body: JSON.stringify(input)
        });
    }

    async update(number: string, input: InboundUpdateInput) {
        return await this.fetch<Inbound>(endpoints.inbounds.update(number), {
            method: 'PUT',
            body: JSON.stringify(input)
        });
    }
}
