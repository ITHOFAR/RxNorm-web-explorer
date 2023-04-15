import React from 'react';
import styles from './home.module.css';

export function HomePage()
{
   return (
      <>
         <h2>
            This is the Home page.
         </h2>
         <div className={styles.message}>
            Home page stuff goes here.
         </div>
      </>
   );
}