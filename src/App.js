import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  async function fetchData() {
    const response = await fetch("https://dummyjson.com/products?limit=500");
    const data = await response.json();
    setProduct(data.products);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleClick(n) {
    setCurrentPage(n);
  }

  const pageSize = 10;
  const total = Math.ceil(product.length / pageSize);

  const start = currentPage * pageSize;
  const end = start + pageSize;

  return (
    <div className="App">
      <h1>Pagination</h1>

      {/* Pagination Buttons */}

      <div>
        <button
          onClick={() =>
            currentPage > 0 && setCurrentPage((currentPage) => currentPage - 1)
          }
        >
          ◀️
        </button>
        {Array(total)
          .fill(0)
          .map((_, ind) => (
            <button
              key={ind}
              onClick={() => handleClick(ind)}
              style={{ fontWeight: currentPage === ind ? "bold" : "normal" }}
            >
              {ind + 1}
            </button>
          ))}
        <button
          onClick={() =>
            currentPage < total - 1 &&
            setCurrentPage((currentPage) => currentPage + 1)
          }
        >
          ▶️
        </button>
      </div>

      {/* Products Display */}
      <div className="main">
        {product.slice(start, end).map((p) => (
          <div key={p.id} className="product">
            <img className="product-img" src={p.images[0]} alt={p.title} />{" "}
            {/* ✅ Fixed */}
            <h2 className="title">{p.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
