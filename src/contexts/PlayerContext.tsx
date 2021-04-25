import { createContext, useState, ReactNode } from 'react';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  playList: (list: Episode[], index: number) => void;
  play: (episode) => void;
  setPlayingState: (state: boolean) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
};

type PlayerContextProviderProps = {
  children: ReactNode
};

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  };

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  };

  function togglePlay() {
    setIsPlaying(!isPlaying);
  };

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  };

  function playNext() {
    const nextEpisodeIndex = currentEpisodeIndex + 1;
    
    if (nextEpisodeIndex < episodeList.length) {
      setCurrentEpisodeIndex(nextEpisodeIndex);
    };
  };

  function playPrevious() {
    if(currentEpisodeIndex > 0) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    };
  };

  return (
    <PlayerContext.Provider value={{ 
      episodeList,
      currentEpisodeIndex,
      playList,
      play,
      playNext,
      playPrevious,
      isPlaying,
      togglePlay,
      setPlayingState
    }}
    >
      {children}
    </PlayerContext.Provider>
  );
};