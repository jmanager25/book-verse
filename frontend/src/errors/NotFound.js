import React from 'react'
import styles from '../styles/ErrorPages.module.css'

const NotFound = () => {
  return (
    <>
        <div className={styles.Container}>
            <div className={styles.Content}>
                <div className={styles.Emoji}>😢</div>
                <h1>404 Error Page</h1>
                <p>The page you are looking for does not exist</p>
            </div>
        </div>
    </>
  )
}

export default NotFound;