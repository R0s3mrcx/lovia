"use client"

export function Bunny({ stage }: { stage: string }) {
  return (
    <div className={`bunny ${stage}`}>
      <div className="ear left" />
      <div className="ear right" />
      <div className="face">
        <div className="eye left" />
        <div className="eye right" />
        <div className="mouth" />
      </div>
      <div className="heart" />
    </div>
  )
}
