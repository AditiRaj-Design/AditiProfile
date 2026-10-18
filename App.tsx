import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, MouseEvent, ReactNode, RefObject } from 'react'
import { ArrowRight } from 'lucide-react'
import BoomerangVideoBg from './components/BoomerangVideoBg'

/* ───────────────────────── Data ───────────────────────── */

const EMAIL = 'aditipiro@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/aditi-raj-3061281a4/'
const S = {
  top: 'Structural Engineering Enquiry',
  project: 'Structural Engineering Project Enquiry',
  general: 'Professional Opportunity — Aditi Raj',
}
const mailto = (subject: string) => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`
const gmail = (subject: string) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}&su=${encodeURIComponent(subject)}`
const isMobile = () =>
  typeof navigator !== 'undefined' &&
  (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.maxTouchPoints > 1 && /Mac/.test(navigator.platform)))

/* Desktop: opens a Gmail compose window (To + Subject filled in) in a new tab, no mail app setup needed.
   Phones/tablets: opens the device's default mail app through mailto. */
const mailProps = (subject: string) => ({
  href: gmail(subject),
  target: '_blank',
  rel: 'noopener noreferrer',
  onClick: (e: MouseEvent<HTMLAnchorElement>) => {
    if (isMobile()) { e.preventDefault(); window.location.href = mailto(subject) }
  },
})

const NAV = [['About', '#about'], ['Experience', '#experience'], ['Projects', '#projects'], ['Lab', '#lab'], ['Expertise', '#expertise'], ['Contact', '#contact']] as const

const PROJECTS = [
  { name: 'Sree Varaha', place: 'Hyderabad', config: 'B4+G+Mezz+54F', floors: 54 },
  { name: 'Lansum MK Encanto', place: 'Hyderabad', config: 'B4+G+60F', floors: 60 },
  { name: 'Karlan CMR One', place: 'Visakhapatnam', config: 'B4+2Stilt+G+24F', floors: 24 },
  { name: 'Vrindavan', place: 'Hyderabad', config: 'B4+G+Mezz+49F', floors: 49 },
]

const JOBS = [
  {
    role: 'Engineer', org: 'DAR Al-Handasah', when: 'September 2026 – Present', where: '', projects: false, rev: '03',
    pts: ['Involved in design review projects based on ACI and ASCE codes.'],
  },
  {
    role: 'Design Engineer', org: 'ARSA Consultancy', when: 'June 2024 – August 2026', where: 'Bengaluru, Karnataka, India', projects: true, rev: '02',
    pts: [
      'Carried out structural design for high-rise residential towers exceeding 50 floors using ETABS and SAFE, covering footing design through final submission in compliance with BIS standards.',
      'Coordinated with architects and the structural team to finalise framing plans, align design decisions, and track submission deadlines across concurrent projects.',
      'Reviewed structural drawings and design outputs for accuracy, coordinated with relevant teams to address review comments, and supported approval processes.',
    ],
  },
  {
    role: 'Graduate Engineer', org: 'AtkinsRéalis', when: 'August 2023 – May 2024', where: 'Bengaluru, Karnataka, India', projects: false, rev: '01',
    pts: [
      'Led structural modelling of international projects using Robot Structural Analysis (RSA).',
      'Developed and refined 3D structural models to simulate loading conditions and structural behaviour.',
      'Applied working knowledge of Eurocode design principles, including load combinations, partial safety factors, and limit state design.',
      'Performed early-age thermal crack assessments for reinforced concrete elements in accordance with CIRIA C766 guidelines.',
      'Contributed to technical reports documenting modelling assumptions, analysis results, and design recommendations.',
    ],
  },
]

const SKILLS: [string, string[]][] = [
  ['Structural analysis and design', ['ETABS', 'SAFE', 'STAAD.Pro', 'Robot Structural Analysis', 'Prokon']],
  ['Drafting and BIM', ['AutoCAD', 'Revit']],
  ['Codes and standards', ['BIS Standards', 'Eurocode', 'ACI and ASCE codes — design-review project exposure']],
  ['Technical tools', ['Microsoft Excel', 'Microsoft Word']],
]
/* Flattened into a schedule: Mark | Item | Category */
const SCHEDULE = SKILLS.flatMap(([cat, items]) => items.map((item) => ({ cat, item })))
  .map((r, i) => ({ ...r, mark: `S${String(i + 1).padStart(2, '0')}` }))


const ACADEMIC = [
  ['Fly Ash Based Fibre Reinforced Concrete', 'Experimental investigation of mechanical properties, including compressive and flexural strength.'],
  ['Steel vs GFRP Reinforced RC Frames under Cyclic Loading', 'Comparative seismic performance evaluation of reinforced concrete frames.'],
  ['Solid Waste Management Study', 'Campus-level assessment and actionable recommendations for REVA University.'],
  ['Topographic Survey using Total Station', 'Survey project involving precise mapping of Kaivara, Chikkaballapur.'],
]

const EDUCATION = [
  ['M.Tech — Structural Engineering', 'Manipal Institute of Technology', 'CGPA 8.03/10'],
  ['B.Tech — Civil Engineering', 'REVA University', 'CGPA 8.23/10'],
  ['Pre-University (Science)', 'Cluny Convent PU College, 2016', '83.66%'],
]

const CERTS = [
  ['AutoCAD & Revit', 'CADD Centre'],
  ['QGIS', 'Skyfi Labs'],
  ['Advanced Survey (Total Station)', 'Lawrence & Mayo'],
]

const STATS: { to: number; suffix: string; label: string }[] = [
  { to: 3, suffix: '+', label: 'Years in structural design' },
  { to: 4, suffix: '', label: 'High-rise towers designed' },
  { to: 60, suffix: '', label: 'Storeys in the tallest tower' },
  { to: 4, suffix: '', label: 'Code families: BIS, Eurocode, ACI, ASCE' },
]

