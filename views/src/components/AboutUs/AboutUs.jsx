import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <>
      <div className="about-container" id="aboutUs">
        <div className="about-inner">
          <h1>About Pastel Pencils ✨</h1>

          <p>
            <span className="highlight">Pastel Pencils</span> isn't just a
            stationery brand — it's a celebration of creativity, elegance, and
            self-expression. Founded with the intention of redefining everyday
            productivity and organization, our products bridge the gap between
            function and beauty.
          </p>

          <p>
            In a world increasingly driven by digital efficiency, we believe
            there's something profoundly powerful in pen and paper. Whether
            you're journaling your thoughts, planning your next big idea, or
            just organizing your day — our tools are designed to bring joy and
            clarity to your workspace.
          </p>

          <h2>Our Origins 🪄</h2>
          <p>
            What began as a side project among four students in 2021 has now
            transformed into a thriving e-commerce platform. After noticing a
            lack of stylish, high-quality, and purpose-driven stationery in the
            market, we decided to create our own line.
          </p>
          <p>
            Our inspiration comes from global trends, user feedback, and
            timeless design principles. Each collection is carefully curated,
            keeping both aesthetics and practicality in mind. We've shipped to
            over 25,000 customers across the country — and we're just getting
            started.
          </p>

          <h2>What Makes Us Different 🌟</h2>
          <div className="list">
            <ul>
              <li>✅ Designed by artists, loved by professionals</li>
              <li>🌱 Eco-friendly packaging and FSC-certified paper</li>
              <li>🚀 Limited-edition seasonal drops and collaborations</li>
              <li>📈 Tested for quality, durability, and design excellence</li>
              <li>
                🫶 Strong community feedback loop — we design what you love
              </li>
            </ul>

            <h2>What We Offer 📦</h2>
            <ul>
              <li>
                📝 <strong>Journals & Planners</strong> - Daily, Weekly,
                Undated, Academic
              </li>
              <li>
                🖋 <strong>Writing Tools</strong> - Premium pens, pastel
                highlighters, refillables
              </li>
              <li>
                🎁 <strong>Custom Gift Bundles</strong> - Thoughtfully packaged
                for every occasion
              </li>
              <li>
                📒 <strong>Accessories</strong> - Bookmarks, sticky notes,
                dividers, tapes
              </li>
              <li>
                🏷 <strong>Corporate Stationery</strong> - Personalized business
                gifting options
              </li>
            </ul>
          </div>

          <h2>Our Mission 💼</h2>
          <p>
            To empower creators, planners, learners, and dreamers with
            thoughtfully designed tools that add calm, clarity, and inspiration
            to their everyday lives. We're not just here to sell products —
            we're building a lifestyle brand rooted in mindfulness, creativity,
            and productivity.
          </p>

          <h2>Behind the Brand 👩‍💻👨‍🎨</h2>
          <p>
            We are a team of designers, educators, and entrepreneurs who believe
            in the magic of good design and the beauty of handwriting. With
            backgrounds in design, psychology, and business, we've come together
            to build a brand that reflects intention and integrity.
          </p>

          <h2>Trusted by Thousands 💬</h2>
          <p>
            With 4.9⭐ average ratings and thousands of glowing reviews,
            Aesthetic Scribbles has become a go-to destination for thoughtful
            gifts, elegant stationery, and intentional productivity tools.
            Whether you're building your dream workspace or searching for a
            unique present, we're honored to be part of your journey.
          </p>

          <h2>Let's Stay Connected 📬</h2>
          <p>
            Follow us on social media, subscribe to our newsletter, and join our
            growing community of creatives. We regularly launch new collections,
            share productivity tips, and collaborate with artists to bring
            fresh, inspiring content your way.
          </p>

          <p className="closing">
            Thank you for being part of the Aesthetic Scribbles family. Here's
            to creating, dreaming, and organizing beautifully. 🫶📓
          </p>
          {/* <div className="social-icons">
            <a href="https://www.instagram.com/sainibanwait22/" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="mailto:sharma2004mehak@gmail.com">
              <i className="fas fa-envelope"></i>
            </a>
            <a
              href="https://wa.me/918591199004?text=Hi%20Pastel%20Pencils!%20I%20love%20your%20products%20and%20would%20like%20to%20know%20more.%20Please%20assist%20me%20😊"
              target="_blank"
              rel="noreferrer"
              title="Chat with us on WhatsApp"
            >
              <i className="fab fa-whatsapp"></i>
            </a>

          </div> */}
          <div className="social-icons">
            <a
              href="https://www.instagram.com/sainibanwait22/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="mailto:sharma2004mehak@gmail.com"
              title="We'd love to hear from you - drop us an email!"
            >
              <i className="fas fa-envelope"></i>
            </a>
            <a
              href="https://wa.me/918591199004?text=Hi%20Pastel%20Pencils!%20I%20love%20your%20products%20and%20would%20like%20to%20know%20more.%20Please%20assist%20me%20😊"
              target="_blank"
              rel="noreferrer"
              title="Chat with us on WhatsApp"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
