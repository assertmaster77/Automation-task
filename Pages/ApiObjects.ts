import { type APIRequestContext } from '@playwright/test';
import { API_BASE_URL } from '../Config/apiUrl';
import type { ObjectPayload } from '../Config/dataGenerator';

const HEADERS = { Accept: 'application/json', 'Content-Type': 'application/json' };
const ENDPOINT = `${API_BASE_URL}/objects`;

interface ApiObject {
    id: string;
    name: string;
    data: Record<string, unknown>;
}

interface DeleteResult {
    message: string;
}

export class DevicesApiClient {
    constructor(private readonly request: APIRequestContext) {}

    async getAllProducts(): Promise<{ status: number; body: unknown[] }> {
        const res = await this.request.get(ENDPOINT, { headers: HEADERS });
        return { status: res.status(), body: await res.json() };
    }

    async createProduct(payload: ObjectPayload): Promise<{ status: number; body: ApiObject }> {
        const res = await this.request.post(ENDPOINT, { data: payload, headers: HEADERS });
        return { status: res.status(), body: await res.json() };
    }

    async getProductById(id: string): Promise<{ status: number; body: ApiObject | null }> {
        const res = await this.request.get(`${ENDPOINT}/${id}`, { headers: HEADERS });
        return {
            status: res.status(),
            body: res.status() === 200 ? await res.json() : null,
        };
    }

    async deleteProductById(id: string): Promise<{ status: number; body: DeleteResult }> {
        const res = await this.request.delete(`${ENDPOINT}/${id}`, { headers: HEADERS });
        return { status: res.status(), body: await res.json() };
    }
}
