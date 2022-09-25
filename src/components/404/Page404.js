import React from 'react'
import { Link } from 'react-router-dom'
import './page404.css'

const Page404 = () => {
    return (
        <section className="page_404">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 ">
                        <div className="col-sm-10 col-sm-offset-1  text-center">
                            <div className="four_zero_four_bg">
                                <h1 className="text-center ">404</h1>
                            </div>

                            <div className="contant_box_404">
                                <h3 className="h2">
                                    Looks like you're lost
                                </h3>

                                <p>This page doesn't exist, or maybe you don't have the credentials to visit it !</p>

                                <Link to="/login" className="link_404">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Page404