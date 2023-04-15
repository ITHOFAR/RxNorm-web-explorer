import React from 'react';
import classNames from 'classnames';
import {Link, Route, Switch} from "react-router-dom";
import styles from './App.module.css';
import {ResultItemPage} from './features/result/page-component/result-items-page';
import {SearchItemPage} from './features/result/page-component/search-items-page';
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
         <Switch>
            <Route path="/search"  component={SearchItemPage} />
            <Route path="/result"  component={ResultItemPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/"      component={HomePage} /> { /* needs to be last, it will match any path */}
         </Switch>
      </div>
   );
}