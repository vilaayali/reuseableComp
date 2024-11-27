import React, { lazy, Suspense } from 'react'
import { Routes, Route, } from "react-router-dom";

const FirstPage = lazy(() => import('../Pages/firstPage'))
const SecondPage = lazy(() => import('../Pages/secondPage'))
const ThirdPage = lazy(() => import('../Pages/thirdPage'))
// const Sharedbtn = lazy(() => import('../sharedComponent/button'))

function WebsiteRouters() {
    return (
        <>
            <Suspense fallback={<h1>Loading.... </h1>}>
                <Routes>
                    <Route exact path='/firstpage' element={<FirstPage />} />
                    <Route exact path='/secondpage' element={<SecondPage />} />
                    <Route exact path='/thirdpage' element={<ThirdPage />} />

                </Routes>
            </Suspense>

        </>
    )
}

export default WebsiteRouters

