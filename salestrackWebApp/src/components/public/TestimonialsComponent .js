import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import "./TestimonialComponent.css"
// import testImg1 from "../../assets/img/testmonials/360_F_243123989_6M47rUoWpjJB6WPuKCjNvVObQL5qLEjI.jpg";
// import testImg2 from "../../assets/img/testmonials/displeased-sullen-female-has-discontent-expression-keeps-hands-crossed-shows-her-dislike-frowns-face-feels-unhappy-has-staight-dark-hair-poses-against-pink-wall-negative-emot.avif";
// import testImg3 from "../../assets/img/testmonials/handsome-bearded-guy-posing-against-white-wall_273609-20597.avif";

const TestimonialsComponent = () => {
    return (
        <div className="testimonial-container" style={{width:"100%"}} >
            <div className="section-heading">
            <div class="container section-title aos-init aos-animate" data-aos="fade-up"><h2>Testimonials</h2></div>

            </div>

            <div className="testimonial-wrapper">
                <Splide
                    options={{
                        rewind: true,
                        width: '100%',
                        gap: '1.5rem',
                        type: 'loop',
                        perPage: 1,
                        autoplay: true,
                        arrows: true,
                        pagination: false,
                    }}
                    aria-label="Testimonials">
                    <SplideSlide>
                        <div className="testimonial-single">
                            <div style={{ flex: '1', paddingRight: '20px' }}>
                                {/* <img src={testImg1} alt="John Doe" /> */}
                            </div>
                            <div style={{ flex: '2' }}>
                                <p>
                                    "iAminterviewd has been an invaluable partner in helping us screen top technical talent. Their platform makes the process seamless, and their expert interviewers ensure we get the right candidates."
                                </p>
                                <h4>John Doe</h4>
                                <h6>Software Engineering Lead</h6>
                            </div>
                        </div>
                    </SplideSlide>
                    <SplideSlide>
                        <div className="testimonial-single">
                            <div style={{ flex: '1', paddingRight: '20px' }}>
                                {/* <img src={testImg2} alt="Jane Smith" /> */}
                            </div>
                            <div style={{ flex: '2' }}>
                                <p>
                                    "With iAminterviewd, we streamlined our technical interview process, saving us time while ensuring a higher quality of candidates. Their detailed feedback post-interviews is especially helpful!"
                                </p>
                                <h4>Jane Smith</h4>
                                <h6>HR Manager, Tech Corp</h6>
                            </div>
                        </div>
                    </SplideSlide>
                    <SplideSlide>
                        <div className="testimonial-single">
                            <div style={{ flex: '1', paddingRight: '20px' }}>
                                {/* <img src={testImg3} alt="Mark Johnson" /> */}
                            </div>
                            <div style={{ flex: '2' }}>
                                <p>
                                    "The expertise of iAminterviewd’s technical interviewers has been crucial in identifying top talent for our growing team. The platform is user-friendly, and the results speak for themselves."
                                </p>
                                <h4>Mark Johnson</h4>
                                <h6>CTO, Startup Inc.</h6>
                            </div>
                        </div>
                    </SplideSlide>
                </Splide>
            </div>
        </div>
    );
};
export default TestimonialsComponent;