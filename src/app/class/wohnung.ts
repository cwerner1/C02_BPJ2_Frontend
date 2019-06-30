export class Wohnung {

    id: string;
    icon: string;

    rent: number;
    roomCount: number;
    userID: number;
    addedAt: number;
    address: string;
    city: string;
    country: string;
    description: string;
    surfaceArea: number;
    postalCode: string;


    constructor(values: object = {}) {

        Object.assign(this, values);

    }

}
