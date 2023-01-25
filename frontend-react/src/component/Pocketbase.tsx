import PocketBase, { Record, RecordAuthResponse } from "pocketbase";
import React, { useEffect, useState } from "react";

type Login = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => Promise<RecordAuthResponse<Record>>;

type Register = ({
  email,
  password,
  passwordConfirm,
}: {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}) => Promise<Record>;

type Logout = () => void;

export const PocketBaseContext = React.createContext<{
  loading: boolean;
  pocketBase: PocketBase | undefined;
  auth: Record | undefined;
  login: Login | undefined;
  register: Register | undefined;
  logout: Logout | undefined;
}>({
  loading: true,
  pocketBase: undefined,
  auth: undefined,
  login: undefined,
  register: undefined,
  logout: undefined,
});

export function PocketBaseProvider(props: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [pocketBase, setPocketBase] = useState<PocketBase>();
  const [auth, setAuth] = useState<Record>();

  useEffect(() => {
    const _pocketBase = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
    setPocketBase(_pocketBase);

    const unsubscribe = _pocketBase.authStore.onChange((_token, auth) => {
      setAuth(auth as Record);
      setLoading(false);
    }, true);

    return () => {
      unsubscribe();
    };
  }, []);

  async function login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const user = await pocketBase!
      .collection("users")
      .authWithPassword(email, password);
    pocketBase!.authStore.exportToCookie();
    return user;
  }

  async function register({
    name,
    email,
    password,
    passwordConfirm,
  }: {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }) {
    const user = await pocketBase!.collection("users").create({
      name,
      email,
      password,
      passwordConfirm,
    });
    return user;
  }

  function logout() {
    pocketBase?.authStore.clear();
    pocketBase?.authStore.exportToCookie();
  }

  return (
    <PocketBaseContext.Provider
      value={{ loading, pocketBase, auth, login, register, logout }}>
      {props.children}
    </PocketBaseContext.Provider>
  );
}
export default PocketBaseProvider;