import { type ComponentType } from "react";

import { Skeleton } from "@mui/material";

type WithLoadingProps = {
  loading: boolean;
};

const withLoading = <T extends object>(WrappedComponent: ComponentType<T>) => {
  return ({ loading, ...props }: T & WithLoadingProps) => {
    return loading ? <Skeleton /> : <WrappedComponent {...(props as T)} />;
  };
};

export default withLoading;
