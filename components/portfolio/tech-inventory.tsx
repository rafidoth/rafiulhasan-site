import { SecondaryTitle } from "./secondary-title"

import { ReactNode } from "react"
export type InventoryTechnology = {
    title: "Frontend" |
    "Backend" |
    "Database & Message Queues" |
    "Cloud & DevOps" |
    "Tools in my workflow",
    gem: ReactNode,
    techs: string[],
}
const Inventory = ({ technology_list }: { technology_list: InventoryTechnology[] }) => {
    return <div className="flex flex-col gap-1">
        <SecondaryTitle>INVENTORY</SecondaryTitle>
        {technology_list.map(t => {
            return <div key={t.title} className="flex flex-wrap gap-2">
                {t.gem} {t.techs.map(tt => {
                    return <span key={tt} className="hover:text-primary cursor-default">{tt}</span>
                })}
            </div>
        })}
    </div>
}
export default Inventory
