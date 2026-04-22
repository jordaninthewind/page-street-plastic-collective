import { type ComponentType } from "react";

import useUserStore from "@app/stores/userStore";
import { type User } from "@app/types";

const withAuth = <T extends object>(Component: ComponentType<T & { user: User | null }>) => (props: T) => {
    const { user } = useUserStore();

    return <Component {...(props as T)} user={user} />;
};

export default withAuth;