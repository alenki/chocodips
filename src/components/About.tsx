import './About.css';

export default function About() {
  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="about__content">
          <div className="about__image-wrapper">
            <div className="about__image-frame">
              {/* Decorative drip elements */}
              <svg className="about__drip about__drip--left" viewBox="0 0 30 80" fill="currentColor">
                <path d="M15 0C15 0 0 53.33 0 63.33C0 73.4 6.716 80 15 80C23.284 80 30 73.4 30 63.33C30 53.33 15 0 15 0Z"/>
              </svg>
              <svg className="about__drip about__drip--right" viewBox="0 0 25 60" fill="currentColor">
                <path d="M12.5 0C12.5 0 0 40 0 47.5C0 55.56 5.596 60 12.5 60C19.404 60 25 55.56 25 47.5C25 40 12.5 0 12.5 0Z"/>
              </svg>
              <img
                src="/data/logo.png"
                alt="ChocoDips Cafe"
                className="about__image"
              />
            </div>
          </div>

          <div className="about__text">
            <header className="about__header">
              <div className="about__flourish">
                <span className="about__line"></span>
                <svg className="about__icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C12 2 4 14 4 18C4 22.418 7.582 24 12 24C16.418 24 20 22.418 20 18C20 14 12 2 12 2Z"/>
                </svg>
                <span className="about__line"></span>
              </div>
              <h2 className="about__title">About Us</h2>
            </header>

            <div className="about__body">
              <p>
                <strong>ChocoDips</strong> is a cozy space in the heart of Nalchik where chocolate becomes art. Each of our desserts is crafted with love and attention to detail.
              </p>
              <p>
                We believe that a great dessert is more than just something sweet. It's a moment of joy you share with loved ones. Our crepes, pancakes, and signature desserts are made from the finest ingredients just for you.
              </p>
              <p>
                Come enjoy our warm atmosphere and taste our signature chocolate creations. We're always happy to welcome guests!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
