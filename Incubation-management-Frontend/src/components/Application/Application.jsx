import { useForm } from "react-hook-form";
import "./Application.css";
import axios from "../../axios";
import React from "react";
import jwt_decode from "jwt-decode";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Application() {
  const generateError = (error) =>
    toast.error(error, {
      position: "top-right",
    });
  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.file[0]);
    console.log(formData);
    console.log(data.file[0]);
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }

    const token = cookies.jwt;
    const decoded = await jwt_decode(token);
    const datas = {
      userId: decoded.id,
      name: data.name,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      email: data.email,
      Discribe_Your_Company_And_Products: data.company_and_products,
      company_name: data.company_name,
      competitive_advantage: data.competitive_advantage,
      incubation_type: data.incubation_type,
      market_plan: data.market_plan,
      market_size: data.market_size,
      problem: data.problem,
      proposal: data.proposal,
      revenue_model: data.revenue_model,
      solution: data.solution,
      team_and_background: data.team_and_background,
      value_proposition: data.value_proposition,
    };

    axios.post("/api/user/application", datas).then(async (response) => {
      console.log(response.data);
      if (response.data.status) {
        let id = response.data.id;
        await axios
          .post(
            `/api/user/upload-file/${id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then(({ data }) => {
            alert(data);
            navigate("/");
          });
      } else {
        generateError(response.error.message);
      }
    });
  };
  return (
    <>
      <div className="wrapper rounded bg-white">
        <div className="h3">Registration Form</div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          enctype="multipart/form-data"
          id="form"
        >
          <div className="form">
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  {...register("name", {
                    required: true,
                    minLength: 4,
                    maxLength: 20,
                    pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
                  })}
                />
                <span className="text-danger">
                  {errors.name?.type === "required" && (
                    <span>name is required</span>
                  )}
                  {errors.name?.type === "minLength" && (
                    <span>name must morethan or equal to 4 Character</span>
                  )}
                  {errors.name?.type === "maxLength" && (
                    <span>name must less than 20 Character</span>
                  )}
                  {errors.name?.type === "pattern" && (
                    <span>Should not have spaces</span>
                  )}
                </span>
              </div>
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Addess</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("address", {
                    required: true,
                    minLength: 4,
                    maxLength: 50,
                    pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
                  })}
                />
                <span className="text-danger">
                  {errors.address?.type === "required" && (
                    <span>address is required</span>
                  )}
                  {errors.address?.type === "minLength" && (
                    <span>address must morethan or equal to 4 Character</span>
                  )}
                  {errors.address?.type === "maxLength" && (
                    <span>address must less than 50 Character</span>
                  )}
                  {errors.address?.type === "pattern" && (
                    <span>Should not have spaces</span>
                  )}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <label>City</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="City"
                  {...register("city", {
                    required: true,
                    minLength: 4,
                    maxLength: 20,
                    pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
                  })}
                />
                <span className="text-danger">
                  {errors.city?.type === "required" && (
                    <span>city is required</span>
                  )}
                  {errors.city?.type === "minLength" && (
                    <span>city must morethan or equal to 4 Character</span>
                  )}
                  {errors.city?.type === "maxLength" && (
                    <span>city must less than 20 Character</span>
                  )}
                  {errors.city?.type === "pattern" && (
                    <span>Should not have spaces</span>
                  )}
                </span>
              </div>
              <div className="col-md-6 mt-md-0 mt-3">
                <label>State</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="State"
                  {...register("state", {
                    required: true,
                    minLength: 4,
                    maxLength: 20,
                    pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
                  })}
                />
                <span className="text-danger">
                  {errors.state?.type === "required" && (
                    <span>state is required</span>
                  )}
                  {errors.state?.type === "minLength" && (
                    <span>state must morethan or equal to 4 Character</span>
                  )}
                  {errors.state?.type === "maxLength" && (
                    <span>state must less than 20 Character</span>
                  )}
                  {errors.state?.type === "pattern" && (
                    <span>Should not have spaces</span>
                  )}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  {...register("email", {
                    required: true,
                    pattern:
                      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                  })}
                />
                <p className="text-danger">
                  {errors.email?.type === "required" && (
                    <span>Email is required</span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span>Enter valied Email</span>
                  )}
                </p>
              </div>
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Phone No</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Phone No"
                  {...register("phone", {
                    required: true,
                    minLength: 10,
                    maxLength: 10,
                    // valueAsNumber:[true,'helooooooo']
                  })}
                />
                <span className="text-danger">
                  {errors.phone?.type === "required" && (
                    <span>Phone Number is required</span>
                  )}
                  {errors.phone?.type === "minLength" && (
                    <span>Phone Number must have 10 digits</span>
                  )}
                  {errors.phone?.type === "maxLength" && (
                    <span>Phone Number must have 10 digits</span>
                  )}
                  {/* {errors.name?.type === 'pattern' && (
                    <span>Should not have spaces</span>
                  )} */}
                  {/* {errors.phone?.type === "valueAsNumber" && (
                        <span>Enter Only Number</span>
                      )} */}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Company Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Company Name"
                  {...register("company_name", {
                    required: true,
                    minLength: 4,
                    maxLength: 20,
                    pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
                  })}
                />
                <span className="text-danger">
                  {errors.company_name?.type === "required" && (
                    <span>this feild is required</span>
                  )}
                  {errors.company_name?.type === "minLength" && (
                    <span>
                      this feild must morethan or equal to 4 Character
                    </span>
                  )}
                  {errors.company_name?.type === "maxLength" && (
                    <span>this feild must less than 20 Character</span>
                  )}
                  {errors.company_name?.type === "pattern" && (
                    <span>Should not have spaces</span>
                  )}
                </span>
              </div>
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Company Logo</label>
                <img src="" />
                <input
                  type="file"
                  className="form-control"
                  {...register("file")}
                />
                <span className="text-danger"></span>
              </div>
            </div>
            <div className="row">
              <label>Discribe Your Team and Background</label>
              <textarea
                className="form-control texara-height"
                {...register("team_and_background", {
                  required: true,
                  minLength: 4,
                  maxLength: 500,
                  pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
                })}
              />
              <span className="text-danger">
                {errors.team_and_background?.type === "required" && (
                  <span>this feild is required</span>
                )}
                {errors.team_and_background?.type === "minLength" && (
                  <span>this feild must morethan or equal to 4 Character</span>
                )}
                {errors.team_and_background?.type === "maxLength" && (
                  <span>this feild must less than 500 Character</span>
                )}
                {errors.team_and_background?.type === "pattern" && (
                  <span>Should not have spaces</span>
                )}
              </span>
            </div>
            <div className="row">
              <label>Discribe Your Company And Products</label>
              <textarea
                className="form-control texara-height"
                {...register("company_and_products", {
                  required: true,
                  minLength: 4,
                  maxLength: 500,
                  pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
                })}
              />
              <span className="text-danger">
                {errors.company_and_products?.type === "required" && (
                  <span>this feild is required</span>
                )}
                {errors.company_and_products?.type === "minLength" && (
                  <span>this feild must morethan or equal to 4 Character</span>
                )}
                {errors.company_and_products?.type === "maxLength" && (
                  <span>this feild must less than 500 Character</span>
                )}
                {errors.team_and_background?.type === "pattern" && (
                  <span>Should not have spaces</span>
                )}
              </span>
            </div>
            <div className="row">
              <label>Discribe the problem you are trying to solve</label>
              <textarea
                className="form-control texara-height"
                {...register("problem", {
                  required: true,
                  minLength: 4,
                  maxLength: 500,
                  pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
                })}
              />
              <span className="text-danger">
                {errors.problem?.type === "required" && (
                  <span>this feild is required</span>
                )}
                {errors.problem?.type === "minLength" && (
                  <span>this feild must morethan or equal to 4 Character</span>
                )}
                {errors.problem?.type === "maxLength" && (
                  <span>this feild must less than 500 Character</span>
                )}
                {errors.problem?.type === "pattern" && (
                  <span>Should not have spaces</span>
                )}
              </span>
            </div>
            <div className="row">
              <label>What is uniqure about your solution?</label>
              <textarea
                className="form-control texara-height"
                {...register("solution", {
                  required: true,
                  minLength: 4,
                  maxLength: 500,
                  pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
                })}
              />
              <span className="text-danger">
                {errors.solution?.type === "required" && (
                  <span>this feild is required</span>
                )}
                {errors.solution?.type === "minLength" && (
                  <span>this feild must morethan or equal to 4 Character</span>
                )}
                {errors.solution?.type === "maxLength" && (
                  <span>this feild must less than 500 Character</span>
                )}
                {errors.solution?.type === "pattern" && (
                  <span>Should not have spaces</span>
                )}
              </span>
            </div>
            <div className="row">
              <label>What is your value proposition for the customer?</label>
              <textarea
                className="form-control texara-height"
                {...register("value_proposition", {
                  required: true,
                  minLength: 4,
                  maxLength: 500,
                  pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
                })}
              />
              <span className="text-danger">
                {errors.value_proposition?.type === "required" && (
                  <span>this feild is required</span>
                )}
                {errors.value_proposition?.type === "minLength" && (
                  <span>this feild must morethan or equal to 4 Character</span>
                )}
                {errors.value_proposition?.type === "maxLength" && (
                  <span>this feild must less than 500 Character</span>
                )}
                {errors.value_proposition?.type === "pattern" && (
                  <span>Should not have spaces</span>
                )}
              </span>
            </div>

            <div className="row">
              <label>
                Who are your competitors and what is your competative advantage?
              </label>
              <textarea
                className="form-control texara-height"
                {...register("competitive_advantage", {
                  required: true,
                  minLength: 4,
                  maxLength: 500,
                  pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
                })}
              />
              <span className="text-danger">
                {errors.competitive_advantage?.type === "required" && (
                  <span>this feild is required</span>
                )}
                {errors.competitive_advantage?.type === "minLength" && (
                  <span>this feild must morethan or equal to 4 Character</span>
                )}
                {errors.competitive_advantage?.type === "maxLength" && (
                  <span>this feild must less than 500 Character</span>
                )}
                {errors.competitive_advantage?.type === "pattern" && (
                  <span>Should not have spaces</span>
                )}
              </span>
            </div>
            <div className="row">
              <label>Explain your revenue model</label>
              <textarea
                className="form-control texara-height"
                {...register("revenue_model", {
                  required: true,
                  minLength: 4,
                  maxLength: 500,
                  pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
                })}
              />
              <span className="text-danger">
                {errors.revenue_model?.type === "required" && (
                  <span>this feild is required</span>
                )}
                {errors.revenue_model?.type === "minLength" && (
                  <span>this feild must morethan or equal to 4 Character</span>
                )}
                {errors.revenue_model?.type === "maxLength" && (
                  <span>this feild must less than 500 Character</span>
                )}
                {errors.revenue_model?.type === "pattern" && (
                  <span>Should not have spaces</span>
                )}
              </span>
            </div>
            <div className="row">
              <label>What is the potential market size of the product?</label>
              <textarea
                className="form-control texara-height"
                {...register("market_size", {
                  required: true,
                  minLength: 4,
                  maxLength: 500,
                  pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
                })}
              />
              <span className="text-danger">
                {errors.market_size?.type === "required" && (
                  <span>this feild is required</span>
                )}
                {errors.market_size?.type === "minLength" && (
                  <span>this feild must morethan or equal to 4 Character</span>
                )}
                {errors.market_size?.type === "maxLength" && (
                  <span>this feild must less than 500 Character</span>
                )}
                {errors.market_size?.type === "pattern" && (
                  <span>Should not have spaces</span>
                )}
              </span>
            </div>
            <div className="row">
              <label>
                How do you market or plan to market your product and sevieces?
              </label>
              <textarea
                className="form-control texara-height"
                {...register("market_plan", {
                  required: true,
                  minLength: 4,
                  maxLength: 500,
                  pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
                })}
              />
              <span className="text-danger">
                {errors.market_plan?.type === "required" && (
                  <span>this feild is required</span>
                )}
                {errors.market_plan?.type === "minLength" && (
                  <span>this feild must morethan or equal to 4 Character</span>
                )}
                {errors.market_plan?.type === "maxLength" && (
                  <span>this feild must less than 500 Character</span>
                )}
                {errors.market_plan?.type === "pattern" && (
                  <span>Should not have spaces</span>
                )}
              </span>
            </div>
            <div className="form-check">
              <label>Type of Incubation needed</label>
              <p className="text-danger">
                {errors.incubation_type?.type === "required" && (
                  <span>this feild is required</span>
                )}
              </p>
              <input
                className="form-check-input"
                type="radio"
                name="incubation_type"
                id="incubation_type"
                value="physical"
                {...register("incubation_type", {
                  required: true,
                })}
              />
              <label className="form-check-label" for="incubation_type">
                Physical Incubation
              </label>
              <input
                className="form-check-input"
                type="radio"
                name="incubation_type"
                id="incubation_type"
                value="virtual"
                {...register("incubation_type", {
                  required: true,
                })}
              />
              <label className="form-check-label" for="incubation_type">
                Virtual Incubation
              </label>
            </div>

            <div className="row ">
              <label>Upload a detailed business proposal</label>
              <textarea
                className="form-control texara-height"
                {...register("proposal", {
                  required: true,
                  minLength: 4,
                  maxLength: 500,
                  pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
                })}
              />
              <span className="text-danger">
                {errors.proposal?.type === "required" && (
                  <span>this feild is required</span>
                )}
                {errors.proposal?.type === "minLength" && (
                  <span>this feild must morethan or equal to 4 Character</span>
                )}
                {errors.proposal?.type === "maxLength" && (
                  <span>this feild must less than 500 Character</span>
                )}
                {errors.proposal?.type === "pattern" && (
                  <span>Should not have spaces</span>
                )}
              </span>
            </div>
            <div className="d-flex justify-content-center pt-4">
              <button className="btn btn-success" style={{ width: "80px" }}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Application;
