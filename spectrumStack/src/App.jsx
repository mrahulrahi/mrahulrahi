import { useState, useEffect } from 'react';
import { Link } from 'react-router'; 
import Hero from "./components/Hero";
import ListGroup from "./components/ListGroup";
import Counter from "./components/Counter";
import ListItemTable from "./components/ListItemTable";
import { FaRegHeart, FaHeart, FaRegFaceGrinHearts, FaHeartPulse } from "react-icons/fa6";
import { SlUserFollow, SlUserUnfollow } from "react-icons/sl";

function App() {
  const cards = [
    { title: 'Blog', href: '/blog' },
    { title: 'Code Stack', href: '/code-stack' },
    { title: 'Products', href: '#products' },
  ];

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);

  // Fetching data when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users', { cache: 'no-store' });
      const data = await res.json();
      setUsers(data);
    };

    fetchUsers();
  }, []); // Empty dependency array means this effect runs only once on mount

  let [likeBtn1, setLikedBtn1] = useState({ title: 'Like', icon: <FaRegHeart /> });
  let [likeBtn2, setLikedBtn2] = useState({ title: 'Follow', icon: <SlUserFollow /> });

  const handleSelectUser = (item) => {
    console.log("Selected User:", item);
    setUser(item); // Set the selected user
  };

  function handleLikeItem1() {
    setLikedBtn1(
      likeBtn1.title === 'Like'
        ? { title: 'Liked', icon: <FaHeart /> }
        : { title: 'Like', icon: <FaRegHeart /> }
    );
  }

  function handleLikeItem2() {
    setLikedBtn2(
      likeBtn2.title === 'Follow'
        ? { title: 'Unfollow', icon: <SlUserUnfollow /> }
        : { title: 'Follow', icon: <SlUserFollow /> }
    );
  }

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('https://fakestoreapi.com/products', { cache: 'no-store' });
      const productsData = await res.json();
      setProducts(productsData);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Hero bgImg="https://picsum.photos/1920/1000" title="Welcome to SpectrumStack App" subTitle="Home Page" content=" This is a React application with Tailwind CSS" />

      <div className="py-10 lg:py-20">
        <div className="container-fluid">
          <div className="grid grid-col-2 md:grid-cols-4 gap-5">
            {cards.map((card, index) => (
              <div className="w-full" key={index}>
                <Link className="card w-full p-8 bg-white/10 border border-[#ccc] rounded-xl" to={card.href} >
                  <h2 className="card-title text-white mb-0">{card.title}</h2>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pb-10 lg:pb-20">
        <div className="container-fluid">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-wrap">
            <div className="lg:col-span-8">
              <div className="bg-white/10 p-8 rounded-xl h-full">
                <div className="font-oswald text-[32px] font-bold leading-none mb-6">All Button Type</div>
                <div className="flex flex-wrap gap-5">
                  <button className="btn btn-primary btn-sm">Primary SM</button>
                  <button className="btn btn-primary">Primary</button>
                  <button className="btn btn-primary btn-lg">Primary LG</button>
                  <button className="btn btn-secondary btn-sm">Secondary SM</button>
                  <button className="btn btn-secondary">Secondary</button>
                  <button className="btn btn-secondary btn-lg">Secondary LG</button>
                  <button className="btn btn-outline btn-sm">Outline SM</button>
                  <button className="btn btn-outline">Outline</button>
                  <button className="btn btn-primary btn-sm">Like <FaRegHeart /></button>
                  <button className="btn btn-secondary btn-sm">Like <FaHeart /></button>
                  <button className="btn btn-primary btn-sm">Like <FaRegFaceGrinHearts /></button>
                  <button className="btn btn-secondary btn-sm">Like <FaHeartPulse /> </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="flex flex-col gap-5">
                <div className="bg-white/10 p-8 rounded-xl">
                  <div className="font-oswald text-[32px] font-bold leading-none mb-6">Like Button</div>
                  <div className="flex flex-wrap gap-5">
                    <button className="btn btn-secondary btn-sm" onClick={handleLikeItem1} >{likeBtn1.title} {likeBtn1.icon} </button>
                    <button className="btn btn-secondary btn-sm" onClick={handleLikeItem2} >{likeBtn2.title} {likeBtn2.icon} </button>
                  </div>
                </div>

                <div className="bg-white/10 p-8 rounded-xl">
                  <div className="font-oswald text-[32px] font-bold leading-none mb-6">Counter</div>
                  <div className="flex flex-wrap gap-5">
                    <Counter />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-12">
              <div className="bg-white/10 p-8 rounded-xl">
                <div className="font-oswald text-[32px] font-bold leading-none mb-6">List Group</div>
                <div className="flex flex-wrap gap-5">
                  <div className="w-full">
                    <ListGroup items={users || []} heading="Users" onSelectItem={handleSelectUser} />
                  </div>
                  <div className="w-full">
                    <div className="text-2xl font-bold mb-2">User Table</div>
                    <ListItemTable data={user} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-10 lg:pb-20">
        <div className="container-fluid">

          <h2>Product Page</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6 flex-wrap">
            {products.map((product) => (
              <div className="w-full" key={product.id}>
                <Link className="card flex flex-col h-full bg-white/10 border border-[#ccc] rounded-xl overflow-hidden" to={`/products/${product.id}`} >
                  <div className="w-full h-[300px] aspect-square bg-white p-6">
                    <img className="w-full h-full object-contain" src={product.image} alt="Product" />
                  </div>
                  <div className="flex flex-col p-5 grow">
                    <div className="flex justify-between mb-5">
                      <div className="badge text-bg-dark">{product.id}</div>
                      <div className="badge text-bg-dark capitalize">{product.category}</div>
                      <div className="badge text-bg-dark">{product.price} $</div>
                    </div>
                    <div className="mt-auto">
                      <h5 className="card-title text-white line-clamp-2">{product.title}</h5>
                      <p className="card-text line-clamp-3">{product.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
