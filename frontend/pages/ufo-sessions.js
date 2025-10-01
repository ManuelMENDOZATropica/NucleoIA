import Head from 'next/head'
import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'
import { fetcher } from '@/lib/api'
import styles from '@/styles/ListPage.module.css'

export default function UFOSessionsPage () {
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    fetcher('/ufo-sessions').then(setSessions).catch(() => setSessions([]))
  }, [])

  return (
    <Layout>
      <Head>
        <title>Sesiones UFO | Núcleo IA</title>
      </Head>
      <section className={styles.header}>
        <div>
          <h1>Sesiones UFO</h1>
          <p>Agenda y contenido de nuestras sesiones Universe of Future Opportunities.</p>
        </div>
        <button className={styles.primaryButton}>Programar sesión</button>
      </section>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <span>Título</span>
          <span>Fecha</span>
          <span>Ponentes</span>
          <span>Recursos</span>
        </div>
        {sessions.map((session) => (
          <div key={session._id || session.title} className={styles.tableRow}>
            <span>{session.title}</span>
            <span>{session.scheduledFor ? new Date(session.scheduledFor).toLocaleString() : '—'}</span>
            <span>{session.speakers?.join(', ')}</span>
            <span>{session.recordingUrl ? 'Grabación disponible' : 'Pendiente'}</span>
          </div>
        ))}
        {sessions.length === 0 && <p>No hay sesiones registradas todavía.</p>}
      </div>
    </Layout>
  )
}
