import Head from 'next/head'
import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'
import { fetcher } from '@/lib/api'
import styles from '@/styles/ListPage.module.css'

export default function ProjectsPage () {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetcher('/projects').then(setProjects).catch(() => setProjects([]))
  }, [])

  return (
    <Layout>
      <Head>
        <title>Proyectos | Núcleo IA</title>
      </Head>
      <section className={styles.header}>
        <div>
          <h1>Proyectos y casos de uso</h1>
          <p>Explora implementaciones, pipelines y aprendizajes clave.</p>
        </div>
        <button className={styles.primaryButton}>Nuevo proyecto</button>
      </section>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <span>Nombre</span>
          <span>Responsable</span>
          <span>Estado</span>
          <span>Repositorio</span>
        </div>
        {projects.map((project) => (
          <div key={project._id || project.name} className={styles.tableRow}>
            <span>{project.name}</span>
            <span>{project.owner || '—'}</span>
            <span className={styles.badge}>{project.status}</span>
            <span>{project.repositoryUrl ? <a href={project.repositoryUrl}>Ver repo</a> : '—'}</span>
          </div>
        ))}
        {projects.length === 0 && <p>No hay proyectos registrados todavía.</p>}
      </div>
    </Layout>
  )
}
