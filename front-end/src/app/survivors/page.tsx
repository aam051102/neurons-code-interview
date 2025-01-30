"use client";
import RegisterModal from "@/components/RegisterModal";
import ReportModal from "@/components/ReportModal";
import TradeModal from "@/components/TradeModal";
import { MAX_REPORTS_FOR_INFECTION } from "@/constants";
import { ISurvivor } from "@/types/ISurvivor";
import { userID } from "@/userData";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function Survivors() {
    const [survivors, setSurvivors] = useState<ISurvivor[]>([]);
    const [reporting, setReporting] = useState<ISurvivor | undefined>(
        undefined
    );
    const [trading, setTrading] = useState<ISurvivor | undefined>(undefined);
    const [isRegistering, setIsRegistering] = useState<boolean>(false);

    const refetch = useCallback(async () => {
        fetch(`http://localhost:8000/survivors/list?format=json`)
            .then((res) => res.json())
            .then((res) => {
                setSurvivors(res);
            });
    }, []);

    useEffect(() => {
        refetch();
    }, [refetch]);

    return (
        <>
            <div className="min-h-screen py-20 custom_container">
                <div className="mt-5 mb-2.5 flex flex-wrap gap-x-5 gap-y-2.5">
                    <h1 className="text-3xl font-black uppercase">
                        All Survivors
                    </h1>

                    <button
                        type="button"
                        className="button_std"
                        onClick={() => {
                            setIsRegistering(true);
                        }}
                    >
                        Register Survivor
                    </button>
                </div>

                <div className="table_wrapper">
                    <table className="w-full table_std">
                        <thead>
                            <tr>
                                <th className="text-left td_width-hug">Name</th>
                                <th className="text-left td_width-hug">Age</th>
                                <th className="text-left td_width-hug">
                                    Gender
                                </th>
                                <th className="text-left td_width-hug">
                                    Last Location
                                </th>
                                <th className="text-left td_width-hug">
                                    Status
                                </th>
                                <th className="text-right td_width-auto"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {survivors.map((survivor) => (
                                <tr key={survivor.id} className="group">
                                    <td className="td_width-hug">
                                        {survivor.name}

                                        {survivor.id === userID ? (
                                            <div className="inline-block ml-2.5 text-sm py-1 p-1.5 bg-gray-100 border rounded-sm border-gray-200 text-gray-700">
                                                You
                                            </div>
                                        ) : null}
                                    </td>
                                    <td className="td_width-hug">
                                        {survivor.age}
                                    </td>
                                    <td className="td_width-hug">
                                        {survivor.gender === 0 ? "M" : "F"}
                                    </td>
                                    <td className="td_width-hug">
                                        {survivor.longitude},{" "}
                                        {survivor.latitude}
                                    </td>
                                    <td className="td_width-hug">
                                        {survivor.receivedReports.length >=
                                        MAX_REPORTS_FOR_INFECTION ? (
                                            <span className="text-red-500 font-bold">
                                                INFECTED
                                            </span>
                                        ) : (
                                            <span className="text-green-500 font-bold">
                                                OK
                                            </span>
                                        )}
                                    </td>
                                    <td className="td_width-auto">
                                        <div className="flex gap-2.5 justify-end invisible group-hover:visible">
                                            {survivor.id !== userID &&
                                            survivor.receivedReports.length <
                                                MAX_REPORTS_FOR_INFECTION ? (
                                                <>
                                                    <button
                                                        type="button"
                                                        className="button_std"
                                                        onClick={() => {
                                                            setReporting(
                                                                survivor
                                                            );
                                                        }}
                                                    >
                                                        Report infection
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="button_std"
                                                        onClick={() => {
                                                            setTrading(
                                                                survivor
                                                            );
                                                        }}
                                                    >
                                                        Trade
                                                    </button>
                                                </>
                                            ) : null}

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
            </div>

            <ReportModal
                isOpen={!!reporting}
                setIsOpen={() => setReporting(undefined)}
                survivor={reporting}
                refetch={refetch}
            />

            <TradeModal
                isOpen={!!trading}
                setIsOpen={() => setTrading(undefined)}
                survivor={trading}
                refetch={refetch}
            />

            <RegisterModal
                isOpen={!!isRegistering}
                setIsOpen={() => setIsRegistering(false)}
                refetch={refetch}
            />
        </>
    );
}
