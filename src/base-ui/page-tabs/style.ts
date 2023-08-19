import styled from 'styled-components'

export const PageTabsWrapper = styled.div`
  .ant-tabs-nav {
    margin: 10px 0 0 0;
  }

  .ant-tabs-nav::before {
    border-bottom: none;
  }

  /* 隐藏tabs展示页面 */
  .ant-tabs-tabpane {
    display: none;
  }
`
