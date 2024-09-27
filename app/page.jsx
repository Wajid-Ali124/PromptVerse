import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Explore & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI Prompts</span>
      </h1>
      <p className="desc text-center">
      Explore a world of creative prompts tailored for AI. Elevate your projects with user-driven insights and seamlessly share your own. Join a community where innovation thrives, and inspiration is just a click away!
      </p>

      {/* Feed */}
      <Feed />
    </section>
  );
};

export default Home;
