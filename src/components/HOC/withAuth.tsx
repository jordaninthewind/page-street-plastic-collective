import { useUserStore } from "@app/stores";

const withAuth = (Component: React.ComponentType<any>) => {
    return (props: any) => {
        const { user } = useUserStore();

        return <Component {...props} user={user} />;
    };
};

export default withAuth;