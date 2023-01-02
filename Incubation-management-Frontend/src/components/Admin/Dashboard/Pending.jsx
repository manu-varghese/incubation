import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { UserData } from "../../../store/DbContext";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "../../../axios";
import Hr from "./Hr";

function Pending(props) {
  const [allApp, setAllApp] = useState([]);
  // const { application } = useContext(UserData);
  const [selectApp, setSelectApp] = useState({});
  const [state, setState] = useState(false);

  const approveApplication = (element) => {
    axios
      .get(`/api/admin/applicationApprove/${element._id}`)
      .then((response) => {
        props.application();
        setState(true);
      });
  };

  useEffect(() => {
    hi();
    setState(false)
  }, [state]);
  var hi = function () {
    axios.get("/api/admin/getApplicationList").then((response) => {
      console.log("hiiiii");
      setAllApp(response.data);
    });
  };
  const openModel = async (element) => {
    console.log(element);
    await setSelectApp(element);
    console.log(selectApp);
  };

  // useEffect(()=>{
  //   console.log(selectApp);
  // },[selectApp])
  return (
    <div className="pending-application">
      <h1 className="mx-2 mt-5 text-dark ">PENDING APPLICATION</h1>

      <table className="table align-middle mb-0 bg-white table-bordered">
        <thead className="bg-light text-center">
          <tr>
            <th>No</th>
            <th>Company name</th>
            <th>Company details</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {allApp.map((datas, i) => {
            return (
              <tr>
                <th scope="row">{i + 1}</th>
                <td key={i}>{datas.company_name}</td>
                <td key={i}>{datas.Discribe_Your_Company_And_Products}</td>

                <td>
                  {datas.isApproved === false ? (
                    <>
                      <Dropdown>
                        <Dropdown.Toggle variant="warning" id="dropdown-basic">
                          Pending
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() => approveApplication(datas)}
                          >
                            Approved
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </>
                  ) : (
                    <p>Approved</p>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Pending;
