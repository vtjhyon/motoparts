import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Modal from 'react-modal';
import { supabase } from '../db/connectDB';
import '../css/App.css';

const Master = ({ token }) => {
  let navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [sparepart, setSparepart] = useState([]);

  const [sp, setSp] = useState({
    kode: '',
    nama: '',
    kategori: '',
    imgUrl: '',
  });

  const [sp2, setSp2] = useState({
    id: '',
    kode: '',
    nama: '',
    kategori: '',
    imgUrl: '',
  });

  useEffect(() => {
    fetchSparepart();
  }, []);

  useEffect(() => {
    Modal.setAppElement(document.getElementById('root'));
  }, []);

  function toggleEditModal() {
    setIsEditModalOpen(!isEditModalOpen);
  }

  async function fetchSparepart() {
    const { data } = await supabase.from('sparepart').select('*');
    setSparepart(data);
  }

  function handleChange(event) {
    setSp((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleChange2(event) {
    setSp2((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function deleteSp(spId) {
    const { data, error } = await supabase
      .from('sparepart')
      .delete()
      .eq('id', spId);

    fetchSparepart();
  }

  function displaySp(spId) {
    sparepart.map((sp) => {
      if (sp.id == spId) {
        setSp2({
          id: sp.id,
          kode: sp.kode,
          nama: sp.nama,
          kategori: sp.kategori,
          imgUrl: sp.imgUrl,
        });
      }
    });
  }

  async function updateSp(spId) {
    const { data, error } = await supabase
      .from('sparepart')
      .update({
        id: sp2.id,
        kode: sp2.kode,
        nama: sp2.kode,
        kategori: sp2.kategori,
        imgUrl: sp2.imgUrl,
      })
      .eq('id', spId);

    fetchSparepart();
  }

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    sessionStorage.removeItem('token');
    navigate('/');
    if (error) console.log(error);
  }
  return (
    <div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <Link to="/create">
        <button>Create New</button>
      </Link>
  
      <Modal isOpen={isEditModalOpen} onRequestClose={toggleEditModal} ariaHideApp={false}>
        <h2>Edit Sparepart</h2>
        <form onSubmit={() => updateSp(sp2.id)}>
          <label>
            Kode:
            <input
              type="text"
              name='kode'
              onChange={handleChange2}
              defaultValue={sp2.kode}
              placeholder='Kode Produk'
            />
          </label>
          <br />
          <label>
            Nama:
            <input
              type="text"
              name='nama'
              onChange={handleChange2}
              defaultValue={sp2.nama}
              placeholder='Nama Produk'
            />
          </label>
          <br />
          <label>
            Kategori:
            <input
              type="text"
              name='kategori'
              onChange={handleChange2}
              defaultValue={sp2.kategori}
              placeholder='Kategori'
            />
          </label>
          <br />
          <label>
            URL Gambar:
            <input
              type="text"
              name='imgUrl'
              onChange={handleChange2}
              defaultValue={sp2.imgUrl}
              placeholder='URL Gambar'
            />
          </label>
          <br />
          <button type='submit'>Save Changes</button>
        </form>
      </Modal>
  
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Kode</th>
            <th>Nama</th>
            <th>Kategori</th>
            <th>Gambar</th>
            <th>Actions</th>
          </tr>
        </thead>
  
        <tbody>
          {sparepart.map((sp) =>
            <tr key={sp.id}>
              <td>{sp.id}</td>
              <td>{sp.kode}</td>
              <td>{sp.nama}</td>
              <td>{sp.kategori}</td>
              <td>
                <img src={sp.imgUrl} alt={sp.kode} style={{ width: '150px', height: '150px' }} />
              </td>
              <td>
                <button onClick={() => deleteSp(sp.id)}>Delete</button>
                <button onClick={() => { displaySp(sp.id); toggleEditModal(); }}>Edit</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
  
  
}

export default Master