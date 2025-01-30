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

export { MAX_REPORTS_FOR_INFECTION, ITEM_DATA_MAP };
