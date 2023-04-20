import * as React from 'react';

type PaymentIdentifiers = {
  endToEndId: string,
  firmRootId?: string,
  mocked: boolean,
};

export enum Environment {
  MOCKED = 'MOCKED',
  SANDBOX = 'SANDBOX',
  CAT = 'CAT'
}

interface AppContextInterface {
  setDisplayingMockedData: (displayingMockedData: boolean) => void,
  setDisplayingApiData: (displayingApiData: boolean) => void,
  displayingApiData: boolean,
  displayingMockedData: boolean,
  jsonDialogData: {
    state: boolean,
    data: string | null
  },
  setJsonDialogData: ({ state, data }: { state: boolean, data: string | null }) => void,
  paymentIdentifiers: PaymentIdentifiers[],
  setPaymentIdentifiers: (identifiers: PaymentIdentifiers[]) => void,
  currentEnvironment: Environment
  setCurrentEnvironment: (environment: Environment) => void
}

interface Props {
  children: React.ReactNode
}

const appCtxDefaultValue: AppContextInterface = {
  displayingApiData: false,
  displayingMockedData: true,
  setDisplayingApiData: () => { },
  setDisplayingMockedData: () => { },
  jsonDialogData: {
    state: false,
    data: null,
  },
  paymentIdentifiers: [{
    endToEndId: '',
    firmRootId: '',
    mocked: true,
  }],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setPaymentIdentifiers: ([{ endToEndId, firmRootId, mocked }]) => { },
  setJsonDialogData: () => { },
  currentEnvironment: Environment.MOCKED,
  setCurrentEnvironment: () => { }
};

const AppContext = React.createContext<AppContextInterface>(appCtxDefaultValue);

function AppContextProvider({ children }: Props) {
  const [displayingMockedData, setDisplayingMockedData] = React.useState(appCtxDefaultValue.displayingMockedData);
  const [displayingApiData, setDisplayingApiData] = React.useState(appCtxDefaultValue.displayingApiData);
  const [jsonDialogData, setJsonDialogData] = React.useState(appCtxDefaultValue.jsonDialogData);
  const [paymentIdentifiers, setPaymentIdentifiers] = React.useState(appCtxDefaultValue.paymentIdentifiers);
  const [currentEnvironment, setCurrentEnvironment] = React.useState(appCtxDefaultValue.currentEnvironment);


  return (
    <AppContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        displayingMockedData,
        setDisplayingMockedData,
        displayingApiData,
        setDisplayingApiData,
        jsonDialogData,
        setJsonDialogData,
        paymentIdentifiers,
        setPaymentIdentifiers,
        currentEnvironment,
        setCurrentEnvironment
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContextProvider, AppContext };
