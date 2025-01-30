"use client";

import ReportModal from "@/components/ReportModal";
import TradeModal from "@/components/TradeModal";
import { MAX_REPORTS_FOR_INFECTION } from "@/constants";
import { ISurvivor } from "@/types/ISurvivor";
import { userID } from "@/userData";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const itemTypeNameMap: Record<number, string> = {
    0: "Water",
    1: "Ammunition",
    2: "Food",
    3: "Medication",
};

export default function Survivor() {
    const [survivor, setSurvivor] = useState<ISurvivor | undefined>(undefined);

    const params = useParams<{ id: string }>();
    const id = params.id ? Number(params.id) : null;

    const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
    const [isTradeModalOpen, setIsTradeModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if (!id) return;

        fetch(`http://localhost:8000/survivors/find?format=json&id=${id}`)
            .then((res) => res.json())
            .then((res) => {
                setSurvivor(res);
            });
    }, [id]);

    if (!survivor)
        return (
            <div>
                <p>Loading</p>
            </div>
        );

    return (
        <>
            <div className="min-h-screen py-20 custom_container">
                <div className="flex gap-x-5 gap-y-2.5 flex-wrap items-center mb-2.5 mt-5">
                    <h1 className="text-3xl font-black uppercase">
                        {survivor.name}
                    </h1>

                    {userID === survivor.id ? (
                        <div className="text-sm py-1 p-1.5 bg-gray-100 border rounded-sm border-gray-200 text-gray-700">
                            You
                        </div>
                    ) : survivor.receivedReports.length >=
                      MAX_REPORTS_FOR_INFECTION ? null : (
                        <div className="flex gap-2.5">
                            <button
                                type="button"
                                className="button_std button_std_danger"
                                onClick={() => {
                                    setIsReportModalOpen(true);
                                }}
                            >
                                Report infection
                            </button>
                            <button
                                type="button"
                                className="button_std"
                                onClick={() => {
                                    setIsTradeModalOpen(true);
                                }}
                            >
                                Trade
                            </button>
                        </div>
                    )}
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
                    {survivor.latitude}, {survivor.longitude}
                </p>
                <p>
                    <span className="font-bold">Status:</span>{" "}
                    {survivor.receivedReports.length >=
                    MAX_REPORTS_FOR_INFECTION ? (
                        <span className="text-red-500 font-bold">INFECTED</span>
                    ) : (
                        <span className="text-green-500 font-bold">OK</span>
                    )}
                </p>

                <h2 className="text-xl font-black uppercase mb-2.5 mt-5">
                    Inventory
                </h2>

                {survivor.inventory.map((item) => (
                    <div key={item.itemType}>
                        <p>
                            <span className="font-bold">
                                {itemTypeNameMap[item.itemType]}:
                            </span>{" "}
                            {item.count}
                        </p>
                    </div>
                ))}
            </div>

            <ReportModal
                isOpen={isReportModalOpen}
                setIsOpen={setIsReportModalOpen}
                survivor={survivor}
            />

            <TradeModal
                isOpen={isTradeModalOpen}
                setIsOpen={setIsTradeModalOpen}
                survivor={survivor}
            />
        </>
    );
}
