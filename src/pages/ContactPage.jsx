import { Link } from "react-router";

function ContactPage() {
  return (
    <main className="contact-page">
      <h1>Contact Us</h1>
      <p>
        Have questions or suggestions? We would love to hear from you!
      </p>

      <p>Email: contact@webdevcircle.com</p>

      <Link to="/" className="btn">
        Back to Blog Posts
      </Link>
    </main>
  );
}

export default ContactPage;