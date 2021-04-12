import { Actor, HttpAgent } from "@dfinity/agent";
import {
  idlFactory as whoami_idl,
  canisterId as whoami_id,
} from "dfx-generated/whoami";
import { Bip39Ed25519KeyIdentity } from "@dfinity/authentication";
import { bip39GenerateMnemonic } from "@dfinity/authentication/lib/cjs/identity/bip39";

// Default Agent
window.AGENT = new HttpAgent();
window.BACKEND_CANISTER = Actor.createActor(whoami_idl, {
  agent: AGENT,
  canisterId: whoami_id,
});

const updateAgent = (backendCanisterId, mnemonic) => {
  const identity = Bip39Ed25519KeyIdentity.fromBip39Mnemonic(mnemonic);
  AGENT = new HttpAgent({
    canisterId: backendCanisterId,
    identity,
  });
  BACKEND_CANISTER = Actor.createActor(whoami_idl, {
    agent: AGENT,
    canisterId: whoami_id,
  });
  console.log("updateAgent", AGENT, BACKEND_CANISTER);

  window.AGENT = AGENT;
  window.BACKEND_CANISTER = BACKEND_CANISTER;
  console.log("updateAgent:done");
};

document.addEventListener("DOMContentLoaded", function (event) {
  document.getElementById("backendCanisterId").value = whoami_id;
  document.getElementById("mnemonic").value =
    "tiger rail apple oyster visual artefact you position must hello maple become flee kid fish perfect popular subject wine arrow clap try trap burst";
});

document
  .getElementById("generateMnemonic")
  .addEventListener("click", async () => {
    document.getElementById("mnemonic").value = bip39GenerateMnemonic();
  });

document.getElementById("clickMeBtn").addEventListener("click", async () => {
  const mnemonic = document.getElementById("mnemonic").value.toString();
  const backendCanisterId = document
    .getElementById("backendCanisterId")
    .value.toString();

  updateAgent(backendCanisterId, mnemonic);
});

document.getElementById("whoami").addEventListener("click", async () => {
  let whoamiResponse = await window.BACKEND_CANISTER.whoami();
  console.log({ whoamiResponse });
  document.getElementById("whoamiResponse").innerText = whoamiResponse;
});
