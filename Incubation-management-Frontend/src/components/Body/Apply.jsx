import axios from "../../axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Apply.css";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import Hr from "../Admin/Dashboard/Hr";

function Apply() {
  const [cookies] = useCookies([]);
  const [selectedApplication, setApplication] = useState({});
  const [getApp, setGetApp] = useState(false);

  const generateError = (error) =>
    toast.error(error, {
      position: "top-right",
    });

  const hello = async () => {
    const token = cookies.jwt;
    const decoded = await jwt_decode(token);
    let id = decoded.id;
    console.log(id);
    axios.get(`/api/user/didApply/${id}`).then((response) => {
      if (response.data.status === false) {
        console.log("im here errro status falsse");
        let error = "Hello guyz";
        setGetApp(true);
        // generateError(error);
      } else {
        setApplication(response.data);
      }
    });
  };

  const openModel = () => {};

  useEffect(() => {
    hello();
  }, []);

  return (
    <>
      {getApp !== true ? (
        <>
          <div className="centerDiv">
            <h4>Applicaiton Submitted</h4>
            <button
              type="button"
              class="btn btn-warning w-25 mb-5"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => openModel()}
            >
              Open your Application
            </button>
           {
            selectedApplication.isApproved ? <p>Status: <span style={{color:'green'}}>Approved</span></p>:<p>Status: <span style={{color:'red'}}>Requested</span></p>
            
           }
            
          </div>
        </>
      ) : (
        <div className="centerDiv">
          <NavLink to={"/apply"}><button className="btn btn-primary">Apply</button></NavLink>{" "}
        </div>
      )}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                DETAILED VIEW
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div id="hello">
                <h4 className="mb-1" style={{ color: "#35558a" }}>
                  {selectedApplication.company_name}
                </h4>
                <Hr />
                <div className="d-flex justify-content-between">
                  <p className="small">Client Name</p>
                  <p className="small">{selectedApplication.name}</p>
                </div>
                <Hr />
                <div className="d-flex justify-content-between">
                  <p className="small">Phone</p>
                  <p className="small">{selectedApplication.phone}</p>
                </div>
                <Hr />
                <div className="d-flex justify-content-between">
                  <p className="small">Email</p>
                  <p className="small">{selectedApplication.email}</p>
                </div>
                <Hr />
                <div className="d-flex justify-content-between">
                  <p className="small">Address</p>
                  <p className="small">
                    {selectedApplication.address},{selectedApplication.city},
                    {selectedApplication.state}
                  </p>
                </div>
                <Hr />
                <div className="d-flex justify-content-between">
                  <p className="small">Discribe Your Team and Background</p>
                  <p className="small">
                    {selectedApplication.Discribe_Your_Company_And_Products}
                  </p>
                </div>
                <Hr />
                <div className="d-flex justify-content-between">
                  <p className="small">
                    Who are your competitors and competative advantage?
                  </p>
                  <p className="small">
                    {selectedApplication.competitive_advantage}
                  </p>
                </div>
                <Hr />
                <div className="d-flex justify-content-between">
                  <p className="small">
                    How do you market or plan to market your product and
                    sevieces?
                  </p>
                  <p className="small">{selectedApplication.market_plan}</p>
                </div>
                <Hr />
                <div className="d-flex justify-content-between">
                  <p className="small">
                    What is the potential market size of the product?
                  </p>
                  <p className="small">{selectedApplication.market_size}</p>
                </div>
                <Hr />
                <div className="d-flex justify-content-between ">
                  <p className="small">Company Logo</p>
                  {
                    <img
                      style={{ width: "50px" }}
                      src={`http://localhost:3008/uploads/${selectedApplication.userId}.jpg`}
                      alt="logo"
                    />
                  }
                </div>
                <Hr />
                <div className="d-flex justify-content-between">
                  <p className="small">
                    Type of incubation choosed : 
                  </p>
                  <p className="small">{selectedApplication.incubation_type}</p>
                </div>
                <Hr />
                <div className="d-flex justify-content-between">
                  <p className="small">
                    Discribe the problem you are trying to solve
                  </p>
                  <p className="small">{selectedApplication.problem}</p>
                </div>
                <Hr />
                <div className="d-flex justify-content-between">
                  <p className="small">What is uniqure about your solution?</p>
                  <p className="small">{selectedApplication.solution}</p>
                </div>
                <Hr />
                <div className="d-flex justify-content-between">
                  <p className="small">
                    What is your value proposition for the customer?
                  </p>
                  <p className="small">{selectedApplication.revenue_model}</p>
                </div>
                <Hr />
                <div className="d-flex justify-content-between">
                  <p className="small">Explain your revenue model</p>
                  <p className="small">{selectedApplication.proposal}</p>
                </div>
                <Hr />
                <div className="d-flex justify-content-between">
                  <p className="small">Discribe Your Team and Background</p>
                  <p className="small">
                    {selectedApplication.team_and_background}
                  </p>
                </div>
                <Hr />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Apply;
