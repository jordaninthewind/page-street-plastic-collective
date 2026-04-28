import { useSearchParamState } from "@app/hooks";

const withSearchParamState = (Component: React.ComponentType<any>) => (props: any) => {
    const params = useSearchParamState();

    return <Component {...props} {...params} />;
};

export default withSearchParamState;