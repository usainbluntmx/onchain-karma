import { useEffect, useState } from 'react'
import { readContract } from 'wagmi/actions'
import { onchainKarmaABI, onchainKarmaAddress } from '../contracts/onchainKarma'

interface Karma {
  from: string
  to: string
  timestamp: bigint
}

export function KarmaLeaderboard({ refresh = 0 }: { refresh?: number }) {
  const [ranking, setRanking] = useState<{ address: string; count: number }[]>(
    []
  )

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const totalKarmas = (await readContract({
          address: onchainKarmaAddress,
          abi: onchainKarmaABI,
          functionName: 'totalKarmas',
        })) as bigint

        const countMap: Record<string, number> = {}

        const karmaPromises = Array.from({ length: Number(totalKarmas) }, (_, i) =>
          readContract({
            address: onchainKarmaAddress,
            abi: onchainKarmaABI,
            functionName: 'getKarma',
            args: [BigInt(i)],
          }).catch(() => null)
        )

        const karmaResults = await Promise.all(karmaPromises)

        for (const result of karmaResults) {
          if (!result) continue
          const karma = result as unknown as Karma
          const to = karma.to.toLowerCase()
          countMap[to] = (countMap[to] || 0) + 1
        }

        const sorted = Object.entries(countMap)
          .sort((a, b) => b[1] - a[1])
          .map(([address, count]) => ({ address, count }))

        setRanking(sorted)
      } catch (err) {
        console.error('Error fetching leaderboard:', err)
      }
    }

    fetchLeaderboard()
  }, [refresh])

  return (
    <div style={{ marginTop: 30 }}>
      <h3>🏆 Usuarios más apreciados</h3>
      {ranking.length === 0 ? (
        <p>No hay suficientes karmas aún.</p>
      ) : (
        <ol>
          {ranking.map(({ address, count }, i) => (
            <li key={i}>
              {address} — {count} karma{count > 1 ? 's' : ''}
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}