import AllJobs from "./AllJobs/AllJobs";
import Banner from "./Banner/Banner";

const Home = () => {
  return (
    <div className="w-10/12 mx-auto">
      <Banner />
      <AllJobs />
    </div>
  );
};

export default Home;
