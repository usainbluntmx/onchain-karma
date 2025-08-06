// src/App.tsx
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useState } from 'react'
import SendKarma from './components/SendKarma'
import { KarmaHistory } from './components/KarmaHistory'
import { KarmaLimit } from './components/KarmaLimit'
import { KarmaLeaderboard } from './components/KarmaLeaderboard'
import { KarmaThanksModal } from './components/KarmaThanksModal'
import { useKarmaListener } from './hooks/useKarmaListener'

export default function App() {
  const [refresh, setRefresh] = useState(0)
  const [showThanks, setShowThanks] = useState(false)

  const handleKarmaSent = () => {
    setRefresh(prev => prev + 1)
    setShowThanks(true)
  }

  const handleCloseThanks = () => {
    setShowThanks(false)
  }

  useKarmaListener(() => {
    setShowThanks(true)
  })

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>🪙 OnChain Karma</h1>
      <ConnectButton />
      <KarmaLimit refresh={refresh} />
      <SendKarma onKarmaSent={handleKarmaSent} />
      <KarmaHistory refresh={refresh} />
      <KarmaLeaderboard refresh={refresh} />
      <KarmaThanksModal show={showThanks} onClose={handleCloseThanks} />
    </div>
  )
}