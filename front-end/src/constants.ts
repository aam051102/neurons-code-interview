// The maximum number of reports before a user is considered infected
const MAX_REPORTS_FOR_INFECTION = 3;

// Table denoting permitted inventory item information
const ITEM_DATA_MAP: Record<
    number,
    {
        name: string;
        value: number;
    }
> = {
    0: {
        name: "Water",
        value: 4,
    },
    1: {
        name: "Food",
        value: 3,
    },
    2: {
        name: "Medication",
        value: 2,
    },
    3: {
        name: "Ammunition",
        value: 1,
    },
};

// Longitude/latitude RegEx pattern borrowed from https://stackoverflow.com/questions/3518504/regular-expression-for-matching-latitude-longitude-coordinates and modified to fit them being separate
const LATITUDE_PATTERN = "^[\\-\\+]?([1-8]?\\d(.\\d+)?|90(\\.0+)?)$";
const LONGITUDE_PATTERN =
    "^[\\-\\+]?(180(\\.0+)?|((1[0-7]\\d)|([1-9]?\\d))(\\.\\d+)?)$";

export {
    MAX_REPORTS_FOR_INFECTION,
    ITEM_DATA_MAP,
    LATITUDE_PATTERN,
    LONGITUDE_PATTERN,
};
