import { EthereumProvider } from "@walletconnect/ethereum-provider";
import { Web3Wallet } from "@walletconnect/web3wallet";
import { ethers } from "ethers";

let provider: EthereumProvider | null = null;
let signer: ethers.Signer | null = null;

const PROJECT_ID = "YOUR_PROJECT_ID_HERE";

export async function connectWalletKit() {
  provider = await EthereumProvider.init({
    projectId: PROJECT_ID,
    chains: [296, 297], // Hedera Mainnet / Testnet
    showQrModal: true,
  });

  await provider.enable();

  const web3Provider = new ethers.providers.Web3Provider(provider);
  signer = web3Provider.getSigner();
  const address = await signer.getAddress();

  provider.on("accountsChanged", (accounts: string[]) => console.log("Accounts changed:", accounts));
  provider.on("chainChanged", (chainId: number) => console.log("Chain changed:", chainId));
  provider.on("disconnect", () => { provider = null; signer = null; console.log("Wallet disconnected"); });

  const wallet = await Web3Wallet.init({
    projectId: PROJECT_ID,
    metadata: {
      name: "Hedera dApp",
      description: "WalletKit integration",
      url: "https://github.com/momental-org/hedera-wallet-connect",
      icons: ["https://walletconnect.com/walletconnect-logo.png"],
    },
  });

  wallet.on("session_delete", () => console.log("Session deleted"));
  wallet.on("session_expire", () => console.log("Session expired"));

  return { provider, signer, address, wallet };
}

export async function disconnectWalletKit() {
  if (provider) await provider.disconnect();
  provider = null;
  signer = null;
}
