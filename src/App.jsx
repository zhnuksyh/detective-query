import { useGame } from './state/useGame.js'
import MainMenu from './screens/MainMenu.jsx'
import LevelSelect from './screens/LevelSelect.jsx'
import Options from './screens/Options.jsx'
import Credits from './screens/Credits.jsx'
import GameDashboard from './screens/GameDashboard.jsx'

export default function App() {
  const game = useGame()
  const crt = game.save.settings.crt

  return (
    <div
      className={`h-full w-full bg-zinc-950 text-zinc-200 ${crt ? 'crt' : ''}`}
      style={{ fontSize: `${game.save.settings.textScale}rem` }}
    >
      {game.screen === 'menu' && <MainMenu game={game} />}
      {game.screen === 'levels' && <LevelSelect game={game} />}
      {game.screen === 'options' && <Options game={game} />}
      {game.screen === 'credits' && <Credits game={game} />}
      {game.screen === 'game' && <GameDashboard game={game} />}
    </div>
  )
}
