/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import { newContextComponents } from "@drizzle/react-components";
import KittyList from "./KittyList.js";
const { useDrizzle, useDrizzleState } = drizzleReactHooks;
const { ContractData } = newContextComponents;

export default () => {
  const { drizzle } = useDrizzle();
  const state = useDrizzleState((state) => state);

  return (
    <div>
      <div>
        <h2>Catalogue</h2>
        <ContractData
          drizzle={drizzle}
          drizzleState={state}
          contract="Cryptokitties"
          method="tokenURIBase"
          render={(uriBase) => {
            return (
              <ContractData
                drizzle={drizzle}
                drizzleState={state}
                contract="Cryptokitties"
                method="getAllKitties"
                render={(kitties) => (
                  <KittyList kitties={kitties} uriBase={uriBase} />
                )}
              />
            );
          }}
        />
      </div>
    </div>
  );
};
