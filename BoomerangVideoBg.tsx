import { useEffect, useRef, useState } from 'react'

/* The first source is your own copy (put it in /public/videos, optional). If that file isn't
   there the browser automatically falls through to the Mixkit preview, so the hero plays
   either way. Self-hosting is better for production: faster, and not dependent on their CDN. */
const SOURCES = [
  '/videos/hero-construction.mp4',
  'https://assets.mixkit.co/videos/4010/4010-720.mp4',
]
const POSTER = 'https://assets.mixkit.co/videos/4010/4010-thumb-720-0.jpg'

const FADE = 1.2                              // seconds of crossfade at each loop point
const GRADE = 'grayscale(1) contrast(1.05)'   // monochrome keeps the page minimal; set 'none' for colour

/* Full-bleed looping background. Two copies of the clip take turns: shortly before one
   ends, the other starts from the top and fades in, so the loop has no visible jump.
   Plays only while on screen; stays on the poster frame for reduced-motion visitors. */
export default function BoomerangVideoBg() {
  const wrap = useRef<HTMLDivElement>(null)
  const a = useRef<HTMLVideoElement>(null)
  const b = useRef<HTMLVideoElement>(null)
  const vids = [a, b]
  const frontRef = useRef(0)
  const switching = useRef(false)
  const [front, setFront] = useState(0)

  const onTime = (i: number) => {
    const v = vids[i].current
    const o = vids[1 - i].current
    if (!v || !o || frontRef.current !== i || switching.current || !v.duration) return
    if (v.duration - v.currentTime > FADE) return
    switching.current = true
    o.currentTime = 0
    void o.play().catch(() => {})
    frontRef.current = 1 - i
    setFront(1 - i)
  }

  const onEnded = (i: number) => {
    const v = vids[i].current
    if (!v) return
    v.pause()
    v.currentTime = 0
    switching.current = false
  }

  useEffect(() => {
    const box = wrap.current
    if (!box || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const play = () => {
      void vids[frontRef.current].current?.play().catch(() => {})
      if (switching.current) void vids[1 - frontRef.current].current?.play().catch(() => {})
    }
    const pause = () => vids.forEach((r) => r.current?.pause())

    if (!('IntersectionObserver' in window)) { play(); return }
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? play() : pause()))
    io.observe(box)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={wrap} className="absolute inset-0 z-0 overflow-hidden bg-surface" aria-hidden="true">
      {[0, 1].map((i) => (
        <video
          key={i}
          ref={vids[i]}
          poster={POSTER}
          muted
          playsInline
          preload="auto"
          onTimeUpdate={() => onTime(i)}
          onEnded={() => onEnded(i)}
          className="absolute inset-0 h-full w-full object-cover object-center"
          style={{ opacity: front === i ? 1 : 0, transition: `opacity ${FADE}s linear`, filter: GRADE }}
        >
          {SOURCES.map((src) => <source key={src} src={src} type="video/mp4" />)}
        </video>
      ))}
    </div>
  )
}