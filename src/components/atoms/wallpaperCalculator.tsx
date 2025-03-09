import { useState } from "react";
import cx from "classnames";
import { poppins } from "@/app/fonts";

const WallpaperCalculator = () => {
  const [wallAreas, setWallAreas] = useState(
    Array(1).fill({ width: "", height: "" })
  );
  const [totalArea, setTotalArea] = useState(0);
  const [wallpaperNeeded, setWallpaperNeeded] = useState(0);
  const [selectedWallpaper, setSelectedWallpaper] = useState(5);

  const handleInputChange = (
    index: number,
    field: "width" | "height",
    value: string
  ) => {
    const updatedWalls = [...wallAreas];
    updatedWalls[index] = { ...updatedWalls[index], [field]: value };
    setWallAreas(updatedWalls);
  };

  const calculateWallpaper = () => {
    const area = wallAreas.reduce((sum, wall) => {
      const width = parseFloat(wall.width) || 0;
      const height = parseFloat(wall.height) || 0;
      return sum + width * height;
    }, 0);

    setTotalArea(area);
    setWallpaperNeeded(Math.ceil(area / selectedWallpaper));
  };

  const handleClick = () => {
    const messageText = `*Halo Wallpaper Indonesia, saya mau tanya terkait calculator wallpaper`;
    const encodedMessage = encodeURIComponent(messageText);
    let result = `https://api.whatsapp.com/send?phone=${"+6282111135402"}&text=${encodedMessage}`;

    window.open(result, "_blank");
  };

  return (
    <div
      className={`container mx-auto text-sm bg-gray-100 p-2 rounded ${cx(
        poppins,
        poppins.className
      )}`}
    >
      <div className="mb-2">
        <p>
          Kalkulator Hitung Butuh bantuan hitung kebutuhan ?{" "}
          <button onClick={handleClick} className="font-bold underline">
            hubungi kami
          </button>
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block font-medium">Ukuran Wallpaper</label>
          <select
            className="w-full p-2 border rounded-md outline-none"
            value={selectedWallpaper}
            onChange={(e) => setSelectedWallpaper(parseFloat(e.target.value))}
          >
            <option value="5">0.50m x 10m (5m2)</option>
            <option value="12.6">4.2m x 3m (12.6m2)</option>
            <option value="10.6">1.06m x 10m (10.6m2)</option>
            <option value="5.3">0.53m x 10m (5.3m2)</option>
            <option value="16.536">1.06m x 15.6m (16.536m2)</option>
          </select>
        </div>
        {wallAreas.map((wall, index) => (
          <div key={index} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Lebar (m)</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md outline-none"
                placeholder="Lebar"
                value={wall.width}
                onChange={(e) =>
                  handleInputChange(index, "width", e.target.value)
                }
              />
            </div>
            <div>
              <label className="block font-medium">Panjang (m)</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md outline-none"
                placeholder="Panjang"
                value={wall.height}
                onChange={(e) =>
                  handleInputChange(index, "height", e.target.value)
                }
              />
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center">
          <span className="font-medium">Total Area Dinding (m2):</span>
          <input
            className="w-32 p-2 border rounded-md outline-none"
            value={totalArea}
            readOnly
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">Wallpaper Yang Dibutuhkan (roll):</span>
          <input
            className="w-32 p-2 border rounded-md outline-none"
            value={wallpaperNeeded}
            readOnly
          />
        </div>
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          onClick={calculateWallpaper}
        >
          HITUNG WALLPAPER
        </button>
      </div>
    </div>
  );
};

export default WallpaperCalculator;
