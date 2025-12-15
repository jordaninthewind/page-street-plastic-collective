import { Copywrite, Header, Sections } from "@app/components";
import { Layout, Modal } from "@app/containers";

const Home = () => (
  <Layout>
    <Header />
    <Sections />
    <Copywrite />
    <Modal />
  </Layout>
);

export default Home;
