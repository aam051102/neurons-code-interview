import { ISurvivor } from "./ISurvivor";

export type IUser = {
    id: number;
    inventory: ISurvivor["inventory"];
};
