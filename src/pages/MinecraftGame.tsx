
import React, { useState, useEffect } from 'react';
import { toast } from '../hooks/use-toast';

type BlockType = 'dirt' | 'grass' | 'stone' | 'wood' | 'leaves';
type Block = {
  id: number;
  x: number;
  y: number;
  type: BlockType;
};

const MIN_BLOCKS = 60;
const BLOCK_SIZE = 30;
const MAX_WIDTH = 20;
const MAX_HEIGHT = 10;

const MinecraftGame = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [nextId, setNextId] = useState(1);
  const [selectedBlockType, setSelectedBlockType] = useState<BlockType>('dirt');
  const [isErasing, setIsErasing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Initialize the game world with some blocks
  useEffect(() => {
    generateInitialTerrain();
    toast({
      title: "Minecraft Game Started",
      description: "Left-click to place blocks, right-click to remove them!"
    });
  }, []);

  const generateInitialTerrain = () => {
    const newBlocks: Block[] = [];
    let id = 1;
    
    // Generate ground
    for (let x = 0; x < MAX_WIDTH; x++) {
      // Base layer (stone)
      for (let y = MAX_HEIGHT - 2; y < MAX_HEIGHT; y++) {
        newBlocks.push({ id: id++, x, y, type: 'stone' });
      }
      
      // Top layer (grass and occasional dirt)
      newBlocks.push({ 
        id: id++, 
        x, 
        y: MAX_HEIGHT - 3, 
        type: Math.random() > 0.8 ? 'dirt' : 'grass' 
      });
    }
    
    // Add some trees
    for (let i = 0; i < 2; i++) {
      const treeX = 3 + i * 8;
      
      // Tree trunk
      for (let y = MAX_HEIGHT - 6; y < MAX_HEIGHT - 3; y++) {
        newBlocks.push({ id: id++, x: treeX, y, type: 'wood' });
      }
      
      // Tree leaves
      for (let x = treeX - 1; x <= treeX + 1; x++) {
        for (let y = MAX_HEIGHT - 8; y < MAX_HEIGHT - 5; y++) {
          if (x === treeX && y === MAX_HEIGHT - 6) continue; // Skip the middle to keep trunk
          newBlocks.push({ id: id++, x, y, type: 'leaves' });
        }
      }
    }
    
    setBlocks(newBlocks);
    setNextId(id);
  };

  const handleBlockClick = (e: React.MouseEvent, x: number, y: number) => {
    if (!isPlaying) return;
    
    // Right click to remove blocks
    if (e.button === 2 || isErasing) {
      e.preventDefault();
      removeBlock(x, y);
      return;
    }
    
    // Left click to add blocks
    const existingBlock = blocks.find(block => block.x === x && block.y === y);
    if (!existingBlock) {
      addBlock(x, y);
    }
  };

  const addBlock = (x: number, y: number) => {
    if (x < 0 || x >= MAX_WIDTH || y < 0 || y >= MAX_HEIGHT) return;
    
    const newBlock = { id: nextId, x, y, type: selectedBlockType };
    setBlocks([...blocks, newBlock]);
    setNextId(nextId + 1);
  };

  const removeBlock = (x: number, y: number) => {
    const updatedBlocks = blocks.filter(block => !(block.x === x && block.y === y));
    setBlocks(updatedBlocks);
  };

  const handleWorldClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPlaying) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / BLOCK_SIZE);
    const y = Math.floor((e.clientY - rect.top) / BLOCK_SIZE);
    
    if (e.button === 2 || isErasing) {
      e.preventDefault();
      removeBlock(x, y);
    } else {
      addBlock(x, y);
    }
  };

  const resetGame = () => {
    setBlocks([]);
    setNextId(1);
    generateInitialTerrain();
    toast({
      title: "Game Reset",
      description: "The world has been regenerated!"
    });
  };

  const toggleGameState = () => {
    setIsPlaying(!isPlaying);
    toast({
      title: isPlaying ? "Game Paused" : "Game Resumed",
      description: isPlaying ? "Building has been paused" : "You can build again"
    });
  };

  const toggleEraseMode = () => {
    setIsErasing(!isErasing);
    toast({
      description: isErasing ? "Building mode activated" : "Eraser mode activated"
    });
  };

  return (
    <div className="minecraft-container">
      <div className="game-header">
        <h2 className="game-title">Simple Minecraft</h2>
        <div className="game-controls">
          <button className="game-button" onClick={toggleGameState}>
            {isPlaying ? 'Pause' : 'Resume'}
          </button>
          <button className="game-button" onClick={resetGame}>Reset</button>
          <button 
            className={`game-button ${isErasing ? 'bg-red-600 hover:bg-red-700' : ''}`} 
            onClick={toggleEraseMode}
          >
            {isErasing ? 'Build' : 'Erase'}
          </button>
        </div>
      </div>
      
      <div className="inventory">
        {(['dirt', 'grass', 'stone', 'wood', 'leaves'] as BlockType[]).map((type) => (
          <div 
            key={type} 
            className={`inventory-slot ${selectedBlockType === type ? 'selected' : ''} ${type}`}
            onClick={() => {
              setSelectedBlockType(type);
              setIsErasing(false);
            }}
          />
        ))}
      </div>
      
      <div 
        className="game-world"
        onClick={handleWorldClick}
        onContextMenu={(e) => e.preventDefault()}
        style={{ cursor: isPlaying ? (isErasing ? 'not-allowed' : 'pointer') : 'default' }}
      >
        {blocks.map((block) => (
          <div
            key={block.id}
            className={`block ${block.type}`}
            style={{
              left: block.x * BLOCK_SIZE,
              top: block.y * BLOCK_SIZE,
            }}
            onClick={(e) => handleBlockClick(e, block.x, block.y)}
            onContextMenu={(e) => handleBlockClick(e, block.x, block.y)}
          />
        ))}
      </div>

      <div className="p-3 bg-gray-900 text-white text-sm">
        <p>Left Click: Place {isErasing ? '(Eraser Mode)' : selectedBlockType} block</p>
        <p>Right Click: Remove block</p>
        <p>Blocks: {blocks.length}</p>
      </div>
    </div>
  );
};

export default MinecraftGame;
