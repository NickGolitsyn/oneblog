import Link from 'next/link'
import styles from '../styles/Nav.module.css'

export default function BlogCard() {
  return (
    <div className={styles.container}>
      <Link className={styles.navlink} href={'/'}>Blogs</Link>
    </div>
  )
}