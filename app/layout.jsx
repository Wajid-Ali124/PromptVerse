import Nav from "@components/NavBar/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";

export const metadata = {
  title: "promptverse",
  description: "Discover and Share AI Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
