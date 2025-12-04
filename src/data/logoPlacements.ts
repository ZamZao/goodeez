import { LogoPlacement } from '@/lib/utils/types';
import placementsData from './logo-placements.json';

// Map: productId -> LogoPlacement
export const logoPlacements: Record<string, LogoPlacement> = placementsData as unknown as Record<string, LogoPlacement>;
