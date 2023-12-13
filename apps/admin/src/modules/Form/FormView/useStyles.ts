import { COLORS } from '@staff.ui/ui-component-library';
import { css } from '@emotion/css';

export const formBuilderContainer = (mode) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 100vh;
  width: ${mode === 'mobile-view' ? '375px' : '100%'};
  padding-bottom: 5.5rem;
`;

export const dropAreaContainer = () => css`
  align-items: flex-start;
  padding: 48px 40px 48px 25px;
  gap: 16px;

  border-radius: 24px;
  width: 600px;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;
export const formContainer = css`
  padding: 0px;
  background: ${COLORS.white};
  box-shadow: 0px 8px 24px rgba(85, 95, 97, 0.12);
  border-radius: 24px;
  margin-top: 24px;
  .buildTabCard {
    padding: 8px;
  }
  & .MuiCardContent-root {
    padding-bottom: 0px;
  }
  & .submitButton {
    :hover {
      background-color: ${COLORS.primary_green};
    }
  }
`;
