import { pathsToModuleNameMapper } from "ts-jest";
import tsconfig from "./tsconfig.json" assert { type: "json" };

export default {
  preset: "ts-jest",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  rootDir: "./",
};
