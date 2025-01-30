"use client";

import ReportModal from "@/components/ReportModal";
import TradeModal from "@/components/TradeModal";
import { ITEM_DATA_MAP, MAX_REPORTS_FOR_INFECTION } from "@/constants";
import { CurrentUserContext } from "@/context";
import { ISurvivor } from "@/types/ISurvivor";
import { useParams } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";

export default function Survivor() {
    const currentUserCtx = useContext(CurrentUserContext);
    const currentUser = currentUserCtx?.currentUser;

    const [survivor, setSurvivor] = useState<ISurvivor | undefined>(undefined);

    const params = useParams<{ id: string }>();
    const id = params.id ? Number(params.id) : null;

    const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
    const [isTradeModalOpen, setIsTradeModalOpen] = useState<boolean>(false);

    const refetch = useCallback(async () => {
        if (!id) return;

        fetch(`http://localhost:8000/survivors/find?format=json&id=${id}`)
            .then((res) => res.json())
            .then((res) => {
                setSurvivor(res);
            });
    }, [id]);

    useEffect(() => {
        refetch();
    }, [refetch]);

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

                    {currentUser?.id === survivor.id ? (
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
                                {ITEM_DATA_MAP[item.itemType]?.name}:
                            </span>{" "}
                            {item.count}
                        </p>
                    </div>
                ))}

                <h2 className="text-xl font-black uppercase mb-2.5 mt-5">
                    Location
                </h2>

                <div className="w-full">
                    <iframe
                        width="100%"
                        height="600"
                        className="border-0 m-0 w-[600px] h-[600px]"
                        scrolling="no"
                        src={`https://maps.google.com/maps?width=100&height=600&hl=en&q=${survivor.latitude},${survivor.longitude}+(Survivor%20Location)&t=h&z=12&ie=UTF8&iwloc=B&output=embed`}
                    ></iframe>
                </div>
            </div>

            <ReportModal
                isOpen={isReportModalOpen}
                setIsOpen={setIsReportModalOpen}
                survivor={survivor}
                refetch={refetch}
            />

            <TradeModal
                isOpen={isTradeModalOpen}
                setIsOpen={setIsTradeModalOpen}
                survivor={survivor}
                refetch={refetch}
            />
        </>
    );
}
