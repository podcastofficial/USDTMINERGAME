import { useEffect, useState } from 'react'
import { useInitData, useMainButton, useHapticFeedback } from '@tma.js/sdk-react'

function App() {
  const initData = useInitData()
  const mainButton = useMainButton()
  const haptic = useHapticFeedback()

  const [coins, setCoins] = useState(0)
  const [energy, setEnergy] = useState(1000)
  const [maxEnergy] = useState(1000)
  const [tapPower] = useState(1)

  const user = initData?.user

  useEffect(() => {
    // Telegram Mini App ready karo
    window.Telegram.WebApp.ready()
    window.Telegram.WebApp.expand()

    mainButton.setText('Tap to Mine! ⛏️')
    mainButton.show()
    mainButton.onClick(() => handleTap())

    // Energy refill har 5 sec mein
    const interval = setInterval(() => {
      setEnergy(prev => Math.min(prev + 10, maxEnergy))
    }, 5000)

    return () => clearInterval(interval)
  }, [mainButton])

  const handleTap = () => {
    if (energy >= tapPower) {
      setCoins(prev => prev + tapPower)
      setEnergy(prev => prev - tapPower)
      haptic.impactOccurred('medium')  // Vibration effect
    } else {
      haptic.notificationOccurred('error')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-8 text-yellow-400 animate-pulse">
        USDT Miner Game ⛏️
      </h1>

      {user && (
        <div className="mb-6 text-center">
          <p className="text-lg">Welcome, @{user.username || 'Miner'}!</p>
          <p className="text-sm text-gray-400">ID: {user.id}</p>
        </div>
      )}

      <div className="text-6xl font-bold mb-4 text-green-400">
        {coins.toLocaleString()} vUSDT
      </div>

      <div className="w-64 h-64 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-8 shadow-2xl transform hover:scale-105 transition-transform cursor-pointer active:scale-95"
        onClick={handleTap}>
        <span className="text-7xl">TAP</span>
      </div>

      <div className="w-full max-w-xs bg-gray-800 rounded-full h-4 mb-2 overflow-hidden">
        <div 
          className="bg-green-500 h-full transition-all duration-300"
          style={{ width: `${(energy / maxEnergy) * 100}%` }}
        />
      </div>
      <p className="text-sm text-gray-400">
        Energy: {energy} / {maxEnergy}
      </p>

      <p className="mt-8 text-sm text-gray-500">
        Tap the big button to mine virtual USDT!
      </p>
    </div>
  )
}

export default App
