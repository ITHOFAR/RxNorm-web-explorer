import React from 'react';
import classNames from 'classnames';
import styles from './App.module.css';
import {Link, Route, Routes} from "react-router-dom";
import {ResultItemPage} from './features/result/page-component/result-items-page';
import {SearchItemPage} from './features/search/page-component/search-items-page';
import {AboutPage} from './features/about/about';
import {HomePage} from './features/home/home';

export default function App() {
   return (
      <div className={classNames(styles.mainStack, 'some-global-style')}>
         <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/search">Search Database</Link>
            <Link to="/result">Search Results</Link>
         </nav>
         <Routes>
            <Route path="/search"  component={SearchItemPage} />
            <Route path="/result"  component={ResultItemPage} />
            <Route path="/about"   component={AboutPage} />
            <Route path="/"        component={HomePage} /> { /* needs to be last, it will match any path */}
         </Routes>
      </div>
   );
}