import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <>
      <section id="contact" class="contact section">
        <div
          class="container section-title aos-init aos-animate"
          data-aos="fade-up"
        >
          <h2>Contact</h2>
          <p>Contact Us</p>
        </div>

        <div
          class="container aos-init aos-animate"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div class="row gy-4">
            <div class="col-lg-6">
              <div class="row gy-4">
                <div class="col-md-6">
                  <div
                    class="info-item aos-init aos-animate"
                    data-aos="fade"
                    data-aos-delay="200"
                  >
                    <i class="bi bi-geo-alt"></i>
                    <h3>Address</h3>
                    <p>Wooden Street</p>
                    <p>Hrbr Layout, KN 560043</p>
                  </div>
                </div>

                <div class="col-md-6">
                  <div
                    class="info-item aos-init aos-animate"
                    data-aos="fade"
                    data-aos-delay="300"
                  >
                    <i class="bi bi-telephone"></i>
                    <h3>Call Us</h3>
                    <p>+1 5589 55488 55</p>
                    <p>+1 6678 254445 41</p>
                  </div>
                </div>

                <div class="col-md-6">
                  <div
                    class="info-item aos-init aos-animate"
                    data-aos="fade"
                    data-aos-delay="400"
                  >
                    <i class="bi bi-envelope"></i>
                    <h3>Email Us</h3>
                    <p>info@example.com</p>
                    <p>contact@example.com</p>
                  </div>
                </div>

                <div class="col-md-6">
                  <div
                    class="info-item aos-init aos-animate"
                    data-aos="fade"
                    data-aos-delay="500"
                  >
                    <i class="bi bi-clock"></i>
                    <h3>Open Hours</h3>
                    <p>Monday - Friday</p>
                    <p>9:00AM - 05:00PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-6">
              <form 
                action="forms/contact.php"
                method="post"
                className="php-email-form aos-init aos-animate"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div class="row gy-4">
                  <div class="col-md-6">
                    <input
                      type="text"
                      name="name"
                      class="form-control"
                      placeholder="Your Name"
                      required=""
                    />
                  </div>

                  <div class="col-md-6 ">
                    <input
                      type="email"
                      class="form-control"
                      name="email"
                      placeholder="Your Email"
                      required=""
                    />
                  </div>

                  <div class="col-12">
                    <input
                      type="text"
                      class="form-control"
                      name="subject"
                      placeholder="Subject"
                      required=""
                      spellcheck="false"
                      data-ms-editor="true"
                    />
                  </div>

                  <div class="col-12">
                    <textarea
                      class="form-control"
                      name="message"
                      rows="6"
                      placeholder="Message"
                      required=""
                      spellcheck="false"
                      data-ms-editor="true"
                    ></textarea>
                  </div>

                  <div class="col-12 text-center">
                    <div class="loading">Loading</div>
                    <div class="error-message"></div>
                    <div class="sent-message">
                      Your message has been sent. Thank you!
                    </div>

                    <button type="submit">Send Message</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