/* ───────────────────────── Shared styles ───────────────────────── */

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink'
const btn = `inline-flex items-center justify-center gap-2 bg-ink text-white text-sm font-medium rounded-md hover:bg-ink/85 transition-colors duration-200 ${focus}`
const btnLine = `inline-flex items-center justify-center border border-ink text-ink text-sm font-medium rounded-md hover:bg-ink hover:text-white transition-colors duration-200 ${focus}`
const label = 'text-[11px] uppercase tracking-[0.2em] text-ink/50 font-medium'
const card = 'bg-surface'
const d = (sec: number) => ({ '--d': `${sec}s` }) as CSSProperties
const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ───────────────────────── Hooks ───────────────────────── */

/* True once the element has been seen (never resets). */
function useInView<T extends Element>(ref: RefObject<T | null>, threshold = 0.25) {
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced() || !('IntersectionObserver' in window)) { setV(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); io.disconnect() } }, { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, threshold])
  return v
}

/* True only while the element is on screen. */
function useVisible<T extends Element>(ref: RefObject<T | null>) {
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => setV(e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
  return v
}

/* ───────────────────────── Primitives ───────────────────────── */

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced() || !('IntersectionObserver' in window)) { setShown(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect() } }, { rootMargin: '0px 0px -8% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} data-shown={shown}
      className={`group transition-all duration-700 ease-out ${shown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} ${className}`}>
      {children}
    </div>
  )
}

/* Architectural dimension line that draws itself under each heading. */
function Dim() {
  return (
    <div className="relative mt-6 h-3 w-full max-w-xs" aria-hidden="true">
      <div className="absolute left-0 right-0 top-1/2 h-px origin-left scale-x-0 bg-ink/60 transition-transform delay-300 duration-[1400ms] ease-out group-data-[shown=true]:scale-x-100" />
      <div className="absolute left-0 top-0 h-3 w-px rotate-45 bg-ink opacity-0 transition-opacity delay-300 group-data-[shown=true]:opacity-100" />
      <div className="absolute right-0 top-0 h-3 w-px rotate-45 bg-ink opacity-0 transition-opacity delay-[1500ms] group-data-[shown=true]:opacity-100" />
    </div>
  )
}

function Section({ ax, id, tag, title, children }: { ax: string; id: string; tag: string; title: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="border-t border-line py-20 md:py-32">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <Reveal>
          <p className={`${label} flex items-center gap-3`}>
            <span className="grid h-7 w-7 place-items-center rounded-full border border-ink/60 font-serif text-[12px] tracking-normal text-ink">{ax}</span>
            {tag}
          </p>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl font-normal leading-tight tracking-tight sm:text-4xl md:text-5xl">{title}</h2>
          <Dim />
        </Reveal>
        <Reveal delay={120} className="mt-12 md:mt-16">{children}</Reveal>
      </div>
    </section>
  )
}

function Mail({ subject, children, className = '' }: { subject: string; children: ReactNode; className?: string }) {
  return (
    <a {...mailProps(subject)} className={`group inline-flex items-center gap-2 ${className}`}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </a>
  )
}

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const seen = useInView(ref)
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!seen) return
    if (reduced()) { setN(to); return }
    const t0 = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1400)
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [seen, to])
  return <span ref={ref}>{n}{suffix}</span>
}

/* Elevation gauge: a fixed ruler that fills as you scroll. Only on very wide screens,
   where the page margins are wider than the gauge, so it can never touch content. */
function LevelGauge() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const on = () => {
      const m = document.documentElement.scrollHeight - window.innerHeight
      setP(m > 0 ? Math.min(1, window.scrollY / m) : 0)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <div aria-hidden="true" className="pointer-events-none fixed right-8 top-1/2 z-40 hidden h-72 w-px -translate-y-1/2 bg-white/30 text-white mix-blend-difference 2xl:block">
      <div className="absolute inset-0 origin-bottom bg-white" style={{ transform: `scaleY(${p})` }} />
      {Array.from({ length: 13 }, (_, i) => (
        <span key={i} className="absolute right-0 h-px w-2 bg-white/70" style={{ bottom: `${(i / 12) * 100}%` }} />
      ))}
      <span className="absolute right-3 translate-y-1/2 whitespace-nowrap text-[10px] tabular-nums tracking-wide" style={{ bottom: `${p * 100}%` }}>
        +{(p * 38.4).toFixed(2)}
      </span>
    </div>
  )
}

/* Vertical rule that fills as the section scrolls; job cards sit on it. */
function Timeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [p, setP] = useState(0)
  useEffect(() => {
    const on = () => {
      const r = ref.current?.getBoundingClientRect()
      if (!r) return
      setP(reduced() ? 1 : Math.min(1, Math.max(0, (window.innerHeight * 0.65 - r.top) / r.height)))
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on) }
  }, [])
  return (
    <div ref={ref} className="relative space-y-3 md:pl-8">
      <span aria-hidden="true" className="absolute bottom-2 left-[5px] top-2 hidden w-px bg-ink/15 md:block" />
      <span aria-hidden="true" className="absolute bottom-2 left-[5px] top-2 hidden w-px origin-top bg-ink md:block" style={{ transform: `scaleY(${p})` }} />
      {children}
    </div>
  )
}


/* ───────────────────────── Frame lab (interactive) ───────────────────────── */

const N = 5            // storeys
const BAYS = 3
const BAY_W = 120      // drawing units
const ST_H = 64        // drawing units per storey
const X0 = 120         // left edge of frame
const Y0 = 372         // base of frame
const STOREY_MM = 3200
const LIMIT = 0.004    // storey drift limit, 0.004 h (IS 1893 seismic)
const GAIN = 1.2       // drawing px per mm of displacement (≈60× exaggeration)
const MAX_OFF = 84     // clamp so the frame can never reach the elevation marks
const WHITE = '#ffffff'
const INK = '#191919'

