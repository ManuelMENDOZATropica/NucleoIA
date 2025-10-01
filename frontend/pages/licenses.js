import Head from 'next/head'
import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'
import { fetcher } from '@/lib/api'
import styles from '@/styles/ListPage.module.css'

export default function LicensesPage () {
  const [licenses, setLicenses] = useState([])

  useEffect(() => {
    fetcher('/licenses').then(setLicenses).catch(() => setLicenses([]))
  }, [])

  return (
    <Layout>
      <Head>
        <title>Licencias | Núcleo IA</title>
      </Head>
      <section className={styles.header}>
        <div>
          <h1>Licencias y softwares</h1>
          <p>Gestiona accesos, renovaciones y responsables.</p>
        </div>
        <button className={styles.primaryButton}>Nueva licencia</button>
      </section>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <span>Nombre</span>
          <span>Responsable</span>
          <span>Expira</span>
          <span>Estado</span>
        </div>
        {licenses.map((license) => (
          <div key={license._id || license.name} className={styles.tableRow}>
            <span>{license.name}</span>
            <span>{license.owner}</span>
            <span>{license.expiresAt ? new Date(license.expiresAt).toLocaleDateString() : 'N/A'}</span>
            <span className={styles.badge}>{license.category}</span>
          </div>
        ))}
        {licenses.length === 0 && <p>No hay licencias registradas todavía.</p>}
      </div>
    </Layout>
  )
}
