import { Copywrite, Header, InteractiveMap } from "@app/components";
import { Layout, Modal } from "@app/containers";

const Map = () => (
  <Layout>
    <Header />
    <InteractiveMap />
    <Copywrite />
    <Modal />
  </Layout>
);

export default Map;
