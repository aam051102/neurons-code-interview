import Link from "next/link";

export default function Survivors() {
    const survivors = [
        {
            id: 0,
            name: "John Smith",
            age: 12,
            gender: 0,
            lastLocation: ["0.462460", "1.464640"],
            infectionReports: 0,
        },
    ];

    return (
        <>
            <div className="min-h-screen p-20 container mx-auto">
                <h1 className="text-3xl font-black uppercase mb-2.5 mt-5">
                    All Survivors
                </h1>

                <table className="w-full table_std">
                    <thead>
                        <tr>
                            <th className="text-left">Name</th>
                            <th className="text-left">Age</th>
                            <th className="text-left">Gender</th>
                            <th className="text-left">Last Location</th>
                            <th className="text-left">Status</th>
                            <th className="text-right"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {survivors.map((survivor) => (
                            <tr key={survivor.id}>
                                <td>{survivor.name}</td>
                                <td>{survivor.age}</td>
                                <td>{survivor.gender === 0 ? "M" : "F"}</td>
                                <td>{survivor.lastLocation.join(", ")}</td>
                                <td>
                                    {survivor.infectionReports > 3
                                        ? "INFECTED"
                                        : "OK"}
                                </td>
                                <td>
                                    <div className="flex gap-2.5 justify-end">
                                        <button
                                            type="button"
                                            className="button_std"
                                        >
                                            Report infection
                                        </button>

                                        <button
                                            type="button"
                                            className="button_std"
                                        >
                                            Trade
                                        </button>

                                        <Link
                                            href={`/survivors/${survivor.id}`}
                                            className="button_std"
                                        >
                                            View
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
