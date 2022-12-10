import { css } from 'lit';

export default css`
  :host {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    height: var(--button-height, 32px);
    line-height: var(--button-height, 32px);
    text-align: center;
    border-radius: var(--button-border-radius, 16px);
    padding-left: var(--button-hspacing, 12px);
    padding-right: var(--button-hspacing, 12px);
    cursor: pointer;
    user-select: none;
  }

  :host .mfk-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    cursor: unset;
  }

  :host([shape='square']) {
    border-radius: 0;
  }

  /* :host([shape="round"]) {
  border-radius: var(--button-height, 32px);
} */

  :host(:not([size])) {
    font-size: var(--button-font-size, 14px);
  }

  :host([size='small']) {
    height: var(--button-height, 24px);
    line-height: var(--button-height, 24px);
    font-size: var(--button-font-size, 12px);
  }

  :host([size='big']) {
    height: var(--button-height, 40px);
    line-height: var(--button-height, 40px);
    font-size: var(--button-font-size, 16px);
    border-radius: var(--button-big-border-radius, 8px);
    width: 100%;
  }

  :host(:not([type])) {
    color: var(--button-color, #666);
    border: 1px solid rgb(204, 204, 204);
  }

  :host([type='primary']) {
    color: var(--button-color, quark-textWhiteColor);
    background: var(--quark-theme-color, quark-primaryColor);
  }

  :host([type='warning']) {
    color: var(--button-color, quark-textWhiteColor);
    background: var(--quark-warning-color, quark-warningColor);
  }

  :host([type='danger']) {
    color: var(--button-color, quark-textWhiteColor);
    background: var(--quark-danger-color, quark-dangerColor);
  }

  :host([type='success']) {
    color: var(--button-color, quark-textWhiteColor);
    background: var(--quark-success-color, quark-successColor);
  }

  :host([plain]) {
    border: 1px solid;
  }

  :host([plain][type='primary']) {
    color: var(--button-color, quark-primaryColor);
    border-color: var(--quark-theme-color, quark-borderPrimaryColor);
    background: var(--button-fill-base-color, quark-fillBaseColor);
  }

  :host([plain][type='warning']) {
    color: var(--button-color, quark-warningColor);
    border-color: var(--quark-warning-color, quark-borderWarningColor);
    background: var(--button-fill-base-color, quark-fillBaseColor);
  }

  :host([plain][type='danger']) {
    color: var(--button-color, quark-dangerColor);
    border-color: var(--quark-danger-color, quark-borderDangerColor);
    background: var(--button-fill-base-color, quark-fillBaseColor);
  }

  :host([plain][type='success']) {
    color: var(--button-color, quark-successColor);
    border-color: var(--quark-success-color, quark-borderSuccessColor);
    background: var(--button-fill-base-color, quark-fillBaseColor);
  }

  :host([loading]) {
    cursor: not-allowed;
    user-select: none;
  }

  :host([disabled]) {
    cursor: not-allowed;
    opacity: 0.68;
    user-select: none;
  }

  :host(:active)::before {
    opacity: 0.1;
  }

  :host([disabled])::before,
  :host([loading])::before {
    display: none;
  }

  :host::before {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background-color: #000;
    border: inherit;
    border-color: #000;
    border-radius: inherit;
    transform: translate(-50%, -50%);
    opacity: 0;
    content: '';
  }

  .mfk-button:not([disabled]):active::after {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0.05;
    transition: 0s;
  }

  :host .mfk-button-load {
    margin-right: var(--button-icon-hspacing, 6px);
  }

  :host .mfk-button-icon {
    width: var(--button-icon-size, 1em);
    height: auto;
    margin-right: var(--button-icon-hspacing, 5px);
  }
`;
