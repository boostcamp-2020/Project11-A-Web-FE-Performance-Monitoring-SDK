import { Level } from '@santry/types';

interface Params {
  isError: boolean;
  level: string;
}
export const getLevel = ({ isError, level }: Params) => {
  if (Level.has(level)) return { level };
  if (isError) return { level: 'error' };
  return { level: 'info' };
};
