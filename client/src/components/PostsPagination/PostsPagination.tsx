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

  .page {
    width: max-content;
    padding: 0.3rem;
    border-radius: 4px;
    cursor: pointer;
  }

  .active {
    background: #ffc258;
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
    color: #bcbcbc;
  }
`;
