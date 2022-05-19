import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NotFoundPage from '../components/NotFoundPage'
import PrivateRoute from '../utility/PrivateRoute'
import DashboardLayout from './DashboardLayout'
import GradeTable from './GradeTable'
import Settings from './Settings'

function DashboardPageRoutes() {
    return (
        <React.Fragment>
            <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
                <Route path='settings' element={<Settings />} />
                <Route path=':gradeLevel' element={<GradeTable />} />
                <Route path="not-found" element={<NotFoundPage />} />
            </Route>
        </React.Fragment>
    )
}

export default DashboardPageRoutes