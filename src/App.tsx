import { motion } from 'framer-motion'
import { Background3D } from './components/Background3D'
import { Navbar } from './components/Navbar'
import { ScrollProgress } from './components/ScrollProgress'
import { HomePage } from './pages/HomePage'

export default function App() {
  return (
    <>
      <Background3D />
      <ScrollProgress />
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <HomePage />
      </motion.div>
    </>
  )
}
