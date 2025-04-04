
import './App.css';
import MinecraftGame from './pages/MinecraftGame';
import { Toaster } from './components/ui/sonner';

function App() {
  return (
    <>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mt-8 mb-4 gradient-heading">Simple Minecraft Game</h1>
        <p className="text-center mb-8">Click to place blocks, right-click to remove them!</p>
        <MinecraftGame />
      </div>
      <Toaster />
    </>
  );
}

export default App;
