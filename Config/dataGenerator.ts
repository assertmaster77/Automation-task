import { faker } from '@faker-js/faker';

export interface BookerData {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
}

export interface BillingData {
    address: string;
    city: string;
    postcode: string;
}

export interface ObjectPayload {
    name: string;
    data: {
        year: number;
        price: number;
        cpuModel: string;
        hardDiskSize: string;
    };
}

// Booker
export function createBookerData(): BookerData {
    return {
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phone:
            faker.helpers.arrayElement([
                '50', '63', '66', '67', '68', '73', '93', '95', '96', '97', '98', '99',
            ]) + faker.string.numeric(7),
    };
}

// Billing
export function createBillingData(): BillingData {
    return {
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        postcode: faker.location.zipCode(),
    };
}

// Object payload (UNIQUE VERSION)
export function createObjectPayload(): ObjectPayload {
    const uniqueSuffix = `${Date.now()}-${faker.string.alphanumeric(6)}`;

    return {
        name: `${faker.commerce.productAdjective()} ${faker.commerce.product()} ${uniqueSuffix}`,
        data: {
            year: faker.number.int({ min: 2020, max: 2025 }),
            price: faker.number.float({ min: 500, max: 3000, fractionDigits: 2 }),
            cpuModel: faker.helpers.arrayElement([
                'Intel Core i5',
                'Intel Core i7',
                'Intel Core i9',
                'AMD Ryzen 7',
                'AMD Ryzen 9',
            ]),
            hardDiskSize: faker.helpers.arrayElement(['256 GB', '512 GB', '1 TB', '2 TB']),
        },
    };
}