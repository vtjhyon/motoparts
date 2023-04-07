import React, { useState, useEffect } from "react";
import { supabase } from "../db/connectDB";
import "../css/App.css";

export default function Home() {
  const [sparepart, setSparepart] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  async function fetchSparepart() {
    const { data, error } = await supabase.from("sparepart").select("*");

    if (error) {
      console.log("Error fetching sparepart:", error.message);
    } else {
      const newSparepart = searchTerm === "" ? data : [...sparepart, ...data];
      setSparepart(newSparepart);
    }
  }

  function handleChange(event) {
    setSearchTerm(event.target.value);
  }

  async function searchSparepart(event) {
    event.preventDefault();
    const { data, error } = await supabase.rpc("search", { kata: searchTerm });

    if (error) {
      console.log("Error searching sparepart:", error.message);
    } else {
      setSparepart(data);
      setSearchResult(data);
    }
  }

  useEffect(() => {
    fetchSparepart();
  }, [page]);

  return (
    <div>
      <form onSubmit={searchSparepart}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>

      {searchResult.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Kode</th>
              <th>Nama</th>
              <th>Kategori</th>
              <th>Motor</th>
              <th>Gambar</th>
              <th>Harga</th>
            </tr>
          </thead>
          <tbody>
            {searchResult.map((sp, index) => (
              <tr key={sp.id}>
                <td>{sp.kode}</td>
                <td>{sp.nama}</td>
                <td>{sp.kategori}</td>
                <td>{sp.motor}</td>
                <td>
                  <img
                    src={sp.imgurl}
                    alt={sp.kode}
                    style={{ width: "100px" }}
                  />
                </td>
                <td>
                  {"Rp "}
                  {sp.harga.toLocaleString("id-ID")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
