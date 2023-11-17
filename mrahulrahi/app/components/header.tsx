import React from 'react'

const header = () => {
    return (
        <header id="header">
            <nav class="navbar navbar-expand-xl">
                <div class="container">
                    <div class="nav-inside d-flex align-items-center justify-content-between">
                        <a class="navbar-brand nav-logo" href="#!">mrahul<span>rahi</span></a>
                        <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse justify-content-center" id="mainNav">
                            <div class="navbar-inside">
                                <ul class="navbar-nav">
                                    <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                                    <li class="nav-item"><a class="nav-link" href="about.html">About</a></li>
                                    <li class="nav-item"><a class="nav-link" href="content-page.html">Rahi Creations</a>
                                    </li>
                                    <li class="nav-item"><a class="nav-link" href="content-page.html">FireLiquidator</a>
                                    </li>
                                    <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
                                    <div class="nav-item header-btn d-xl-none">
                                        <a href="#!" class="btn btn-default green">Hire Me</a>
                                    </div>
                                </ul>
                                <div class="navbar-bottom mt-auto d-xl-none">
                                    <div class="social-links d-flex align-items-center justify-content-center">
                                        <a class="d-flex align-items-center justify-content-center"
                                            href="https://linkedin.com/in/mrahulrahi/"><i
                                                class="fab fa-linkedin-in"></i></a>
                                        <a class="d-flex align-items-center justify-content-center"
                                            href="https://github.com/mrahulrahi/"><i class="fab fa-github"></i></a>
                                        <a class="d-flex align-items-center justify-content-center"
                                            href="https://www.youtube.com/@fireliquidator"><i
                                                class="fab fa-youtube"></i></a>
                                        <a class="d-flex align-items-center justify-content-center"
                                            href="https://t.me/mrahulrahi"><i class="fab fa-telegram-plane"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="header-btn d-none d-xl-block">
                            <a href="#!" class="btn btn-default green">Hire Me</a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default header