import { connectWalletKit, disconnectWalletKit } from "./walletKit";

export async function handleConnect() {
  try {
    const { address } = await connectWalletKit();
    console.log("Wallet connected:", address);
    // Update UI state here if using React state or context
  } catch (err) {
    console.error("Failed to connect wallet:", err);
  }
}

export async function handleDisconnect() {
  await disconnectWalletKit();
  console.log("Wallet disconnected");
  // Update UI state here
}
