'use client'

import { endpoints } from "../api/config";
import { useGetDataByCategory } from "../api/api-hooks";
import { Preloader } from "../components/Preloader/Preloader";
import { CardsListSection } from "../components/CardsListSection/CardsListSection";

export default function TDS() {
    const tdsGames = useGetDataByCategory(endpoints.games, 'TDS');

    return (
        <main className="main-inner">
            {tdsGames ? (
                <CardsListSection id="tds" title="TDS" data={tdsGames} />
            ) : (
                <Preloader />
            )}
        </main>
    )
}