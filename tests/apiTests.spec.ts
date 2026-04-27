import { test, expect } from '@playwright/test';
import { DevicesApiClient } from '../Pages/ApiObjects';
import { createObjectPayload } from '../Config/dataGenerator';

test.describe.configure({ mode: 'serial' });

test.describe('API /devices', () => {

    let createdItem: any;
    let createdPayload: ReturnType<typeof createObjectPayload>;

    test('GET /objects — returns a non-empty array', async ({ request }) => {
        const client = new DevicesApiClient(request);

        const { status, body } = await client.getAllProducts();

        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
    });

    test('POST /objects — creates a new object', async ({ request }) => {
        const client = new DevicesApiClient(request);

        createdPayload = createObjectPayload();

        const { status, body } = await client.createProduct(createdPayload);

        expect(status).toBe(200);
        expect(body.id).toBeDefined();
        expect(body.name).toBe(createdPayload.name);
        expect((body.data as { price: number }).price)
            .toBe(createdPayload.data.price);

        createdItem = body;
    });

    test('GET /objects/:id — fetches the created object', async ({ request }) => {
        const client = new DevicesApiClient(request);

        const { status, body } = await client.getProductById(createdItem.id);

        expect(status).toBe(200);
        expect(body!.id).toBe(createdItem.id);
        expect(body!.name).toBe(createdPayload.name);
    });

    test('DELETE /objects/:id — removes the object', async ({ request }) => {
        const client = new DevicesApiClient(request);

        const { status, body } = await client.deleteProductById(createdItem.id);

        expect(status).toBe(200);
        expect(body.message).toContain(createdItem.id);
    });

    test('GET /objects/:id — returns 404 after deletion', async ({ request }) => {
        const client = new DevicesApiClient(request);

        const { status } = await client.getProductById(createdItem.id);

        expect(status).toBe(404);
    });

});