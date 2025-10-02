import Head from 'next/head'
import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'
import { fetcher } from '@/lib/api'
import styles from '@/styles/ListPage.module.css'

export default function TutorialsPage () {
  const [tutorials, setTutorials] = useState([])

  useEffect(() => {
    fetcher('/tutorials').then(setTutorials).catch(() => setTutorials([]))
  }, [])

  return (
    <Layout>
      <Head>
        <title>Tutoriales | Núcleo IA</title>
      </Head>
      <section className={styles.header}>
        <div>
          <h1>Tutoriales y documentación</h1>
          <p>Encuentra guías, grabaciones y recursos curados.</p>
        </div>
        <button className={styles.primaryButton}>Nuevo recurso</button>
      </section>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <span>Título</span>
          <span>Formato</span>
          <span>Etiquetas</span>
          <span>Actualizado</span>
        </div>
        {tutorials.map((tutorial) => (
          <div key={tutorial._id || tutorial.title} className={styles.tableRow}>
            <span>{tutorial.title}</span>
            <span className={styles.badge}>{tutorial.format}</span>
            <span>{tutorial.tags?.join(', ')}</span>
            <span>{tutorial.updatedAt ? new Date(tutorial.updatedAt).toLocaleDateString() : '—'}</span>
          </div>
        ))}
        {tutorials.length === 0 && <p>No hay tutoriales registrados todavía.</p>}
      </div>
    </Layout>
  )
}
