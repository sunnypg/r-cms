import styled from 'styled-components'

export const LoginWrapper = styled.div`
  .loginPage {
    position: relative;
    .loginBox {
      width: 450px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: #fff;

      h1 {
        font-weight: bold;
        font-size: 22px;
        text-align: center;
        color: #fff;
      }
      p {
        text-align: center;
        margin: 20px 0;
      }
      .title {
        margin-bottom: 40px;
        position: relative;
        &:before,
        &:after {
          content: '';
          width: 100px;
          height: 2px;
          position: absolute;
          background: linear-gradient(to right, rgba(255, 255, 255, 0), #1976d2);
          left: -20px;
          top: 18px;
        }
        &:after {
          left: auto;
          background: linear-gradient(to left, rgba(255, 255, 255, 0), #1976d2);
          right: -20px;
        }
      }
    }
  }

  .loginbox {
    // 控制表单元素
    .ant-input,
    .ant-input-password {
      background-color: rgba(255, 255, 255, 0);
      border-color: #1890ff;
      color: #fff;
      height: 38px;
    }

    // placeholder字体颜色的控制
    .ant-input::-webkit-input-placeholder {
      // color:#1890ff;
      color: rgba(24, 144, 255, 0.8);
    }

    // 单独控制密码盒子的高度
    .ant-input-password .ant-input {
      height: 28px;
    }

    // 控制眼睛图标
    .ant-input-password-icon.anticon,
    .ant-input-password-icon.anticon:hover {
      color: #1890ff;
    }

    // 控制验证码盒子
    .captchaBox {
      display: flex;

      .captchaImg {
        margin-left: 20px;
        cursor: pointer;
      }
    }

    // 控制登录按钮
    .loginBtn {
      height: 38px;
    }
  }
`
