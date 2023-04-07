import React, { useState } from 'react';
import { supabase } from '../db/connectDB';
import { useNavigate } from 'react-router-dom';
import '../css/CreateSP.css'

const CreateSP = () => {
  const navigate = useNavigate();
  const [sp, setSp] = useState({
    kode: '',
    nama: '',
    kategori: '',
    imgUrl: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSp(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await supabase
      .from('sparepart')
      .insert({
        kode: sp.kode,
        nama: sp.nama,
        kategori: sp.kategori,
        imgUrl: sp.imgUrl
      });
    navigate('/master');
  };

  return (
    <div>
      <h1>Create New Sparepart</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Kode Part:
          <input type="text" name="kode" onChange={handleChange} value={sp.kode} />
        </label>
        <label>
          Nama Produk:
          <input type="text" name="nama" onChange={handleChange} value={sp.nama} />
        </label>
        <label>
          Kategori:
          <input type="text" name="kategori" onChange={handleChange} value={sp.kategori} />
        </label>
        <label>
          URL Gambar:
          <input type="text" name="imgUrl" onChange={handleChange} value={sp.imgUrl} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateSP;
