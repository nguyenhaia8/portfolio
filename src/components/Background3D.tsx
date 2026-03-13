import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

type Background3DProps = {
  className?: string
}

function isMobileLike() {
  if (typeof window === 'undefined') return false
  const coarse = window.matchMedia?.('(pointer: coarse)')?.matches ?? false
  return coarse || window.innerWidth < 768
}

export function Background3D({ className }: Background3DProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)

  const palette = useMemo(
    () => ({
      bg: new THREE.Color('#070A12'),
      deepBlue: new THREE.Color('#0B1637'),
      purple: new THREE.Color('#7C3AED'),
      cyan: new THREE.Color('#22D3EE'),
    }),
    [],
  )

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const canvas = canvasRef.current
    if (!canvas) return

    const mobile = isMobileLike()

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !mobile,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio ?? 1, mobile ? 1.5 : 2))
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = mobile ? 1.0 : 1.05

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(palette.bg, 12, 36)

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(0, 0.25, mobile ? 14 : 12)

    const root = new THREE.Group()
    scene.add(root)

    // Ambient + gradient-ish lighting (Stripe/Linear vibe)
    const hemi = new THREE.HemisphereLight(palette.deepBlue, palette.bg, mobile ? 0.75 : 0.9)
    scene.add(hemi)

    const key = new THREE.PointLight(palette.cyan, mobile ? 1.1 : 1.35, 60, 2)
    key.position.set(6, 4, 8)
    scene.add(key)

    const rim = new THREE.PointLight(palette.purple, mobile ? 1.0 : 1.2, 60, 2)
    rim.position.set(-7, -2, 10)
    scene.add(rim)

    // A subtle “wave grid” surface (very low-poly, non-distracting)
    const gridGeo = new THREE.PlaneGeometry(26, 14, mobile ? 40 : 90, mobile ? 22 : 55)
    const gridMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0A1024'),
      roughness: 0.9,
      metalness: 0.15,
      emissive: palette.deepBlue,
      emissiveIntensity: mobile ? 0.15 : 0.22,
      transparent: true,
      opacity: mobile ? 0.55 : 0.62,
    })
    const grid = new THREE.Mesh(gridGeo, gridMat)
    grid.rotation.x = -Math.PI / 2.2
    grid.position.set(0, -2.7, -2)
    root.add(grid)

    // Floating geometric accents
    const shapes = new THREE.Group()
    root.add(shapes)

    const makeMat = (accent: THREE.Color) =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#0B1226'),
        roughness: 0.25,
        metalness: 0.55,
        emissive: accent,
        emissiveIntensity: mobile ? 0.25 : 0.38,
      })

    const geo = {
      sphere: new THREE.SphereGeometry(0.55, 24, 24),
      torus: new THREE.TorusGeometry(0.5, 0.16, 20, 48),
      box: new THREE.BoxGeometry(0.75, 0.75, 0.75, 2, 2, 2),
    }

    const accents = [palette.cyan, palette.purple, new THREE.Color('#60A5FA')]
    const meshes: THREE.Mesh[] = []
    const count = mobile ? 6 : 10
    for (let i = 0; i < count; i++) {
      const g = i % 3 === 0 ? geo.torus : i % 3 === 1 ? geo.sphere : geo.box
      const m = makeMat(accents[i % accents.length])
      const mesh = new THREE.Mesh(g, m)
      mesh.position.set(
        (Math.random() - 0.5) * 10.5,
        (Math.random() - 0.5) * 4.5 + 0.6,
        (Math.random() - 0.5) * 6.5 + 2.5,
      )
      mesh.rotation.set(Math.random() * 1.2, Math.random() * 1.2, Math.random() * 1.2)
      mesh.scale.setScalar(0.9 + Math.random() * 0.55)
      shapes.add(mesh)
      meshes.push(mesh)
    }

    // Glowing particles (cheap: Points + additive blending)
    const particleCount = mobile ? 420 : 1100
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      positions[i3 + 0] = (Math.random() - 0.5) * 20
      positions[i3 + 1] = (Math.random() - 0.5) * 10 + 0.5
      positions[i3 + 2] = (Math.random() - 0.5) * 16

      const t = Math.random()
      const c = t < 0.45 ? palette.cyan : t < 0.8 ? palette.purple : new THREE.Color('#93C5FD')
      colors[i3 + 0] = c.r
      colors[i3 + 1] = c.g
      colors[i3 + 2] = c.b
    }

    const particlesGeo = new THREE.BufferGeometry()
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const particlesMat = new THREE.PointsMaterial({
      size: mobile ? 0.035 : 0.04,
      vertexColors: true,
      transparent: true,
      opacity: mobile ? 0.45 : 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const particles = new THREE.Points(particlesGeo, particlesMat)
    particles.position.z = -2.5
    root.add(particles)

    // Postprocessing: Bloom for glow (disabled on mobile)
    let composer: EffectComposer | null = null
    if (!mobile) {
      composer = new EffectComposer(renderer)
      composer.addPass(new RenderPass(scene, camera))
      const bloom = new UnrealBloomPass(
        new THREE.Vector2(1, 1),
        0.85, // strength
        0.8, // radius
        0.22, // threshold
      )
      composer.addPass(bloom)
    }

    // Resize handling
    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      composer?.setSize(w, h)
    }
    resize()

    // GSAP: smooth float + slow rotations (premium, not distracting)
    const tl = gsap.timeline({ defaults: { ease: 'sine.inOut' } })
    tl.to(root.rotation, { y: '+=0.35', duration: 8, repeat: -1, yoyo: true }, 0)
    tl.to(root.rotation, { x: '+=0.08', duration: 10, repeat: -1, yoyo: true }, 0)
    tl.to(root.position, { y: 0.22, duration: 7, repeat: -1, yoyo: true }, 0)

    const meshTweens: gsap.core.Tween[] = []
    meshes.forEach((m, i) => {
      meshTweens.push(
        gsap.to(m.rotation, {
          x: m.rotation.x + (Math.random() * 0.6 + 0.25),
          y: m.rotation.y + (Math.random() * 0.9 + 0.35),
          duration: 7 + Math.random() * 6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.08,
        }),
      )
      meshTweens.push(
        gsap.to(m.position, {
          y: m.position.y + (Math.random() * 0.7 + 0.25),
          duration: 6 + Math.random() * 6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.06,
        }),
      )
    })

    // Fade-in on load
    const fadeTween = gsap.fromTo(
      canvas,
      { opacity: 0 },
      { opacity: 1, duration: 0.9, ease: 'power2.out' },
    )

    // Mouse parallax (subtle)
    const quickX = gsap.quickTo(camera.position, 'x', { duration: 0.9, ease: 'power3.out' })
    const quickY = gsap.quickTo(camera.position, 'y', { duration: 0.9, ease: 'power3.out' })

    const onPointerMove = (e: PointerEvent) => {
      if (mobile) return
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1
      quickX(nx * 0.65)
      quickY(0.25 + ny * 0.35)
    }

    // Scroll depth shift (cinematic)
    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const t = self.progress
        // Move slightly “through” the scene as you scroll.
        camera.position.z = (mobile ? 14 : 12) + t * 2.2
        root.position.z = -t * 0.9
      },
    })

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    // Time-based mesh deformation (cheap wave)
    const gridPos = gridGeo.attributes.position as THREE.BufferAttribute
    const base = new Float32Array(gridPos.array.length)
    base.set(gridPos.array as Float32Array)

    const clock = new THREE.Clock()
    let disposed = false

    const tick = () => {
      if (disposed) return
      const t = clock.getElapsedTime()

      // Wave grid: tiny displacement
      const arr = gridPos.array as Float32Array
      const amp = mobile ? 0.08 : 0.11
      const freq = mobile ? 0.65 : 0.75
      for (let i = 0; i < arr.length; i += 3) {
        const x = base[i + 0]
        const y = base[i + 1]
        arr[i + 2] = Math.sin(x * freq + t * 0.8) * amp + Math.cos(y * freq + t * 0.7) * amp
      }
      gridPos.needsUpdate = true
      gridGeo.computeVertexNormals()

      // Drift particles slightly (no per-particle trig on mobile-heavy)
      particles.rotation.y = t * 0.03
      particles.rotation.x = t * 0.01

      camera.lookAt(0, 0, 0)

      if (composer) composer.render()
      else renderer.render(scene, camera)

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      disposed = true
      if (rafRef.current) cancelAnimationFrame(rafRef.current)

      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)

      st.kill()
      tl.kill()
      fadeTween.kill()
      meshTweens.forEach((t) => t.kill())

      // Dispose Three resources
      particlesGeo.dispose()
      particlesMat.dispose()
      gridGeo.dispose()
      gridMat.dispose()
      meshes.forEach((m) => {
        ;(m.geometry as THREE.BufferGeometry).dispose?.()
        ;(m.material as THREE.Material).dispose?.()
      })

      composer?.dispose()
      renderer.dispose()
      scene.clear()
    }
  }, [palette])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={[
        'pointer-events-none fixed inset-0 -z-10 h-full w-full',
        'opacity-0',
        className ?? '',
      ].join(' ')}
    />
  )
}

