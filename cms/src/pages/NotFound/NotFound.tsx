import { default as ErrorComponent } from '../../components/Error';

export default function Error404() {
  return (
    <ErrorComponent message="It seems the resource you're looking for is not found" />
  );
}
