export interface BoardCardProps {
  type: BoardCardType;
  isOpen: boolean;
  position: [number, number];
}

export type BoardCardType = 'default' | 'blue' | 'red' | 'black';
