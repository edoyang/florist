import Hero from "../../components/Hero";
import "./style.scss";
import products from "../../dummy/product.json";
import CarouselV2 from "../../components/CarouselV2";


const Home = () => {
    const sliderItems = [
        { link: "/product/1", imageUrl: "https://via.placeholder.com/600x300?text=Image+1" },
        { link: "/product/2", imageUrl: "https://via.placeholder.com/600x300?text=Image+2" },
        { link: "/product/3", imageUrl: "https://via.placeholder.com/600x300?text=Image+3" },
        { link: "/product/4", imageUrl: "https://via.placeholder.com/600x300?text=Image+4" },
        { link: "/product/5", imageUrl: "https://via.placeholder.com/600x300?text=Image+5" }
      ];


  return (
    <div className="home">
        <Hero items={sliderItems} />

        <div className="promo-banner">
            <div className="container">
                <img draggable={false} src="https://via.placeholder.com/600x300?text=Image+1" alt="image1" />
                <img draggable={false} src="https://via.placeholder.com/600x300?text=Image+2" alt="image2" />
            </div>
        </div>

        <CarouselV2 
            title="Shop by Category" 
            products={products} 
            links={[
                { path: "/browse", label: "View All" },
                { path: "/browse/birthday", label: "Birthday" },
                { path: "/browse/anniversary", label: "Anniversary" },
                { path: "/browse/valentine", label: "Valentine" },
                { path: "/browse/in-memorial", label: "In Memorial" },
                { path: "/browse/for-gift", label: "For Gift" },
                { path: "/browse/promo", label: "Promo" }
            ]}
        />

        <CarouselV2 
            title="Featured Products" 
            products={products} 
            links={null}
        />

        <div className="banner">
            <img src="https://via.placeholder.com/1600x400" draggable={false} alt="banner" />
        </div>

        <CarouselV2 
            title="Latest" 
            products={products} 
            links={null}
        />
    </div>
  )
}

export default Home