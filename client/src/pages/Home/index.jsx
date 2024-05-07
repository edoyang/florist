import Hero from "../../components/Hero";
import "./style.scss";
import products from "../../dummy/product.json";
import CarouselV2 from "../../components/CarouselV2";


const Home = () => {
    const sliderItems = [
        { link: "/products/1", imageUrl: "https://via.placeholder.com/600x300?text=Image+1" },
        { link: "/products/2", imageUrl: "https://via.placeholder.com/600x300?text=Image+2" },
        { link: "/products/3", imageUrl: "https://via.placeholder.com/600x300?text=Image+3" },
        { link: "/products/4", imageUrl: "https://via.placeholder.com/600x300?text=Image+4" },
        { link: "/products/5", imageUrl: "https://via.placeholder.com/600x300?text=Image+5" }
      ];


  return (
    <div className="home">
        <Hero items={sliderItems} />

        <div className="promo-banner">
            <div className="container">
                <img src="https://via.placeholder.com/600x300?text=Image+1" alt="image1" />
                <img src="https://via.placeholder.com/600x300?text=Image+2" alt="image2" />
            </div>
        </div>

        <CarouselV2 title="Shop by Category" products={products} />

        {/* <div className="shop-by-category">
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
        </div> */}

        {/* <div className="featured">
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
        </div> */}

        {/* <div className="banner">
            <img src="https://via.placeholder.com/1600x400" alt="banner" />
        </div> */}

        {/* <div className="specials">
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
        </div> */}

        {/* <div className="latest">
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
        </div> */}

        {/* <div className="blog">
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
        </div> */}
    </div>
  )
}

export default Home