export type ISurvivor = {
    id: number;
    name: string;
    age: number;
    gender: number;
    longitude: string;
    latitude: string;
    sentReports: {
        reported: number;
        reporter: number;
    }[];
    receivedReports: {
        reported: number;
        reporter: number;
    }[];
    inventory: {
        itemType: number;
        count: number;
    }[];
};
