"use client";
import { createContext, useContext } from "react";

export const DogContext = createContext("🐶");

export function useDog() {
  return useContext(DogContext);
}
