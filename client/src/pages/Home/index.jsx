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
                <img draggable={false} src="https://via.placeholder.com/600x300?text=Image+1" alt="image1" />
                <img draggable={false} src="https://via.placeholder.com/600x300?text=Image+2" alt="image2" />
            </div>
        </div>

        <CarouselV2 
            title="Shop by Category" 
            products={products} 
            links={[
                { path: "/products", label: "View All" },
                { path: "/products/birthday", label: "Birthday" },
                { path: "/products/anniversary", label: "Anniversary" },
                { path: "/products/valentine", label: "Valentine" },
                { path: "/products/in-memorial", label: "In Memorial" },
                { path: "/products/for-gift", label: "For Gift" },
                { path: "/products/promo", label: "Promo" }
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