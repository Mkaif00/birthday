
export enum ExperienceState {
  LANDING = 'LANDING',
  TRANSITIONING = 'TRANSITIONING',
  REVEALED = 'REVEALED'
}

export interface BalloonProps {
  position: [number, number, number];
  color: string;
  delay?: number;
}
