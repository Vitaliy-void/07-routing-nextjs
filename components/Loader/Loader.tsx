import css from "./Loader.module.css";
import { ClipLoader } from "react-spinners";

interface LoaderProps {
  children: React.ReactNode;
}

export default function Loader({ children }: LoaderProps) {
  return (
    <>
      <div className={css.loaderBox}>
        <p className={css.text}>{children}</p>
        <ClipLoader color="#000000ff" size={40} />
      </div>
    </>
  );
}