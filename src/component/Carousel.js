import Carousel from 'react-bootstrap/Carousel';
import "../style/carousel.css"
import bg1 from "../assets/Wardobe.jpg"
import bg2 from "../assets/girl autmn.jpg"
import bg3 from "../assets/fashion1.jpg"


function Carouselreact() {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item className='carousel-parent'>
        <img
          className="d-block w-100"
          src={bg1}
          alt="First slide"
          height={600}
        />
        <Carousel.Caption>
            <div className='Carousel-content'>
          <p>Don't just choose Colors , Choose to Blend with Nature.</p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='carousel-parent'>
        <img
          className="d-block w-100"
          src={bg2}
          alt="Second slide"
          height={600}
        />
        <Carousel.Caption>
        <div className='Carousel-content'>
          <p>Choose Color to Blossom in Autumn.</p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='carousel-parent'>
        <img
          className="d-block w-100"
          src={bg3}
          alt="Third slide"
          height={600}
        />
        <Carousel.Caption>
        <div className='Carousel-content'>
          <p>
          Match the Color to Fly in the Sky.
          </p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carouselreact;