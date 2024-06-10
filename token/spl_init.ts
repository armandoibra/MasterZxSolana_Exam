import { Keypair, Connection } from "@solana/web3.js";

import wallet from '../wallet.json'
import  { createMint } from "@solana/spl-token"

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet))
const connection = new Connection("https://api.devnet.solana.com", "finalized");


(async () => {

  const mint = await createMint(
    connection,
    keypair,
    keypair.publicKey,
    null,
    4
  )

  console.log(`Mint address ${mint.toBase58()}`)
})()