import { useEffect, useState } from 'react'
import { useInitData, useHapticFeedback } from '@tma.js/sdk-react'

function App() {
  const initData = useInitData()
  const haptic = useHapticFeedback()

  const [coins, setCoins] = useState(0)
  const [energy, setEnergy] = useState(1000)

  useEffect(() => {
    window.Telegram.WebApp.ready()
    window.Telegram.WebApp.expand()
  }, [])

  const handleTap = () => {
    if (energy >= 1) {
      setCoins(c => c + 1)
      setEnergy(e => e - 1)
      haptic.impactOccurred('medium')
    } else {
      haptic.notificationOccurred('error')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-bold mb-10 text-yellow-400">USDT Miner ⛏️</h1>
      <div className="text-7xl font-bold mb-8 text-green-400">{coins} vUSDT</div>
      <button 
        onClick={handleTap}
        className="w-64 h-64 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full text-6xl shadow-2xl hover:scale-105 active:scale-95 transition-all"
      >
        TAP!
      </button>
      <div className="mt-8 text-xl">Energy: {energy}/1000</div>
      <p className="mt-12 text-gray-400 text-center">Tap to mine virtual USDT! Telegram Mini App ready.</p>
    </div>
  )
}

export default App