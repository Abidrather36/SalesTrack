import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import './TestimonialComponent.css';
// import testImg1 from "../../assets/img/testmonials/360_F_243123989_6M47rUoWpjJB6WPuKCjNvVObQL5qLEjI.jpg";
// import testImg2 from "../../assets/img/testmonials/displeased-sullen-female-has-discontent-expression-keeps-hands-crossed-shows-her-dislike-frowns-face-feels-unhappy-has-staight-dark-hair-poses-against-pink-wall-negative-emot.avif";
// import testImg3 from "../../assets/img/testmonials/handsome-bearded-guy-posing-against-white-wall_273609-20597.avif";

const TestimonialsComponent = () => {
    return (
        <div className="testimonial-container">
            <div className="section-heading">
                <h2>Testimonials</h2>
                <p>Why companies choose SalesTern for fast sales tracking and seamless lead connections</p>
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
                                    "SalesTern has revolutionized the way we track sales and connect with leads. Their platform streamlines our workflow, making it faster and more effective to manage our sales pipeline."
                                </p>
                                <h4>John Doe</h4>
                                <h6>Sales Director, Growth Solutions</h6>
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
                                    "With SalesTern, our sales tracking is faster and more organized. The insights provided on lead connections have helped us strengthen our relationships and improve our conversion rates."
                                </p>
                                <h4>Jane Smith</h4>
                                <h6>Business Development Manager, Tech Corp</h6>
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
                                    "SalesTern’s lead management features have been crucial in helping us stay on top of our sales targets. The platform is intuitive, and the results have been fantastic."
                                </p>
                                <h4>Mark Johnson</h4>
                                <h6>VP of Sales, Startup Inc.</h6>
                            </div>
                        </div>
                    </SplideSlide>
                </Splide>
            </div>
        </div>
    );
};

export default TestimonialsComponent;