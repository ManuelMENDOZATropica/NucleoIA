

import { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import { fetcher } from '@/lib/api'
import styles from '@/styles/Dashboard.module.css'

const defaultState = {
  resources: [],
  licenses: [],
  tutorials: [],
  sessions: [],
  projects: []
}

export default function DashboardPage () {
  const [data, setData] = useState(defaultState)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadData () {
      try {
        const [resources, licenses, tutorials, sessions, projects] = await Promise.all([
          fetcher('/resources').catch(() => []),
          fetcher('/licenses').catch(() => []),
          fetcher('/tutorials').catch(() => []),
          fetcher('/ufo-sessions?upcoming=true').catch(() => []),
          fetcher('/projects').catch(() => [])
        ])

        setData({ resources, licenses, tutorials, sessions, projects })
      } catch (err) {
        setError('No se pudieron cargar los datos del dashboard')
      }
    }

    loadData()
  }, [])

  const totalExpiringLicenses = data.licenses.filter((item) => item.isExpiringSoon).length

  return (
    <Layout>
      <Head>
        <title>Dashboard | Núcleo IA</title>
      </Head>
      <section className={styles.header}>
        <div>
          <h1>Núcleo IA</h1>
          <p>Tu centro de inteligencia artificial en Trópica.</p>
        </div>
        <div className={styles.tags}>
          {['#Imagen', '#Video', '#Texto', '#UFO', '#Licencia'].map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </section>

      {error && <p className={styles.error}>{error}</p>}

      <section className={styles.grid}>
        <article className={styles.card}>
          <h2>Recursos totales</h2>
          <p className={styles.metric}>{data.resources.length}</p>
          <p className={styles.helper}>Incluye tutoriales, documentos y enlaces destacados.</p>
        </article>

        <article className={styles.card}>
          <h2>Licencias por vencer</h2>
          <p className={styles.metric}>{totalExpiringLicenses}</p>
          <p className={styles.helper}>Mantén las herramientas críticas activas.</p>
        </article>

        <article className={styles.card}>
          <h2>Próximas sesiones UFO</h2>
          <p className={styles.metric}>{data.sessions.length}</p>
          <p className={styles.helper}>Aprende de los expertos internos en IA.</p>
        </article>

        <article className={styles.card}>
          <h2>Proyectos activos</h2>
          <p className={styles.metric}>{data.projects.length}</p>
          <p className={styles.helper}>Explora casos de uso y pipelines en curso.</p>
        </article>
      </section>

      <section className={styles.section}>
        <header className={styles.sectionHeader}>
          <h2>Últimos tutoriales</h2>
          <a href="/tutorials">Ver todo</a>
        </header>
        <div className={styles.list}>
          {data.tutorials.slice(0, 4).map((tutorial) => (
            <article key={tutorial._id || tutorial.title} className={styles.listItem}>
              <h3>{tutorial.title}</h3>
              <p>{tutorial.description}</p>
              <span>{tutorial.format?.toUpperCase()}</span>
            </article>
          ))}
          {data.tutorials.length === 0 && <p>No hay tutoriales disponibles todavía.</p>}
        </div>
      </section>
    </Layout>
  )
}
