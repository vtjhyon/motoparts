import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../db/connectDB";
import "../css/App.css";


export default function Home() {
  const [sparepart, setSparepart] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const observer = useRef();
  const lastSparepartRef = useRef();

  async function fetchSparepart() {
    const PAGE_LIMIT = 6;
    const { data, error } = await supabase
      .from("sparepart")
      .select("*")
      .range(page * PAGE_LIMIT - PAGE_LIMIT, page * PAGE_LIMIT - 1);

    if (error) {
      console.log("Error fetching sparepart:", error.message);
    } else {
      const newSparepart = searchTerm === "" ? data : [...sparepart, ...data];
      setSparepart(newSparepart);
      setSearchResult(newSparepart);
      setHasMore(data.length === PAGE_LIMIT);
    }
  }

  function handleChange(event) {
    setSearchTerm(event.target.value);
  }
 
  async function searchSparepart(event) {
    event.preventDefault();
    const { data, error } = await supabase
      .from("sparepart")
      .select("*")
      .textSearch(
        `deskripsi`,
        `${
          searchTerm.split(" ").length > 0
            ? searchTerm.split(" ").join(" & ").toLowerCase()
            : searchTerm.toLowerCase()
        }`
      );

    if (error) {
      console.log("Error searching sparepart:", error.message);
    } else {
      setSparepart(data);
      setSearchResult(data);
    }
  }

  function handleObserver(entities) {
    const target = entities[0];
    if (target.isIntersecting && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  useEffect(() => {
    fetchSparepart();
  }, [page]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    observer.current = new IntersectionObserver(handleObserver, options);
    if (lastSparepartRef.current) {
      observer.current.observe(lastSparepartRef.current);
    }
  }, [lastSparepartRef.current]);



  return (
    <div>
      {/* SEARCH FORM */}
      <form onSubmit={searchSparepart}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>

      {/* TABLE */}
      {searchResult.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Kode</th>
              <th>Nama</th>
              <th>Kategori</th>
              <th>Motor</th>
              <th>Gambar</th>
            </tr>
          </thead>

          <tbody>
            {searchResult.map((sp) => (
              <tr key={sp.id}>
                <td>{sp.kode}</td>
                <td>{sp.nama}</td>
                <td>{sp.kategori}</td>
                <td>{sp.motor}</td>
                <td>
                  <img
                    src={sp.imgUrl}
                    alt={sp.kode}
                    style={{ width: "100px" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* LOADING SPINNER */}
      {hasMore && (
        <div className="infinite-scroll">
          <h2>Loading...</h2>
        </div>
      )}
      {/* END OF LIST */}
      {!hasMore && (
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <p>End of list</p>
        </div>
      )}
    </div>
  );
}

