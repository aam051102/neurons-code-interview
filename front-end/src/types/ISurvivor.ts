export type ISurvivor = {
    id: number;
    name: string;
    age: number;
    gender: number;
    longitude: string;
    latitude: string;

    // TODO: NOT REAL - HANDLE THIS
    infectionReports: number;
    inventory: [
        {
            type: "water";
            count: 3;
        },
        {
            type: "ammo";
            count: 7;
        }
    ];
};