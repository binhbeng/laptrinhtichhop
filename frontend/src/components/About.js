import React, { useState, useEffect, useRef } from "react";
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';
import { CardColumns, Card,Button } from 'react-bootstrap';
const API = process.env.REACT_APP_API;

export const About = () => {
  const [name, setName] = useState("");
  const [customerName, setcustomerName] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [editing, setEditing] = useState(false);
  const [id, setId] = useState("");
  const nameInput = useRef(null);
  const [searchInput, setSearch] = useState("");
  const [reload, setReload] = useState("");
  let [products, setProducts] = useState([]);
  let [cm, setCm] = useState([]);

  let [activePage, setActivePage] = useState(1)
  // let [itemPerPage , setitemPerPage] = useState(3)
  let [listItem, setListItem] = useState(0)


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editing) {
      const res = await fetch(`${API}/comment/create-comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName,
          content

        }),
      });
      await res.json();

    } else {
      const res = await fetch(`${API}/comment/update-comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          customerName,
          content
        }),
      });
      const data = await res.json();
      console.log(data);
      setEditing(false);
      setId("");
    }
    setActivePage(1)
    await doSearch('', 1);

    setcustomerName("");
    setContent("")
   
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
  const getListItem2 = async (searchInput) => {
    let name = searchInput
    let page = 0
    const res = await fetch(`${API}/comment/get-list-comment`, {

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
    setCm(data);
   
  };


  const doSearch = async (searchInput, activePage) => {
    // let name = searchInput
    // let page = activePage
    // debugger
    getListItem(searchInput)
    getListItem2(searchInput)
    const res = await fetch(`${API}/product/get-list-product`, {
      mode: 'no-cors',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // name,
        // page
      }),
    });
    // const data = await res.json();
    // setListItem(data);
    // setProducts(data);
  };
  const deleteUser = async (id) => {
    const userResponse = window.confirm("Are you sure you want to delete it?");
    if (userResponse) {
      const res = await fetch(`${API}/comment/delete-comment?id=${id}`, {
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
    const res = await fetch(`${API}/product/get-comment-info?id=${id}`);
    const data = await res.json();
    setEditing(true);
    setId(id);
    // Reset
    setcustomerName(data.customerName);
    setContent(data.content);
   
    nameInput.current.focus();
  };
  const searchSubmit = async (e) => {
    e.preventDefault();
    // const res = await fetch(`${API}/search/${searchInput}`);
    // const data = await res.json();
    // setProducts(data);
    //setSearch(searchInput)
    //let searchtext = searchInput
    setActivePage(1)
    doSearch(searchInput, 1)
  };

  const handlePageChange = (page) => {
    debugger
    console.log(searchInput)
    setActivePage(page)
    doSearch(searchInput, page)
  }

  useEffect(() => {
    doSearch(searchInput, activePage);
  }, [reload]);
  return (
    <div className="row">

      <div className="col-md-3">
        <h3>Lọc sản phẩm</h3>
      <>
  <Button variant="outline-primary">Mua nhiều</Button>{' '}
  <Button variant="outline-secondary">Mua ít</Button>{' '}
  <Button variant="outline-success">Mua bình thường</Button>{' '}
  <Button variant="outline-warning">Top tháng</Button>{' '}
  <Button variant="outline-danger">Top tuần</Button>{' '}
  <Button variant="outline-info">Hàng mới về</Button>{' '}

</>
      </div>

      <div className="col-md-9">


        <form className="card card-body">
          <div className="row">
            <div className="col-md-9">
              <input
                type="text"


                className="form-control"
                placeholder="Tìm Kiếm"
                //ref={searchInput}
                autoFocus
              />
            </div>
            <div className="col-md-3" >
              <button className="btn btn-primary "

                style={{ margin: '0px 2px' }}
              >
                Tìm Kiếm
              </button>
            </div>

          </div>
        </form>
        
        <h3>Sản phẩm</h3>

        <CardColumns>


          {products.map((products) => (
            <>
              <Card>
                <Card.Img variant="top" src={products.image} />
                <Card.Body>
                  <Card.Title>Tên sản phẩm: {products.name}</Card.Title>
                  <Card.Text>
                    Giá:{products.price}
                  </Card.Text>
                </Card.Body>
              </Card>
            </>
          ))}

        </CardColumns>






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
            onChange={handlePageChange}
            />
          </div>
        </div>
           <h3>Bình Luận</h3> 
        {/* <div className="col-md-12">
        {cm.map((cm) => (
          
                 <>
                 <h6>Tên người dùng: {cm.customerName}</h6>
                 <h6>Nội dung: {cm.content}</h6>
                <hr/>
                
                  </>
                  
                  
                 
                
              ))}
        </div> */}
 <div className="col-md-12">
          <table className="table table-striped">
            <thead>
              <tr>
                
                <th>Name</th>
                <th>Comment</th>
               
 
              </tr>
            </thead>
            <tbody>
              {cm.map((cm) => (
                <tr key={cm.id}>
                  <td>{cm.customerName}</td>
                  <td>{cm.content}</td>
                  
               
                  
                  
                  <td>
                    <button
                      className="btn btn-warning btn-sm btn-block"
                      onClick={(e) => editUser(cm.id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm btn-block"
                      onClick={(e) => deleteUser(cm.id)}
                    >
                      Delete
                  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <form onSubmit={handleSubmit} className="card card-body">
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setcustomerName(e.target.value)}
              value={customerName}
              className="form-control"
              placeholder="Name"
              ref={nameInput}
              autoFocus
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className="form-control"
              placeholder="Bình luận"
            />
          </div>
         
          
          
          <button className="btn btn-primary btn-block">
            {editing ? "Sửa comment" : "Bình luận"}
          </button>
        </form>
        
      </div>
    </div>
    
  );
};
