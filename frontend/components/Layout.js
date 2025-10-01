import Link from 'next/link'
import styles from '@/styles/Layout.module.css'

const navigation = [
  { label: 'Dashboard', href: '/' },
  { label: 'Licencias', href: '/licenses' },
  { label: 'Tutoriales', href: '/tutorials' },
  { label: 'Sesiones UFO', href: '/ufo-sessions' },
  { label: 'Proyectos', href: '/projects' }
]

export default function Layout ({ children }) {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.logo}>🤖</span>
          <div>
            <p className={styles.title}>Núcleo IA</p>
            <p className={styles.subtitle}>AI Core</p>
          </div>
        </div>
        <nav className={styles.nav}>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navItem}>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  )
}
