import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './FeatureSection1.css';
import home2 from './Home.jpg'; 
import home from './Home.png'; 
import education from './Education.png';
import aware from './awareness.webp';
import support from './Support.png';
import livehood from './Livelihood.png';
import other from './other.jpg';

const FeatureSection2 = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate(); 

  const handleImageClick = (index) => {
    setActiveIndex(index);
  };

  const handleHomeClick = () => {
    navigate('/homepage'); 
  };

  const features = [
    { icon: home, title: 'Residential Facility', description: 'Pune based charitable hostel facility for boys with 16+ age' },
    { icon: education, title: 'Support for Education', description: 'Financial support for education for needy students (non-residential)' },
    { icon: aware, title: 'ISR Awareness', description: 'Individual Social Awareness session in colleges & corporates' },
    { icon: support, title: 'Support to Other NGOs', description: 'Contributing in various social activities organised by other NGOs' },
    { icon: livehood, title: 'Livelihood Assistance', description: 'Helping poor families for their daily needs' },
    { icon: other, title: 'Other Initiatives', description: 'Rescue and foster care arrangements for pets' },
  ];

  return (
    <section id="feature">
      <div className="container">
        {/* Home icon in the top-right corner */}
        <img
          src={home2}
          alt="Home"
          className="home"
          onClick={handleHomeClick}
        />

        <div className="center wow fadeInDown">
          <h2>What We Do</h2>
          <p className="lead">
            Advika Welfare Foundation was established in 2017 with the aim of providing higher education
            to destitute children <br /> coming from rural areas. As of June 2019, we are supporting 12 such students - 10 residential and 2 non-residential.
          </p>
        </div>

        <div className="row">
          <div className="features">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-item"
                data-wow-duration="1000ms"
                data-wow-delay="600ms"
              >
                <div className="feature-wrap">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className={`feature-image ${activeIndex === index ? 'active' : ''}`}
                    onClick={() => handleImageClick(index)}
                  />
                  <h2>{feature.title}</h2>
                  <h3>{feature.description}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection2;
