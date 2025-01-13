import styles from './styles.module.css';

type HttpMethodProps = {
  type: 'get' | 'post' | 'put' | 'patch' | 'delete';
};

const HttpMethod = ({ type }: HttpMethodProps) => {
  return <span className={styles.container}>{type}</span>;
};

export default HttpMethod;