/* Simplified shear-building model: triangular lateral load, uniform storey stiffness. */
function solve(vb: number, k: number) {
  const sum = (N * (N + 1)) / 2
  const F = Array.from({ length: N }, (_, i) => (vb * (i + 1)) / sum)
  const V = F.map((_, i) => F.slice(i).reduce((a, b) => a + b, 0))
  const drift = V.map((v) => v / k)
  const cum = drift.reduce<number[]>((a, x) => [...a, (a[a.length - 1] ?? 0) + x], [])
  const ratio = drift.map((x) => x / STOREY_MM)
  return { F, drift, cum, ratio }
}

const heat = (r: number, base: string) =>
  `color-mix(in srgb, var(--color-accent) ${Math.round(Math.min(1, r / LIMIT) * 100)}%, ${base})`

function FrameLab() {
  const wrap = useRef<HTMLDivElement>(null)
  const visible = useVisible(wrap)
  const [vb, setVb] = useState(900)
  const [k, setK] = useState(150)
  const [touched, setTouched] = useState(false)

  /* Gentle self-running sway until the visitor takes control. Pauses off-screen. */
  useEffect(() => {
    if (!visible || touched || reduced()) return
    const t0 = performance.now()
    let raf = 0
    const tick = (t: number) => {
      setVb(Math.round(450 - 450 * Math.cos(((t - t0) / 1000) * 1.1)))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [visible, touched])

  const setLoad = (v: number) => { setTouched(true); setVb(v) }
  const { F, cum, ratio } = solve(vb, k)
  const roof = cum[N - 1]
  const maxRatio = Math.max(...ratio)
  const over = maxRatio / LIMIT > 1
  const off = [0, ...cum.map((c) => Math.min(c * GAIN, MAX_OFF))]
  const px = (c: number) => X0 + c * BAY_W
  const py = (s: number) => Y0 - s * ST_H

  const ghost =
    Array.from({ length: BAYS + 1 }, (_, c) => `M${px(c)} ${Y0}V${py(N)}`).join('') +
    Array.from({ length: N }, (_, i) => `M${X0} ${py(i + 1)}H${px(BAYS)}`).join('')

  return (
    <div ref={wrap} className="grid gap-3 lg:grid-cols-[1.25fr_1fr]">
      {/* Dark blueprint panel */}
      <div className="blueprint bg-ink p-4 text-white sm:p-6">
        <ul className="mb-3 flex flex-wrap gap-x-6 gap-y-1.5 text-[11px] text-white/60">
          <li className="flex items-center gap-2"><span aria-hidden="true" className="h-0.5 w-4 bg-accent" />Lateral force on each floor</li>
          <li className="flex items-center gap-2"><span aria-hidden="true" className="h-0 w-4 border-t border-dashed border-white/60" />Original position</li>
          <li className="flex items-center gap-2"><span aria-hidden="true" className="h-1.5 w-4 bg-gradient-to-r from-white to-accent" />Drift nearing the limit</li>
        </ul>
        <svg viewBox="0 0 680 410" className="block h-auto w-full" role="img"
          aria-label={`Five-storey moment frame under ${vb} kilonewtons base shear. Roof displacement ${roof.toFixed(1)} millimetres. Maximum storey drift ${(maxRatio * 100).toFixed(2)} percent against a limit of 0.40 percent.`}>
          <defs>
            <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse">
              <line x1="0" y1="8" x2="8" y2="0" stroke={WHITE} strokeWidth=".8" opacity=".35" />
            </pattern>
          </defs>

          {/* ground + hatch + pin supports */}
          <line x1="60" x2="572" y1="386" y2="386" stroke={WHITE} strokeWidth="1.5" />
          <rect x="60" y="386" width="512" height="14" fill="url(#hatch)" />
          {Array.from({ length: BAYS + 1 }, (_, c) => (
            <polygon key={c} points={`${px(c)},${Y0} ${px(c) - 9},386 ${px(c) + 9},386`} fill={INK} stroke={WHITE} strokeWidth="1.2" />
          ))}

          {/* undeformed ghost */}
          <path d={ghost} fill="none" stroke={WHITE} strokeOpacity=".3" strokeDasharray="4 4" strokeWidth="1" />

          {/* beams */}
          {Array.from({ length: N }, (_, i) => (
            <line key={'b' + i} x1={px(0) + off[i + 1]} x2={px(BAYS) + off[i + 1]} y1={py(i + 1)} y2={py(i + 1)}
              strokeWidth="5" strokeLinecap="round" style={{ stroke: heat(ratio[i], WHITE) }} />
          ))}
          {/* columns */}
          {Array.from({ length: N }, (_, i) =>
            Array.from({ length: BAYS + 1 }, (_, c) => (
              <line key={`c${i}-${c}`} x1={px(c) + off[i]} y1={py(i)} x2={px(c) + off[i + 1]} y2={py(i + 1)}
                strokeWidth="3.5" strokeLinecap="round" style={{ stroke: heat(ratio[i], WHITE) }} />
            )),
          )}
          {/* nodes */}
          {Array.from({ length: N }, (_, i) =>
            Array.from({ length: BAYS + 1 }, (_, c) => (
              <circle key={`n${i}-${c}`} cx={px(c) + off[i + 1]} cy={py(i + 1)} r="3.5" fill={INK} stroke={WHITE} strokeWidth="1.2" />
            )),
          )}

          {/* lateral load arrows */}
          {F.map((f, i) => {
            const len = f * 0.12
            if (len < 10) return null
            const tip = X0 + off[i + 1] - 6
            const y = py(i + 1)
            return (
              <g key={'f' + i} stroke="var(--color-accent)" fill="var(--color-accent)">
                <line x1={tip - len} x2={tip - 7} y1={y} y2={y} strokeWidth="2.5" />
                <polygon points={`${tip},${y} ${tip - 9},${y - 5} ${tip - 9},${y + 5}`} stroke="none" />
              </g>
            )
          })}

          {/* elevation dimension line + level marks */}
          <line x1="584" x2="584" y1={Y0} y2={py(N)} stroke={WHITE} strokeWidth="1" opacity=".6" />
          {Array.from({ length: N + 1 }, (_, s) => (
            <g key={'e' + s}>
              <line x1="579" x2="589" y1={py(s) + 5} y2={py(s) - 5} stroke={WHITE} strokeWidth="1" opacity=".8" />
              <text x="598" y={py(s) + 5} fontSize="17" fill={WHITE} fillOpacity=".6" className="font-sans">+{(s * 3.2).toFixed(2)}</text>
            </g>
          ))}

          <text x={X0 + (BAYS * BAY_W) / 2} y="30" textAnchor="middle" fontSize="18" fill={WHITE} className="font-serif">
            Roof Δ = {roof.toFixed(1)} mm
          </text>
        </svg>
        <p className="mt-3 text-xs leading-relaxed text-white/50">
          Simplified shear-building model: triangular lateral load, uniform storey stiffness. Illustrative only, not a design calculation. Deflections exaggerated about 60×.
        </p>
      </div>

      <div className={`${card} p-6 sm:p-8`}>
        <p className={label}>Choose a load case</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {([['Service wind', 400], ['Design seismic', 900], ['Extreme', 1500]] as const).map(([n, v]) => (
            <button key={n} type="button" onClick={() => setLoad(v)} aria-pressed={touched && vb === v}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 ${focus} ${touched && vb === v ? 'border-ink bg-ink text-white' : 'border-ink/30 hover:border-ink'}`}>
              {n}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-7">
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="vb" className="text-sm font-medium">Total sideways force</label>
              <output htmlFor="vb" className="font-serif text-2xl tabular-nums">{vb} kN</output>
            </div>
            <input id="vb" type="range" min={0} max={1500} step={10} value={vb} onChange={(e) => setLoad(Number(e.target.value))} className="mt-3 w-full accent-ink" />
          </div>
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="kk" className="text-sm font-medium">Stiffness of each storey</label>
              <output htmlFor="kk" className="font-serif text-2xl tabular-nums">{k} kN/mm</output>
            </div>
            <input id="kk" type="range" min={80} max={300} step={5} value={k} onChange={(e) => { setTouched(true); setK(Number(e.target.value)) }} className="mt-3 w-full accent-ink" />
          </div>
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-px border border-line bg-line">
          <div className="bg-white p-4"><dt className={label}>Roof displacement</dt><dd className="mt-1.5 font-serif text-xl tabular-nums">{roof.toFixed(1)} mm</dd></div>
          <div className="bg-white p-4"><dt className={label}>Roof drift</dt><dd className="mt-1.5 font-serif text-xl tabular-nums">{roof > 0 ? `H/${Math.round((N * STOREY_MM) / roof)}` : '—'}</dd></div>
          <div className="bg-white p-4"><dt className={label}>Max storey drift</dt><dd className="mt-1.5 font-serif text-xl tabular-nums">{(maxRatio * 100).toFixed(2)}%</dd></div>
          <div className="bg-white p-4">
            <dt className={label}>Limit 0.40%</dt>
            <dd className={`mt-1.5 font-serif text-xl ${over ? 'text-accent' : ''}`}>{over ? 'Exceeded' : 'Within limit'}</dd>
          </div>
        </dl>

        <ul className="mt-6 space-y-2" aria-label="Storey drift as a share of the limit">
          {Array.from({ length: N }, (_, i) => N - i).map((s) => (
            <li key={s} className="grid grid-cols-[2rem_1fr_3.5rem] items-center gap-3 text-xs">
              <span className="text-ink/50">L{s}</span>
              <span className="h-1.5 bg-line" aria-hidden="true">
                <span className="block h-full" style={{ width: `${Math.min(100, (ratio[s - 1] / LIMIT) * 100)}%`, background: heat(ratio[s - 1], INK) }} />
              </span>
              <span className="text-right tabular-nums text-ink/70">{((ratio[s - 1] / LIMIT) * 100).toFixed(0)}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ───────────────────────── Projects ───────────────────────── */

/* The four towers on one elevation sheet at a shared scale; they grow from the ground when scrolled into view.
   Names sit in an HTML row beneath the drawing (same four columns), so text stays readable on phones. */
function Skyline({ active, setActive }: { active: number; setActive: (i: number) => void }) {
  const ref = useRef<SVGSVGElement>(null)
  const shown = useInView(ref)
  const fl = 4.2
  const ground = 284
  return (
    <div className="border border-line bg-white p-4 sm:p-8">
      <svg ref={ref} className="block h-auto w-full" viewBox="0 0 900 322" role="img"
        aria-label="Illustrative elevation comparing four towers at one scale by floor count: Sree Varaha 54, Lansum MK Encanto 60, Karlan CMR One 24, Vrindavan 49">
        <defs>
          <pattern id="floors" width="10" height={fl} patternUnits="userSpaceOnUse">
            <line x1="0" x2="10" y1={fl - 0.4} y2={fl - 0.4} stroke={INK} strokeWidth=".5" opacity=".4" />
          </pattern>
        </defs>
        <line x1="0" x2="900" y1={ground} y2={ground} stroke={INK} strokeWidth="1.5" />
        {PROJECTS.map((p, i) => {
          const cx = (900 * (2 * i + 1)) / 8, w = 120, h = p.floors * fl, x = cx - w / 2, on = active === i
          return (
            <g key={p.name} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)} style={{ opacity: on ? 1 : 0.4, transition: 'opacity .3s', cursor: 'pointer' }}>
              <g style={{ transformBox: 'fill-box', transformOrigin: '50% 100%', transform: shown ? 'scaleY(1)' : 'scaleY(0)', transition: `transform 1.4s cubic-bezier(.22,1,.36,1) ${i * 0.15}s` }}>
                <rect x={x} y={ground - h} width={w} height={h} fill="url(#floors)" stroke={INK} strokeWidth="1.5" />
                <rect x={cx - 14} y={ground - h} width="28" height={h} fill="none" stroke={on ? '#e4572e' : INK} strokeWidth="1.2" opacity={on ? 1 : 0.5} />
              </g>
              <rect x={x - 8} y={ground} width={w + 16} height="22" fill="none" stroke={INK} strokeOpacity=".35" strokeDasharray="3 3" />
              <text x={cx} y={ground - h - 12} textAnchor="middle" fontSize="24" fill={INK} className="font-serif"
                style={{ opacity: shown ? 1 : 0, transition: `opacity .6s ${0.9 + i * 0.15}s` }}>{p.floors}</text>
            </g>
          )
        })}
      </svg>

      <ol className="mt-4 grid grid-cols-4">
        {PROJECTS.map((p, i) => (
          <li key={p.name}>
            <button type="button" onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}
              aria-pressed={active === i}
              className={`w-full px-1 py-1 text-center transition-opacity duration-300 ${focus} ${active === i ? 'opacity-100' : 'opacity-50'}`}>
              <span className="block font-serif text-xs leading-tight sm:text-base">{p.name}</span>
              <span className="mt-1 hidden text-xs text-ink/60 sm:block">{p.config}</span>
            </button>
          </li>
        ))}
      </ol>

      <p className="mt-4 text-xs leading-relaxed text-ink/50">
        Illustrative elevations at a shared scale; figures above each tower are floor counts, the outlined strip is the core. Dashed zone: basements. Not drawings or photographs of the named buildings.
      </p>
    </div>
  )
}

function ProjectsSection() {
  const [active, setActive] = useState(0)
  return (
    <Section ax="C" id="projects" tag="Selected projects · ARSA Consultancy" title="Four towers, from footing to submission.">
      <Skyline active={active} setActive={setActive} />
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <article key={p.name} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)}
            className={`border p-6 transition-colors duration-200 sm:p-8 ${active === i ? 'border-ink bg-surface' : 'border-line bg-white'}`}>
            <h3 className="font-serif text-2xl font-normal tracking-tight md:text-3xl">{p.name}</h3>
            <p className="mt-1 text-sm text-ink/60">{p.place}</p>
            <p className="mt-5 text-sm font-medium">{p.config}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">Structural design using ETABS and SAFE, from footing design through final submission, in compliance with BIS standards.</p>
          </article>
        ))}
      </div>
    </Section>
  )
}

/* ───────────────────────── Header ───────────────────────── */

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(window.scrollY > 24)
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])
  const solid = scrolled || open
  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${solid ? 'border-line bg-white/95 backdrop-blur-md' : 'border-transparent bg-transparent'}`}>
      <div className="flex items-center justify-between gap-4 px-6 py-3.5 sm:px-10 sm:py-4 md:px-14">
        <a href="#top" className="leading-tight" aria-label="Aditi Raj, back to top">
          <span className="block text-base font-semibold tracking-[0.2em]">ADITI RAJ</span>
          <span className="hidden text-[9px] tracking-[0.2em] text-ink/60 sm:block">STRUCTURAL DESIGN ENGINEER</span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV.map(([l, h]) => <a key={h} href={h} className="text-sm text-ink/70 transition-colors duration-200 hover:text-ink">{l}</a>)}
        </nav>
        <div className="flex items-center gap-1">
          <a {...mailProps(S.top)} className={`${btn} group px-4 py-2.5 sm:px-5`}>
            <span>Email<span className="hidden sm:inline"> for Enquiries</span></span>
            <ArrowRight className="h-4 w-4 -rotate-45 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
          <button type="button" className={`px-3 py-2.5 text-sm lg:hidden ${focus}`} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
      {open && (
        <ul id="mobile-menu" className="border-t border-line px-6 pb-3 sm:px-10 lg:hidden">
          {NAV.map(([l, h]) => (
            <li key={h} className="border-b border-line last:border-0">
              <a href={h} onClick={() => setOpen(false)} className="block py-3 text-ink/80">{l}</a>
            </li>
          ))}
        </ul>
      )}
      <div aria-hidden="true" style={{ transform: `scaleX(${progress})` }}
        className={`absolute bottom-0 left-0 h-[2px] w-full origin-left bg-ink transition-opacity duration-200 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />
    </header>
  )
}

/* ───────────────────────── Hero pieces ───────────────────────── */

/* Drawing-sheet border with corner registration marks. Sits below the header and behind all content. */
function SheetFrame() {
  const corners = ['left-0 top-0 border-l-2 border-t-2', 'right-0 top-0 border-r-2 border-t-2', 'bottom-0 left-0 border-b-2 border-l-2', 'bottom-0 right-0 border-b-2 border-r-2']
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-2 bottom-2 top-[72px] z-[2] border border-ink/15 sm:inset-x-3 sm:bottom-3">
      {corners.map((c) => <span key={c} className={`absolute h-4 w-4 border-ink ${c}`} />)}
    </div>
  )
}

/* A 24-storey tower with core and two outrigger levels: grows from the ground, then sways in the wind.
   Desktop only, in its own grid column so it never touches the text. */
{/*function HeroTower() {
  const FL = 15, G = 470, TOP = G - 24 * FL
  const marks = [0, 6, 12, 18, 24]
  const outriggers = [8, 16].map((f) => G - f * FL)
  return (
    <figure className="hidden border border-line bg-white/75 p-5 backdrop-blur-sm lg:block">
      <svg viewBox="0 0 360 520" className="mx-auto block h-[min(54svh,520px)] w-auto" role="img"
        aria-label="Illustrative 24-storey tower with a central core and two outrigger levels, swaying gently under wind load">
        <defs>
          <pattern id="tf" width="10" height={FL} patternUnits="userSpaceOnUse">
            <line x1="0" x2="10" y1={FL - 0.5} y2={FL - 0.5} stroke={INK} strokeWidth=".6" opacity=".3" />
          </pattern>
        </defs>

        <line x1="20" x2="340" y1={G} y2={G} stroke={INK} strokeWidth="1.5" />
        <rect x="100" y={G} width="160" height="34" fill="none" stroke={INK} strokeOpacity=".35" strokeDasharray="3 3" />

        <g className="tower-sway">
          <g className="tower-grow">
            <rect x="120" y={TOP} width="120" height={24 * FL} fill="url(#tf)" stroke={INK} strokeWidth="1.5" />
            <rect x="160" y={TOP} width="40" height={24 * FL} fill="#fff" fillOpacity=".7" stroke={INK} strokeOpacity=".6" strokeWidth="1.2" />
            {outriggers.map((y) => (
              <g key={y} stroke="var(--color-accent)" strokeWidth="1.4">
                <line x1="120" y1={y} x2="160" y2={y - 30} /><line x1="120" y1={y - 30} x2="160" y2={y} />
                <line x1="200" y1={y} x2="240" y2={y - 30} /><line x1="200" y1={y - 30} x2="240" y2={y} />
              </g>
            ))}
            <polyline points={`150,${TOP} 180,${TOP - 48} 210,${TOP}`} fill="none" stroke={INK} strokeWidth="1.5" />
            <line x1="180" x2="180" y1={TOP - 48} y2={TOP - 70} stroke={INK} strokeWidth="1.5" />
          </g>
        </g> */}

        {/*
        {/* wind arrows: tip at x=80 plus a 10px pulse stays clear of the swaying tower (left edge ≥ 113) */}
        {[170, 260, 350].map((y, i) => (
          <g key={y} className="wind" style={d(i * 0.3)} stroke="var(--color-accent)" fill="var(--color-accent)">
            <line x1="12" x2="68" y1={y} y2={y} strokeWidth="2.5" />
            <polygon points={`80,${y} 69,${y - 5.5} 69,${y + 5.5}`} stroke="none" />
          </g>
        ))}

        {/* elevation scale */}
        {/*<line x1="300" x2="300" y1={G} y2={TOP} stroke={INK} strokeWidth="1" opacity=".6" />
        {marks.map((f) => (
          <g key={f}>
            <line x1="295" x2="305" y1={G - f * FL + 5} y2={G - f * FL - 5} stroke={INK} strokeWidth="1" opacity=".8" />
            <text x="312" y={G - f * FL + 4} fontSize="12" fill={INK} fillOpacity=".6" className="font-sans">+{(f * 3).toFixed(2)}</text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-3 text-center text-[11px] text-ink/50">Illustrative 24-storey tower with core and two outrigger levels</figcaption>
    </figure>
  )
}
*/}

/* Engineering-drawing title block. The cursor cell updates the DOM directly, so moving the mouse never re-renders. */
function TitleBlock() {
  const xy = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    let raf = 0
    const on = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (xy.current) xy.current.textContent = `${String(Math.round(e.clientX)).padStart(4, '0')} / ${String(Math.round(e.clientY)).padStart(4, '0')}`
      })
    }
    window.addEventListener('pointermove', on)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', on) }
  }, [])

  const cells: [string, ReactNode][] = [
    ['Project', 'Portfolio — Aditi Raj'],
    ['Discipline', 'Structural design'],
    ['Status', <span key="s" className="inline-flex items-center gap-2"><span className="h-2 w-2 animate-pulse rounded-full bg-accent" aria-hidden="true" />Open to roles &amp; collaborations</span>],
    ['Scale', 'NTS'],
    ['Location', 'Bengaluru, India'],
    ['Cursor (px)', <span key="c" ref={xy} className="tabular-nums">0000 / 0000</span>],
  ]
  return (
    <div className="border border-line bg-white/90 backdrop-blur-sm">
      <dl className="grid grid-cols-2 gap-px bg-line sm:grid-cols-3">
        {cells.map(([k, v]) => (
          <div key={k} className="bg-white/95 px-4 py-3.5 sm:px-5">
            <dt className={label}>{k}</dt>
            <dd className="mt-1 text-sm font-medium">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

/* ───────────────────────── Page ───────────────────────── */

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white selection:bg-ink selection:text-white">
      <Header />
      <LevelGauge />

      <main id="top">
        {/* Hero */}
        <section className="relative flex min-h-svh flex-col items-center overflow-hidden pb-8 sm:pb-10">
          <BoomerangVideoBg />
          {/* Light wash: lets the footage show through while keeping text legible.
              Top-to-bottom everywhere, plus a left-heavy fade on desktop where the text sits. */}
          <div aria-hidden="true" className="absolute inset-0 z-[1] bg-gradient-to-b from-white/70 via-white/20 to-white/90" />
          <div aria-hidden="true" className="absolute inset-0 z-[1] hidden bg-gradient-to-r from-white/80 via-white/35 to-transparent lg:block" />
          <SheetFrame />

          <div className="relative z-10 flex w-full max-w-6xl flex-col items-center px-6 pt-28 sm:px-8 md:pt-36 lg:items-start lg:pt-32">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <p className="rise text-sm text-ink/70" style={d(0.2)}>
                <span className="font-medium text-ink">Aditi Raj</span> — Structural Design Engineer
              </p>
              <h1 style={d(0.35)} className="rise mt-5 font-serif text-[clamp(2.25rem,7vw,3.75rem)] font-normal leading-[1.08] tracking-tighter text-ink lg:text-[clamp(2.5rem,4.4vw,4.5rem)]">
                Thoughtful structural design.<br className="hidden sm:block lg:hidden" /> Built on precision.
              </h1>
              <p style={d(0.6)} className="rise mt-6 max-w-lg text-sm leading-relaxed text-ink/70 md:mt-8 md:text-base">
                Structural design and analysis for high-rise residential developments, with experience spanning foundation design, structural modelling, design coordination, and technical submissions.
              </p>
              <div style={d(0.8)} className="rise mt-8 flex flex-wrap justify-center gap-3 md:mt-10 lg:justify-start">
                <a href="#projects" className={`${btn} px-7 py-3.5`}>Explore My Work</a>
                <a href="#lab" className={`${btnLine} bg-white/70 px-7 py-3.5`}>Try the Frame Lab</a>
                <a href="#contact" className={`${btnLine} bg-white/70 px-7 py-3.5`}>Contact</a>
              </div>
            </div>
            {/**<HeroTower /> */}
          </div>

          <div style={d(1)} className="rise relative z-10 mt-auto w-full max-w-6xl px-5 pt-14 sm:px-8">
            <TitleBlock />
          </div>
        </section>


        {/* Stats strip */}
        <section aria-label="At a glance" className="border-t border-line py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6 sm:px-10">
            <dl className="grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="bg-white px-5 py-8 md:py-10">
                  <dd className="font-serif text-5xl font-normal tracking-tight tabular-nums md:text-6xl"><CountUp to={s.to} suffix={s.suffix} /></dd>
                  <dt className="mt-3 text-xs leading-snug text-ink/60">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* About */}
        <Section ax="A" id="about" tag="About" title="Foundation to submission, on high-rise residential work.">
          <div className="grid gap-12 md:grid-cols-[1fr_300px] md:gap-16">
            <div className="max-w-xl space-y-6 leading-relaxed text-ink/80">
              <p className="font-serif text-xl leading-snug text-ink md:text-2xl">
                I&rsquo;m a Structural Design Engineer with three years of experience, including high-rise residential developments, and hands-on involvement from foundation to submission.
              </p>
              <p>
                I&rsquo;m proficient in ETABS and SAFE, with working knowledge of BIS and Eurocode standards. I contributed to 50+ storey towers at ARSA Consultancy and gained exposure to international project workflows at AtkinsRéalis. I work comfortably in multidisciplinary teams and I&rsquo;m keen to take on technically challenging structural roles.
              </p>
            </div>
            <ul className="self-start border-t border-ink">
              {['High-rise residential structural design', 'Structural analysis and modelling', 'Foundation-to-superstructure design involvement', 'Indian and international engineering workflows', 'Multidisciplinary collaboration'].map((t) => (
                <li key={t} className="border-b border-line py-3.5 text-sm">{t}</li>
              ))}
            </ul>
          </div>
        </Section>

        {/* Experience */}
        <Section ax="B" id="experience" tag="Experience" title="Where the work has happened.">
          <Timeline>
            {JOBS.map((j) => (
              <article key={j.org} className={`${card} relative grid gap-4 px-5 py-7 transition-colors duration-300 before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:origin-top before:scale-y-0 before:bg-accent before:transition-transform before:duration-300 hover:bg-[#efefed] hover:before:scale-y-100 sm:px-8 sm:py-9 md:grid-cols-[200px_1fr] md:gap-10`}>
                {/* Marker is centred on the timeline rule (rule sits 5px from the Timeline's left edge) */}
                <span aria-hidden="true" className="absolute -left-8 top-10 hidden h-2.5 w-2.5 rotate-45 border border-ink bg-white md:block" />
                <div className="text-sm text-ink/70">
                  <p className="font-medium text-ink">{j.when}</p>
                  {j.where && <p className="mt-0.5">{j.where}</p>}
                  <p className="mt-3"><span className="inline-block border border-ink/30 px-2 py-0.5 text-[10px] tracking-[0.2em] text-ink/60">REV {j.rev}</span></p>
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-normal tracking-tight md:text-3xl">{j.role}</h3>
                  <p className="mb-5 mt-1 text-ink/70">{j.org}</p>
                  <ul className="max-w-2xl space-y-3 text-sm leading-relaxed text-ink/80 md:text-[15px]">
                    {j.pts.map((p) => <li key={p} className="flex gap-3"><span className="mt-2.5 h-px w-3 shrink-0 bg-ink/40" />{p}</li>)}
                  </ul>
                  {j.projects && (
                    <div className="mt-6 border-t border-ink/15 pt-5 text-sm">
                      <p className={`${label} mb-3`}>Projects</p>
                      <ul className="space-y-1.5 text-ink/80">{PROJECTS.map((p) => <li key={p.name}>{p.name}, {p.place} — {p.config}</li>)}</ul>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </Timeline>
        </Section>

        <ProjectsSection />

        {/* Frame lab */}
        <Section ax="D" id="lab" tag="Interactive demo" title="How a building sways under wind or earthquake.">
          <p className="mb-8 max-w-2xl leading-relaxed text-ink/70">
            A building doesn&rsquo;t just stand, it moves. Wind or an earthquake pushes every floor sideways, and design checks that the movement between neighbouring floors (storey drift) stays under a limit: 0.4% of the storey height for seismic design in IS 1893. Drag the sliders, or pick a load case, and watch the frame and the numbers respond.
          </p>
          <FrameLab />
        </Section>

        {/* Expertise: a schedule, like a bar-bending schedule on a drawing */}
        <Section ax="E" id="expertise" tag="Expertise" title="Software, codes and tools.">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Schedule of software, codes and tools</caption>
            <thead>
              <tr className="border-b border-ink">
                <th scope="col" className={`${label} w-16 py-3 font-medium`}>Mark</th>
                <th scope="col" className={`${label} py-3 font-medium`}>Item</th>
                <th scope="col" className={`${label} hidden py-3 font-medium sm:table-cell`}>Category</th>
              </tr>
            </thead>
            <tbody>
              {SCHEDULE.map((r) => (
                <tr key={r.mark} className="border-b border-line transition-colors duration-200 hover:bg-surface">
                  <td className="py-3.5 pr-4 align-top text-xs tabular-nums text-ink/50">{r.mark}</td>
                  <td className="py-3.5 pr-4 text-sm md:text-[15px]">
                    {r.item}
                    <span className="mt-0.5 block text-xs text-ink/50 sm:hidden">{r.cat}</span>
                  </td>
                  <td className="hidden py-3.5 text-sm text-ink/60 sm:table-cell">{r.cat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        {/* Services */}
        <Section ax="F" id="services" tag="Work opportunities" title="Structural design support">
          <p className="mb-10 max-w-xl leading-relaxed text-ink/70">
            Open to structural engineering opportunities and relevant project collaborations where I can contribute my experience in structural analysis, design coordination, and engineering documentation.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <div className={`${card} p-6 sm:p-8`}>
              <h3 className="font-serif text-2xl font-normal">Framing Plan Design</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/70">Structural framing plan support and coordination to help develop clear, practical building layouts.</p>
            </div>
            <div className={`${card} p-6 sm:p-8`}>
              <h3 className="font-serif text-2xl font-normal">Structural Design — Foundation to Superstructure</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/70">Structural design support covering foundations through the superstructure, aligned with project requirements and scope.</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-md text-sm text-ink/60">Happy to discuss suitable work with engineering consultancies, multidisciplinary teams, and potential clients.</p>
            <Mail subject={S.general} className="border-b border-ink pb-0.5 text-sm font-medium">Discuss an Opportunity</Mail>
          </div>
        </Section>

        {/* Education, academic, certifications */}
        <Section ax="G" id="education" tag="Education" title="Academic grounding.">
          <ul className="border-t border-ink">
            {EDUCATION.map(([t, s, v]) => (
              <li key={t} className="grid items-baseline gap-1 border-b border-line py-5 sm:grid-cols-[1fr_auto] sm:gap-6">
                <div><p className="font-serif text-xl md:text-2xl">{t}</p><p className="text-sm text-ink/60">{s}</p></div>
                <p className="text-sm font-medium">{v}</p>
              </li>
            ))}
          </ul>
          <div className="mt-20 grid gap-14 md:grid-cols-[1.4fr_1fr] md:gap-16">
            <div>
              <p className={`${label} mb-4`}>Academic projects</p>
              <ul className="border-t border-ink">
                {ACADEMIC.map(([t, desc]) => (
                  <li key={t} className="border-b border-line py-4">
                    <p className="font-serif text-lg leading-snug md:text-xl">{t}</p>
                    <p className="mt-1 text-sm text-ink/70">{desc}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className={`${label} mb-4`}>Certifications</p>
              <ul className="border-t border-ink">
                {CERTS.map(([t, o]) => (
                  <li key={t} className="border-b border-line py-4">
                    <p className="font-serif text-lg leading-snug md:text-xl">{t}</p>
                    <p className="text-sm text-ink/60">{o}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Contact */}
        <section id="contact" className="blueprint bg-ink py-24 text-white md:py-36">
          <div className="mx-auto max-w-5xl px-6 sm:px-10">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">Contact</p>
            <h2 className="mt-4 max-w-3xl font-serif text-[clamp(2.25rem,6vw,4.5rem)] font-normal leading-[1.05] tracking-tighter">Looking to build on a strong foundation?</h2>
            <p className="mt-6 max-w-xl leading-relaxed text-white/70">
              Have a structural engineering opportunity, a project to discuss, or a potential collaboration in mind? Send me a few details by email, and let&rsquo;s start a conversation.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a {...mailProps(S.project)} className="group inline-flex items-center gap-2 rounded-md bg-white px-7 py-3.5 text-sm font-medium text-ink transition-colors duration-200 hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                Email Me About Your Project <ArrowRight className="h-4 w-4 -rotate-45 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <Mail subject={S.general} className="border-b border-white pb-0.5 text-sm font-medium">Email for General Enquiries</Mail>
            </div>
            <p className="mt-5 max-w-md text-sm text-white/60">Share a little about your project, requirements, or opportunity. I&rsquo;ll be happy to connect.</p>
            <p className="mt-2 max-w-md text-xs text-white/40">Opens a Gmail compose window on desktop, or your default mail app on a phone. <a className="underline hover:text-white" href={mailto(S.project)}>Use my default mail app instead</a>.</p>

            <dl className="mt-20 grid border-t border-white/30 text-sm sm:grid-cols-3">
              <div className="py-5 pr-6"><dt className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">Email</dt><dd className="mt-1.5 break-all"><a className="hover:underline" href={`mailto:${EMAIL}`}>{EMAIL}</a></dd></div>
              <div className="py-5 pr-6"><dt className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">Location</dt><dd className="mt-1.5">Bengaluru, Karnataka, India</dd></div>
              <div className="py-5"><dt className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">LinkedIn</dt><dd className="mt-1.5"><a className="hover:underline" href={LINKEDIN} target="_blank" rel="noopener noreferrer">aditi-raj-3061281a4 <span className="sr-only">(opens in a new tab)</span></a></dd></div>
            </dl>
          </div>
        </section>
      </main>

      <footer className="border-t border-line py-12 text-sm text-ink/70">
        <div className="mx-auto grid max-w-5xl items-start gap-8 px-6 sm:px-10 md:grid-cols-3">
          <div><p className="font-semibold tracking-[0.2em] text-ink">ADITI RAJ</p><p className="mt-1">Structural Design Engineer</p><p>Bengaluru, Karnataka, India</p></div>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">{NAV.map(([l, h]) => <li key={h}><a className="transition-colors duration-200 hover:text-ink" href={h}>{l}</a></li>)}</ul>
          <a {...mailProps(S.top)} className="transition-colors duration-200 hover:text-ink md:justify-self-end">Email for Enquiries ↗</a>
          <p className="border-t border-line pt-6 font-serif italic md:col-span-3">Designed with precision. Driven by structure.</p>
        </div>
      </footer>
    </div>
  )
}