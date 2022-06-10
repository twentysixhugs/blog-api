import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import styled from 'styled-components';

interface PostsPaginationProps extends ReactPaginateProps {}

export default function PostsPagination(props: PostsPaginationProps) {
  return (
    <StyledReactPaginate
      {...props}
      activeClassName="active"
      pageClassName="page"
      nextClassName="next"
      previousClassName="prev"
      disabledLinkClassName="disabled"
    ></StyledReactPaginate>
  );
}

const StyledReactPaginate = styled(ReactPaginate)`
  display: flex;
  align-items: center;
  margin-top: 15px;

  &,
  & > * {
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }

  .page {
    width: max-content;
    padding: 0.3rem;
    border-radius: 4px;
    color: ${({ theme }) => (theme.isDark ? '#d8d8d8' : '#000000')};
    cursor: pointer;
  }

  .active {
    background: ${({ theme }) =>
      theme.isDark ? 'var(--orange--dark)' : '#ffc258'};
    color: #000;
  }

  .next,
  .prev {
    color: #969696;
    font-weight: 700;
    cursor: pointer;
  }

  .prev {
    margin-right: 0.2rem;
  }

  .next {
    margin-left: 0.2rem;
  }

  .disabled {
    color: ${({ theme }) => (theme.isDark ? '#373737' : '#cdcdcd')};
  }
`;
