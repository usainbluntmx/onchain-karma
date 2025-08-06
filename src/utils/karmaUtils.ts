import { onchainKarmaABI, onchainKarmaAddress } from '../contracts/onchainKarma'
import { publicClient } from '../clients/wagmiClient'

export async function getKarmaDetails(id: bigint) {
  const karma = await publicClient.readContract({
    address: onchainKarmaAddress,
    abi: onchainKarmaABI,
    functionName: 'getKarma',
    args: [id],
  })

  return { id, ...karma }
}