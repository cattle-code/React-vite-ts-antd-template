import React, { useState, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import './App.css'

import {Spin} from "antd"

import type { IRoute } from './router'
import { layoutRouteList } from './router/utils'


const App = () => {

  return (
    <Suspense fallback={<Spin size='large' className='layout_loading' />}>
      <Router>
        <Switch>
          {
            layoutRouteList.map((route:IRoute)=>(
              <Route key={route.path}  path={route.path} component={route.component}></Route>
              ))
          }
        </Switch>
      </Router>
    </Suspense>

  )
}

export default App
