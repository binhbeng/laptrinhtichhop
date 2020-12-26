import React, { useState, useEffect, useRef } from "react";
import Pagination from "react-js-pagination";

const API = process.env.REACT_APP_API;

export const Home = () => {
  const [name, setName] = useState("");
  const [price,setPrice]=useState("");
  const [details,setDetails]=useState("");
  const [image,setImage]=useState("");
  const [editing, setEditing] = useState(false);
  const [id, setId] = useState("");
  const nameInput = useRef(null);
  const [searchInput, setSearch] = useState("");
  const [reload,setReload]=useState("");
  let [products, setProducts] = useState([]);

  let [activePage , setActivePage] = useState(1)
  // let [itemPerPage , setitemPerPage] = useState(3)
  let [listItem , setListItem] = useState(0)


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editing) {
      const res = await fetch(`${API}/product/create-product`,{
       
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          details,
          image       
        }),
      });
     await res.json();
     
    } else {
      const res = await fetch(`${API}/product/update-product`, {    
        method: "POST",
        headers: {
          "Content-Type": "application/json",         
        },
        body: JSON.stringify({
          id,
          name,
          price,
          details,
          image
        }),
      });
      const data = await res.json();
      console.log(data);
      setEditing(false);
      setId("");
    }
    setActivePage(1)
    await doSearch('',1);

    setName("");
    setPrice("")
    setDetails("")
    setImage("")
    nameInput.current.focus();
  };

 

  const getListItem = async (searchInput) => {
    let name = searchInput
    let page = 0
    const res = await fetch(`${API}/product/get-list-product`, {
    
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // name,
        // page
      }),
    });
    const data = await res.json();
    setListItem(data);
    setProducts(data);
  };


  const doSearch = async (searchInput, activePage) => {
     let name = searchInput
     let page = activePage
   // debugger
    getListItem(searchInput)
    const res = await fetch(`${API}/product/find-product`, {
     
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
         name,
         page
      }),
    });
    const data = await res.json();
    // setListItem(data);
    //setProducts(data);
 
  };

  const searchSubmit = async (e) => {
    e.preventDefault();
    // const res = await fetch(`${API}/search/${searchInput}`);
    // const data = await res.json();
    // setProducts(data);
    //setSearch(searchInput)
    //let searchtext = searchInput
    setActivePage(1)
    doSearch(searchInput,1)
  };

  // const getUsersByName = async (e) => {
  //   debugger
  //   e.preventDefault();
  //   const res = await fetch(`${API}/search/${searchInput}`);
  //   const data = await res.json();
  //   setProducts(data);
  // };

  const deleteUser = async (id) => {
    const userResponse = window.confirm("Are you sure you want to delete it?");
    if (userResponse) {
      const res = await fetch(`${API}/product/delete-product?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      //await doSearch(searchInput);
      setActivePage(1)
      doSearch(searchInput,1)

    }
  };

  const editUser = async (id) => {
    const res = await fetch(`${API}/product/get-product-info?id=${id}`);
    const data = await res.json();
    setEditing(true);
    setId(id);
    // Reset
    setName(data.name);
    setPrice(data.price);
    setDetails(data.details);
    setImage(data.image);
    nameInput.current.focus();
  };

  const handlePageChange = (page) => {
    debugger
    console.log(searchInput)
    setActivePage(page)
    doSearch(searchInput,page)
  }

  useEffect(() => {
   // doSearch(searchInput);
    doSearch(searchInput,activePage);
  }, [reload]);

  return (
    <div className="row">

      <div className="col-md-3">
        <form onSubmit={handleSubmit} className="card card-body">
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="form-control"
              placeholder="Name"
              ref={nameInput}
              autoFocus
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="form-control"
              placeholder="Price"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setDetails(e.target.value)}
              value={details}
              className="form-control"
              placeholder="Details"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setImage(e.target.value)}
              value={image}
              className="form-control"
              placeholder="Image"
            />
          </div>
          
          
          <button className="btn btn-primary btn-block">
            {editing ? "Update" : "Create"}
          </button>
        </form>
      </div>

      <div className="col-md-9">
        <form className="card card-body">
          <div className="row">
           
            
            
            
            

          </div>
        </form>



        <form className="card card-body">
          <div className="row">
            <div className="col-md-9">
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                value={searchInput}
                className="form-control"
                placeholder="Tìm Kiếm"
                //ref={searchInput}
                autoFocus
              />
            </div>
            <div className="col-md-3" >
              <button className="btn btn-primary "
                onClick={searchSubmit}
                style={{margin:'0px 2px'}}
              >
                Tìm Kiếm
              </button>
            </div>
            
          </div>
        </form>


        <div className="col-md-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Details</th>
                <th>Image</th>
 
              </tr>
            </thead>
            <tbody>
              {products.map((products) => (
                <tr key={products.id}>
                  <td>{products.id}</td>
                  <td>{products.name}</td>
                  
                  <td>{products.price}</td>
                  <td>{products.details}</td>
                  
                  <td> <img src={products.image} alt="" width="100px" height="100px"/></td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm btn-block"
                      onClick={(e) => editUser(products.id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm btn-block"
                      onClick={(e) => deleteUser(products.id)}
                    >
                      Delete
                  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-12">
          <div className="row">
            <Pagination
                itemClass="page-item"
                linkClass="page-link"
                prevPageText="Previous"
                nextPageText="Next"
                hideFirstLastPages={true}
                activePage={activePage}
                itemsCountPerPage={10}
                totalItemsCount={listItem.length}
                pageRangeDisplayed={5}
                onChange={handlePageChange} //de nhu nay ak
            />
          </div>
        </div>
      </div>
    </div>
  );
};
