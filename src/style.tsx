import type { FC, ReactNode} from "react";

import styled from "styled-components";

interface IReactNode {
    children: ReactNode,
}

export const Container: FC<IReactNode> = styled.div`
    width: 100%;
	min-height: 100vh;
	background-color: var(--background-color);
`;