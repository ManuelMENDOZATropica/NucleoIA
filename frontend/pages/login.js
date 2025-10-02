import Head from 'next/head'
import styles from '@/styles/Login.module.css'

const GOOGLE_AUTH_URL = process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL || 'http://localhost:4000/api/auth/google'

export default function LoginPage () {
  return (
    <div className={styles.container}>
      <Head>
        <title>Iniciar sesión | Núcleo IA</title>
      </Head>
      <div className={styles.card}>
        <h1>Bienvenido a Núcleo IA</h1>
        <p>Accede con tu correo corporativo @tropica.me para explorar el hub de inteligencia artificial.</p>
        <a className={styles.button} href={GOOGLE_AUTH_URL}>
          <span>Iniciar sesión con Google</span>
        </a>
      </div>
    </div>
  )
}
