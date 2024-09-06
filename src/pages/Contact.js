import React, { useContext, useState } from "react";
import "./contact.css";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { Context } from "../context/Context";
const Contact = () => {
  const context = useContext(Context);
  const language = context.langValue.contact;
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [capVal, setCapVal] = useState(null);
  const formChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log(1);
    await axios.post("http://localhost:8000/api/news/sendEmail", {
      name: form.name,
      from: form.email,
      subject: form.subject,
      text: form.message,
    });
    console.log("email sent successfully");
  };

  return (
    <>
      <section className="contact" id="contact">
        <div className="container">
          <div className="heading text-center">
            <h2>
              {language && language.pageName}
              <span> {language && language.insideSpan} </span>
            </h2>
          </div>
          <div className="row">
            <div className="col-md-5">
              <div className="title">
                <h3> {language && language.detail} </h3>
              </div>
              <div className="content">
                <div className="info">
                  <i className="fas fa-mobile-alt"></i>
                  <h4 className="d-inline-block">
                    {language && language.phone}
                    <br />
                    <span>+12457836913 , +12457836913</span>
                  </h4>
                </div>
                <div className="info">
                  <i className="far fa-envelope"></i>
                  <h4 className="d-inline-block">
                    {language && language.email}
                    <br />
                    <span>example@info.com</span>
                  </h4>
                </div>
                <div className="info">
                  <i className="fas fa-map-marker-alt"></i>
                  <h4 className="d-inline-block">
                    {language && language.address}
                    <br />
                    <span>6743 last street , Abcd, Xyz</span>
                  </h4>
                </div>
              </div>
            </div>

            <div className="col-md-7">
              <form onSubmit={handleSubmit}>
                <div className="row1">
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={language && language.name}
                      name="name"
                      value={form.name}
                      onChange={formChange}
                    />
                  </div>
                  <div className="col-sm-6">
                    <input
                      type="email"
                      className="form-control"
                      placeholder={language && language.FormEmail}
                      name="email"
                      value={form.email}
                      onChange={formChange}
                    />
                  </div>
                  <div className="col-sm-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={language && language.subject}
                      name="subject"
                      value={form.subject}
                      onChange={formChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    rows="5"
                    id="comment"
                    placeholder={language && language.massage}
                    name="message"
                    value={form.message}
                    onChange={formChange}
                  ></textarea>
                </div>
                <ReCAPTCHA
                  sitekey="6LeIOzYqAAAAAPhtoSrrgc15MY7JLxjPD-BiNgnd"
                  onChange={(val) => setCapVal(val)}
                />
                <button
                  disabled={!capVal}
                  className="btn btn-block"
                  type="submit"
                >
                  {language && language.btn}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
