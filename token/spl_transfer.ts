import { Keypair, Connection, LAMPORTS_PER_SOL, SystemProgram, Transaction, sendAndConfirmTransaction, PublicKey } from "@solana/web3.js";

//6Gyzh95iBHZBiPmQZ4pMdFnVuXTxebnhdq2EjgUHwhje
import wallet from "../wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";


const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const toKeygen = Keypair.generate()
const to = toKeygen.publicKey;

const connection = new Connection("https://api.devnet.solana.com", "finalized");

(async() => {
  try {

  const mint = new PublicKey("BFU7gq9Sq7yeJKFCr6ZW242eiBTTwrBjsQEvayL9go8H")

  const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,
    mint,
    keypair.publicKey)

  const toTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,
    mint,
    to)

    const trx = await transfer(
      connection,
      keypair,
      fromTokenAccount.address,
      toTokenAccount.address,
      keypair,
      20e6,
    )
    
    console.log("Transaction: " + trx)


  } catch (error) {
    console.log(error)
  }
})();