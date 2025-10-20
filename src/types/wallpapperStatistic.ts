export interface WallpaperStatisticProps {
  "wallpaper-by-style": WallpaperByStyle[];
  "wallpaper-by-color": WallpaperByColor[];
  "wallpaper-by-designer": WallpaperByDesigner[];
}

export interface WallpaperByStyle {
  name: string;
  count: number;
}

export interface WallpaperByColor {
  name: string;
  count: number;
}

export interface WallpaperByDesigner {
  name: string;
  count: number;
}
