import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { getHashedNameSync, getNameAccountKeySync, NameRegistryState } from "@bonfida/spl-name-service";

async function resolveSolDomain(domain: string, connection: Connection): Promise<PublicKey> {

  const { registry } = await resolve(connection, domain.replace('.sol', ''));
  return new PublicKey(registry.owner)
}

async function main() {
  try {

    const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
    const publicKey = await resolveSolDomain("toly.sol", connection);

    const balanceInLamports = await connection.getBalance(publicKey);

    const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

    console.log(
      `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`,
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error to get balance:", error.message);
    } else {
      console.error("Unknwon error:", error);
    }
  }
}


await main();