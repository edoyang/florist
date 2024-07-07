import Hero from "../../components/Hero";
import "./style.scss";
// import products from "../../dummy/product.json";
import CarouselV2 from "../../components/CarouselV2";
import { useEffect, useState } from "react";


const Home = () => {

    const [products, setProductData] = useState([]); 

    useEffect(() => {
      const fetchData = async () => {
        try {
          // CHANGE UPON DEPLOYMENT
          const response = await fetch('http://localhost:3000/products');
          const data = await response.json();
          setProductData(data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      fetchData();
    }, []);

    const sliderItems = [
        { link: "/product/6689ef442d02cfb0f02f5c8a#product-page", imageUrl: "hero1.jpg"},
        { link: "/product/6689fc9c1cda2bd306e476d4#product-page", imageUrl: "hero2.jpg" },
        { link: "/product/5", imageUrl: "https://via.placeholder.com/600x300?text=Image+5" }
      ];


  return (
    <div className="home">
        <Hero items={sliderItems} />

        <div className="promo-banner">
            <div className="container">
                <img draggable={false} src="promo_one.jpg" alt="image1" />
                <img draggable={false} src="promo_two.jpg" alt="image2" />
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
            <img src="promo-end.jpg" draggable={false} alt="banner" />
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