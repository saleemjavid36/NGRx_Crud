import { createFeatureSelector } from "@ngrx/store";
import { Appstate } from "./appstate";

export const selectAppStore = createFeatureSelector<Appstate>('myappstate')