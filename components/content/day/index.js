import React from 'react'
import styles from './day.module.css'

const DayContent = ({ day }) => (
  <div className="container-fluid bg-primary">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h3 className={styles.date}>{day.date}</h3>
        </div>
        <div className="col-12">
          <h1 className={styles.title}>{day.title}</h1>
        </div>
        <div className="col-12">
          <div className={styles.imgcont}>
            {(day.media_type === 'image') ?
              <img src={day.url} alt={day.title} />
              : <iframe src={day.url} height="100%" alt={day.title} frameborder="0" allowfullscreen></iframe>
            }
          </div>
        </div>
        <div className="col-12">
          {(day.copyright) ?
            <p className={styles.copyright}><b>Image Credit & Copyright:</b> {day.copyright}</p>
            : ''}
        </div>
        <div className="col-12">
          <p className={styles.explanationtitle}>
            Explanation:
                </p>
        </div>
        <div className="col-12">
          <p className={styles.explanation}>
            {day.explanation}
          </p>
        </div>
      </div>
    </div>
  </div>
)

export default DayContent