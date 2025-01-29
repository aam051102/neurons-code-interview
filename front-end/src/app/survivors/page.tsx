"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Survivors() {
    const [survivors, setSurvivors] = useState<
        {
            id: number;
            name: string;
            age: number;
            gender: number;
            longitude: string;
            lattitude: string;
            infectionReports: number;
        }[]
    >([]);

    useEffect(() => {
        fetch(`http://localhost:8000/survivors/list?format=json`)
            .then((res) => res.json())
            .then((res) => {
                setSurvivors(res);
            });
    }, []);

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
                                <td>
                                    {survivor.longitude}, {survivor.lattitude}
                                </td>
                                <td>
                                    {survivor.infectionReports >= 3
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
