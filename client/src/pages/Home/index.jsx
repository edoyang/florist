const Home = () => {
  return (
    <div className="home">
        <div className="carousel">
            <img src="https://via.placeholder.com/1600x400" alt="carousel" />
            <img src="https://via.placeholder.com/1600x400" alt="carousel" />
        </div>

        <div className="indicator">
            <div className="dot active"></div>
            <div className="dot"></div>
        </div>

        <div className="top-product">
            <img src="https://via.placeholder.com/400x400" alt="product" />
            <img src="https://via.placeholder.com/400x400" alt="product" />
        </div>

        <div className="shop-by-category">
            <div className="top">
                <h1>SHOP BY CATEGORY</h1>
                <div className="list">
                    <p>Category 1</p>
                    <p>Category 2</p>
                    <p>Category 3</p>
                    <p>Category 4</p>
                    <p>Category 5</p>

                    <div className="buttons">
                        <button>Left</button>
                        <button>Right</button>
                    </div>
                </div>
            </div>

            <div className="bottom">
                <h1>PRODUCT GOES HERE</h1>
            </div>
        </div>

        <div className="featured">
            <div className="top">
                <h1>FEATURED</h1>
                <div className="buttons">
                    <button>Left</button>
                    <button>Right</button>
                </div>
            </div>

            <div className="bottom">
                <h1>PRODUCT GOES HERE</h1>
            </div>
        </div>

        <div className="banner">
            <img src="https://via.placeholder.com/1600x400" alt="banner" />
        </div>

        <div className="specials">
            <div className="top">
                <h1>SPECIALS</h1>
                <div className="buttons">
                    <button>Left</button>
                    <button>Right</button>
                </div>
            </div>

            <div className="bottom">
                <h1>PRODUCT GOES HERE</h1>
            </div>
        </div>

        <div className="latest">
            <div className="top">
                <h1>LATEST</h1>
                <div className="buttons">
                    <button>Left</button>
                    <button>Right</button>
                </div>
            </div>

            <div className="bottom">
                <h1>PRODUCT GOES HERE</h1>
            </div>
        </div>

        <div className="blog">
            <div className="top">
                <h1>BLOG</h1>
                <div className="buttons">
                    <button>Left</button>
                    <button>Right</button>
                </div>
            </div>

            <div className="bottom">
                <h1>POST GOES HERE</h1>
            </div>
        </div>
    </div>
  )
}

export default Home