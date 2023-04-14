import "bootstrap/dist/css/bootstrap.css"; // Add this line
import "../src/styles/globals.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
