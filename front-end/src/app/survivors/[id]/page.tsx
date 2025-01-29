const itemTypeNameMap = {
    water: "Water",
    ammo: "Ammunition",
    food: "Food",
    med: "Medication",
} as const;

export default function Survivor() {
    const survivor = {
        id: 0,
        name: "John Smith",
        age: 12,
        gender: 0,
        lastLocation: ["0.462460", "1.464640"],
        infectionReports: 0,
        inventory: [
            {
                type: "water",
                count: 3,
            },
            {
                type: "ammo",
                count: 7,
            },
        ],
    } as const;

    return (
        <>
            <div className="min-h-screen p-20 container mx-auto">
                <div className="flex gap-5 items-center mb-2.5 mt-5">
                    <h1 className="text-3xl font-black uppercase">
                        {survivor.name}
                    </h1>

                    <div className="flex gap-2.5">
                        <button type="button" className="button_std">
                            Report infection
                        </button>
                        <button type="button" className="button_std">
                            Trade
                        </button>
                    </div>
                </div>

                <p>
                    <span className="font-bold">Age:</span> {survivor.age}
                </p>
                <p>
                    <span className="font-bold">Gender:</span>{" "}
                    {survivor.gender === 0 ? "M" : "F"}
                </p>
                <p>
                    <span className="font-bold">Last Location:</span>{" "}
                    {survivor.lastLocation.join(", ")}
                </p>
                <p>
                    <span className="font-bold">Status:</span>{" "}
                    {survivor.infectionReports >= 3 ? "INFECTED" : "OK"}
                </p>

                <h2 className="text-xl font-black uppercase mb-2.5 mt-5">
                    Inventory
                </h2>

                {survivor.inventory.map((item) => (
                    <div key={item.type}>
                        <p>
                            <span className="font-bold">
                                {itemTypeNameMap[item.type]}:
                            </span>{" "}
                            {item.count}
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
}
