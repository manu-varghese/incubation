import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import axios from "../../../axios";
function UserMange() {
  const [state, setState] = useState([]);
  const [block, setBlock] = useState(false);
  useEffect(() => {
    axios.get("/api/user/getUserInfo").then((response) => {
      setState(response.data);
    });
  }, [block]);

  const blockUser = (id) => {
    console.log(id);
    axios.get(`/api/admin/blockUser/${id}`).then(({ data }) => {
      console.log(data);
       setBlock(!block);
    });
  };

  const unblockUser = (id) => {
    console.log(id);
    axios.get(`/api/admin/unblockUser/${id}`).then(({ data }) => {
      console.log(data);
      setBlock(!block);
    });
  };

  return (
    <div className="row" style={{ height: "100vh" }}>
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10">
        <h1 className="my-5">User Management</h1>
        <table class="table table-secondary table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Eamil</th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody>
            {state.map((data, i) => {
              return (
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>
                    {data.isBlocked === false ? (
                      <button
                        type="button"
                        onClick={() => blockUser(data._id)}
                        class="btn btn-primary"
                      >
                        UNBLOCK
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => unblockUser(data._id)}
                        class="btn btn-secondary"
                      >
                        BLOCK
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserMange;
