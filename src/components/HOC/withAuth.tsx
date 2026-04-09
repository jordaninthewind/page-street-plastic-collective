import { useUserStore } from "@app/stores";

const withAuth = (Component: React.ComponentType<any>) => (props: any) => {
    const userStore = useUserStore();

    return <Component {...props} {...userStore} />;
};

export default withAuth;