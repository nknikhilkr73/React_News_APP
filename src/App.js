
import './App.css';

import React, { useState } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import NavBar from './components/NavBar';
import News from './components/News';

const App = () => {
  const apiKey = process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0)



  return (
    <div>
      <Router>
        <NavBar />

        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
        // onLoaderFinished={() => setProgress(0)}
        />

        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} key="general" pageSize={20}
            country="in"
            api={apiKey}
            category="general" />}
          />
          <Route exact path="/general" element={<News setProgress={setProgress} key="general" pageSize={20}
            country="in"
            api={apiKey}
            category="general" />}
          />
          <Route exact path="/business" element={<News setProgress={setProgress} pageSize={20}
            country="in"
            api={apiKey}
            category="business"
            key="business" />}
          />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} pageSize={20}
            country="in"
            api={apiKey}
            category="entertainment"
            key="entertainment"
          />}
          />
          <Route exact path="/health" element={<News setProgress={setProgress} pageSize={20}
            country="in"
            api={apiKey}
            category="health"
            key="health"
          />}
          />
          <Route exact path="/science" element={<News setProgress={setProgress} pageSize={20}
            country="in"
            api={apiKey}
            category="science"
            key="science"
          />}
          />
          <Route exact path="/sports" element={<News setProgress={setProgress} pageSize={20}
            country="in"
            api={apiKey}
            category="sports"
            key="sports"
          />}
          />
          <Route exact path="/technology" element={<News setProgress={setProgress} pageSize={20}
            country="in"
            api={apiKey}
            category="technology"
            key="technology"
          />}
          />
        </Routes>

      </Router>
    </div>
  )
}

export default App
