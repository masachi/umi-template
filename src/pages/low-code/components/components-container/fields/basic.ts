import { FieldItem } from '@/pages/low-code/interfaces';

const fields: FieldItem[] = [
  {
    type: 'h1',
    name: 'h1',
    props: {
      className: 'text-3xl',
      children: 'H1',
    },
  },

  {
    type: 'p',
    name: 'p',
    props: {
      className: '',
      children: '段落111',
    },
  },
  {
    type: 'button',
    name: 'button',
    props: {
      className: 'btn',
      children: 'button',
    },
  },
  {
    type: 'input',
    name: 'input',
    props: {
      type: 'text',
      placeholder: 'pleaceholder',
    },
  },
  {
    type: 'img',
    name: 'img',
    props: {
      width: '100',
      height: '100',
      src: 'https://www.baidu.com/img/PCpad_012830ebaa7e4379ce9a9ed1b71f7507.png',
    },
  },
  {
    type: 'span',
    name: 'span',
    props: {
      children: '文本',
    },
  },
  {
    type: 'Link',
    name: 'Link',
    module: 'react-router-dom',
    props: {
      to: '###',
      children: '文本',
    },
  },
];

export default fields;
