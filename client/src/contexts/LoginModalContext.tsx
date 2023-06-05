import {
  ReactNode,
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface ILoginModalContext {
  activeLoginModal: Boolean;
  setActiveLoginModal: Dispatch<SetStateAction<Boolean>>;
}

interface Iprops {
  children: ReactNode;
}

const LoginModalContext = createContext<ILoginModalContext>(
  {} as ILoginModalContext
);

export const LoginModalContextProvider = ({
  children,
}: Iprops): JSX.Element => {
  const [activeLoginModal, setActiveLoginModal] = useState<Boolean>(false);

  const value: ILoginModalContext = {
    activeLoginModal,
    setActiveLoginModal,
  };

  return (
    <LoginModalContext.Provider value={value}>
      {children}
    </LoginModalContext.Provider>
  );
};

export const useLoginModalContext = () => useContext(LoginModalContext);
