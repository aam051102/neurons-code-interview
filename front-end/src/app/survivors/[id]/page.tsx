"use client";

import { useEffect, useState } from "react";

const itemTypeNameMap = {
    water: "Water",
    ammo: "Ammunition",
    food: "Food",
    med: "Medication",
} as const;

export default function Survivor() {
    const [survivor, setSurvivor] = useState<
        | {
              id: number;
              name: string;
              age: number;
              gender: number;
              longitude: string;
              lattitude: string;
              infectionReports: 0;
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
          }
        | undefined
    >(undefined);

    useEffect(() => {
        fetch(`http://localhost:8000/survivors/find?format=json`)
            .then((res) => res.json())
            .then((res) => {
                setSurvivor(res);
            });
    }, []);

    if (!survivor)
        return (
            <div>
                <p>Loading</p>
            </div>
        );

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
                    {survivor.lattitude}, {survivor.longitude}
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
