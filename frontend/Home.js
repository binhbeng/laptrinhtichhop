import React, { useState, useEffect, useRef } from "react";
import Pagination from "react-js-pagination";

const API = process.env.REACT_APP_API;

export const Home = () => {
  const [name, setName] = useState("");
  const [StudyTime,setStudyTime]=useState("");
  const [Absences,setAbsence]=useState("");
  const [Failures,setFailure]=useState("");
  const [G1,setG1]=useState("");
  const [G2,setG2]=useState("");
  const [G3,setG3]=useState("");
  const [editing, setEditing] = useState(false);
  const [id, setId] = useState("");
  const nameInput = useRef(null);
  const [searchInput, setSearch] = useState("");
  const [reload,setReload]=useState("");
  let [users, setUsers] = useState([]);

  let [activePage , setActivePage] = useState(1)
  // let [itemPerPage , setitemPerPage] = useState(3)
  let [listItem , setListItem] = useState(0)


  const [StudyTimePre,setStudyTimePre]=useState("");
  const [AbsencesPre,setAbsencePre]=useState("");
  const [FailuresPre,setFailurePre]=useState("");
  const [G1Pre,setG1Pre]=useState("");
  const [G2Pre,setG2Pre]=useState("");
  const [G3Pre,setG3Pre]=useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editing) {
      const res = await fetch(`${API}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          StudyTime,
          Absences,
          Failures,
          G1,
          G2,
          G3
        }),
      });
      await res.json();
    } else {
      const res = await fetch(`${API}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          StudyTime,
          Absences,
          Failures,
          G1,
          G2,
          G3
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
    setStudyTime("")
    setAbsence("")
    setFailure("")
    setG1("")
    setG2("")
    setG3("")
    nameInput.current.focus();
  };

  const preSubmit = async (e) =>{
    debugger
    e.preventDefault();
    const res = await fetch(`${API}/pred`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          StudyTimePre,
          AbsencesPre,
          FailuresPre,
          G1Pre,
          G2Pre
        }),
      });
    debugger
    const data = await res.json();
    setG3Pre(data)
  };

  const getListItem = async (searchInput) => {
    let name = searchInput
    let page = 0
    const res = await fetch(`${API}/doSearch`, {
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
    setListItem(data);
    //setUsers(data);
  };


  const doSearch = async (searchInput, activePage) => {
    let name = searchInput
    let page = activePage
    debugger
    getListItem(searchInput)
    const res = await fetch(`${API}/doSearch`, {
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
    setUsers(data);
  };

  const searchSubmit = async (e) => {
    e.preventDefault();
    // const res = await fetch(`${API}/search/${searchInput}`);
    // const data = await res.json();
    // setUsers(data);
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
  //   setUsers(data);
  // };

  const deleteUser = async (id) => {
    const userResponse = window.confirm("Are you sure you want to delete it?");
    if (userResponse) {
      const res = await fetch(`${API}/users/${id}`, {
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
    const res = await fetch(`${API}/users/${id}`);
    const data = await res.json();

    setEditing(true);
    setId(id);

    // Reset
    setName(data.name);
    setStudyTime(data.StudyTime);
    setAbsence(data.Absences);
    setFailure(data.Failures);
    setG1(data.G1);
    setG2(data.G2);
    setG3(data.G3);
    nameInput.current.focus();
  };

  const handlePageChange = (page) => {
    debugger
    console.log(searchInput)
    setActivePage(page)
    doSearch(searchInput,page)
  }

  useEffect(() => {
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
              type="number"
              onChange={(e) => setStudyTime(e.target.value)}
              value={StudyTime}
              className="form-control"
              placeholder="StudyTime"
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              onChange={(e) => setAbsence(e.target.value)}
              value={Absences}
              className="form-control"
              placeholder="Absence"
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              onChange={(e) => setFailure(e.target.value)}
              value={Failures}
              className="form-control"
              placeholder="Failure"
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              onChange={(e) => setG1(e.target.value)}
              value={G1}
              className="form-control"
              placeholder="G1"
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              onChange={(e) => setG2(e.target.value)}
              value={G2}
              className="form-control"
              placeholder="G2"
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              onChange={(e) => setG3(e.target.value)}
              value={G3}
              className="form-control"
              placeholder="G3"
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
            <div className="col-md-2">
              <input
                  type="text"
                  onChange={(e) => setStudyTimePre(e.target.value)}
                  //value={searchInput}
                  className="form-control"
                  placeholder="StudyTimePre"
                  //ref={searchInput}
                  autoFocus
              />
            </div>
            <div className="col-md-2">
              <input
                  type="text"
                  onChange={(e) => setAbsencePre(e.target.value)}
                  //value={searchInput}
                  className="form-control"
                  placeholder="AbsencePre"
                  //ref={searchInput}
                  autoFocus
              />
            </div>
            <div className="col-md-2">
              <input
                  type="text"
                  onChange={(e) => setFailurePre(e.target.value)}
                  //value={searchInput}
                  className="form-control"
                  placeholder="FailurePre"
                  //ref={searchInput}
                  autoFocus
              />
            </div>
            <div className="col-md-2">
              <input
                  type="text"
                  onChange={(e) => setG1Pre(e.target.value)}
                  //value={searchInput}
                  className="form-control"
                  placeholder="G1Pre"
                  //ref={searchInput}
                  autoFocus
              />
            </div>
            <div className="col-md-2">
              <input
                  type="text"
                  onChange={(e) => setG2Pre(e.target.value)}
                  //value={searchInput}
                  className="form-control"
                  placeholder="G2Pre"
                  //ref={searchInput}
                  autoFocus
              />
            </div>
            <div className="col-md-2">
              <input
                  type="text"
                  // onChange={(e) => setSearch(e.target.value)}
                  value={G3Pre}
                  className="form-control"
                  placeholder="G3Pre"
                  //ref={searchInput}
                  disabled="disabled"
                  autoFocus
              />
            </div>
            <div className="col-md-12" >
              <button className="btn btn-primary "
                      onClick={preSubmit}
                      style={{margin:'0px 2px'}}
              >
                Dự Đoán
              </button>
            </div>

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
                <th>Name</th>
                <th>StudyTime</th>
                <th>Absence</th>
                <th>Failure</th>
                <th>G1</th>
                <th>G2</th>
                <th>G3</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.StudyTime}</td>
                  <td>{user.Absences}</td>
                  <td>{user.Failures}</td>
                  <td>{user.G1}</td>
                  <td>{user.G2}</td>
                  <td>{user.G3}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm btn-block"
                      onClick={(e) => editUser(user._id)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm btn-block"
                      onClick={(e) => deleteUser(user._id)}
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
                itemsCountPerPage={5}
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
