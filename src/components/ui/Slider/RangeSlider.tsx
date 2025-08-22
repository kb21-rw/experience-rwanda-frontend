import { Slider } from "./Slider";

export default function RangeSliderDemo() {
  return (
    <div className="w-64 p-4 flex justify-center">
      <Slider defaultValue={[20, 80]} max={100} step={1} className="w-full" />
    </div>
  )
}
